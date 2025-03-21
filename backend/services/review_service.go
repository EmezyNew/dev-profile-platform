
package services

import (
	"context"

	"your-project/backend/models"
	"your-project/backend/repositories"
)

// ReviewService представляет сервис для работы с отзывами
type ReviewService struct {
	reviewRepo *repositories.ReviewRepository
	userRepo   *repositories.UserRepository
}

// NewReviewService создает новый сервис отзывов
func NewReviewService(reviewRepo *repositories.ReviewRepository, userRepo *repositories.UserRepository) *ReviewService {
	return &ReviewService{
		reviewRepo: reviewRepo,
		userRepo:   userRepo,
	}
}

// GetAllReviews возвращает все отзывы
func (s *ReviewService) GetAllReviews(ctx context.Context) ([]models.Review, error) {
	return s.reviewRepo.FindAll(ctx)
}

// GetReviewByID возвращает отзыв по ID
func (s *ReviewService) GetReviewByID(ctx context.Context, id string) (models.Review, error) {
	return s.reviewRepo.FindByID(ctx, id)
}

// CreateReview создает новый отзыв
func (s *ReviewService) CreateReview(ctx context.Context, review models.Review) (models.Review, error) {
	// Получить информацию о рецензенте для добавления в отзыв
	reviewer, err := s.userRepo.FindByID(ctx, review.ReviewerID.Hex())
	if err != nil {
		return review, err
	}

	review.ReviewerName = reviewer.Name
	review.ReviewerAvatar = reviewer.Avatar

	// Сохранить отзыв
	review, err = s.reviewRepo.Create(ctx, review)
	if err != nil {
		return review, err
	}

	// Обновить средний рейтинг пользователя
	s.updateUserRating(ctx, review.UserID.Hex())

	return review, nil
}

// UpdateReview обновляет отзыв
func (s *ReviewService) UpdateReview(ctx context.Context, id string, review models.Review) error {
	// Обновить отзыв
	err := s.reviewRepo.Update(ctx, id, review)
	if err != nil {
		return err
	}

	// Обновить средний рейтинг пользователя
	s.updateUserRating(ctx, review.UserID.Hex())

	return nil
}

// DeleteReview удаляет отзыв
func (s *ReviewService) DeleteReview(ctx context.Context, id string) error {
	// Получить отзыв перед удалением для получения ID пользователя
	review, err := s.reviewRepo.FindByID(ctx, id)
	if err != nil {
		return err
	}

	// Удалить отзыв
	err = s.reviewRepo.Delete(ctx, id)
	if err != nil {
		return err
	}

	// Обновить средний рейтинг пользователя
	s.updateUserRating(ctx, review.UserID.Hex())

	return nil
}

// GetUserReviews возвращает отзывы о пользователе
func (s *ReviewService) GetUserReviews(ctx context.Context, userID string) ([]models.Review, error) {
	return s.reviewRepo.FindByUserID(ctx, userID)
}

// updateUserRating обновляет средний рейтинг пользователя
func (s *ReviewService) updateUserRating(ctx context.Context, userID string) error {
	// Вычислить средний рейтинг
	avgRating, err := s.reviewRepo.CalculateAverageRating(ctx, userID)
	if err != nil {
		return err
	}

	// Получить пользователя
	user, err := s.userRepo.FindByID(ctx, userID)
	if err != nil {
		return err
	}

	// Обновить рейтинг пользователя
	user.Rating = avgRating
	return s.userRepo.Update(ctx, userID, user)
}
