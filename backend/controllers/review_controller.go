
package controllers

import (
	"net/http"

	"your-project/backend/middleware"
	"your-project/backend/models"
	"your-project/backend/services"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// ReviewController представляет контроллер для работы с отзывами
type ReviewController struct {
	reviewService *services.ReviewService
}

// NewReviewController создает новый контроллер отзывов
func NewReviewController(reviewService *services.ReviewService) *ReviewController {
	return &ReviewController{reviewService}
}

// RegisterRoutes регистрирует маршруты для отзывов
func (c *ReviewController) RegisterRoutes(router *gin.RouterGroup) {
	reviews := router.Group("/reviews")
	{
		reviews.GET("", c.GetAllReviews)
		reviews.GET("/:id", c.GetReviewByID)
		reviews.POST("", middleware.AuthMiddleware(), c.CreateReview)
		reviews.PUT("/:id", middleware.AuthMiddleware(), c.UpdateReview)
		reviews.DELETE("/:id", middleware.AuthMiddleware(), c.DeleteReview)
		reviews.GET("/user/:userId", c.GetUserReviews)
	}
}

// GetAllReviews возвращает все отзывы
func (c *ReviewController) GetAllReviews(ctx *gin.Context) {
	reviews, err := c.reviewService.GetAllReviews(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, reviews)
}

// GetReviewByID возвращает отзыв по ID
func (c *ReviewController) GetReviewByID(ctx *gin.Context) {
	id := ctx.Param("id")
	review, err := c.reviewService.GetReviewByID(ctx, id)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Review not found"})
		return
	}

	ctx.JSON(http.StatusOK, review)
}

// CreateReview создает новый отзыв
func (c *ReviewController) CreateReview(ctx *gin.Context) {
	var review models.Review
	if err := ctx.ShouldBindJSON(&review); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Получить ID пользователя из JWT токена
	userID, exists := ctx.Get("user_id")
	if !exists {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "User ID not found in token"})
		return
	}

	// Установить ID рецензента в отзыв
	reviewerID, err := primitive.ObjectIDFromHex(userID.(string))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID"})
		return
	}
	review.ReviewerID = reviewerID

	// Проверить, что пользователь не оставляет отзыв самому себе
	if review.UserID == review.ReviewerID {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "You cannot review yourself"})
		return
	}

	createdReview, err := c.reviewService.CreateReview(ctx, review)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, createdReview)
}

// UpdateReview обновляет отзыв
func (c *ReviewController) UpdateReview(ctx *gin.Context) {
	id := ctx.Param("id")
	
	// Получить отзыв для проверки владельца
	review, err := c.reviewService.GetReviewByID(ctx, id)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Review not found"})
		return
	}

	// Получить ID пользователя из JWT токена
	userID, exists := ctx.Get("user_id")
	if !exists {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "User ID not found in token"})
		return
	}

	// Проверить, что пользователь является автором отзыва
	if review.ReviewerID.Hex() != userID.(string) {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "You can only update your own reviews"})
		return
	}

	// Привязать JSON к модели отзыва
	var updatedReview models.Review
	if err := ctx.ShouldBindJSON(&updatedReview); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Установить ID пользователя и рецензента
	updatedReview.UserID = review.UserID
	updatedReview.ReviewerID = review.ReviewerID

	err = c.reviewService.UpdateReview(ctx, id, updatedReview)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Review updated successfully"})
}

// DeleteReview удаляет отзыв
func (c *ReviewController) DeleteReview(ctx *gin.Context) {
	id := ctx.Param("id")
	
	// Получить отзыв для проверки владельца
	review, err := c.reviewService.GetReviewByID(ctx, id)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Review not found"})
		return
	}

	// Получить ID пользователя из JWT токена
	userID, exists := ctx.Get("user_id")
	if !exists {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "User ID not found in token"})
		return
	}

	// Проверить, что пользователь является автором отзыва
	if review.ReviewerID.Hex() != userID.(string) {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "You can only delete your own reviews"})
		return
	}

	err = c.reviewService.DeleteReview(ctx, id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Review deleted successfully"})
}

// GetUserReviews возвращает отзывы о пользователе
func (c *ReviewController) GetUserReviews(ctx *gin.Context) {
	userID := ctx.Param("userId")
	reviews, err := c.reviewService.GetUserReviews(ctx, userID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, reviews)
}
