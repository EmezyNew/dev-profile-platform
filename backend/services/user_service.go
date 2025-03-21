
package services

import (
	"context"
	"errors"
	"time"

	"your-project/backend/models"
	"your-project/backend/repositories"

	"golang.org/x/crypto/bcrypt"
)

// UserService представляет сервис для работы с пользователями
type UserService struct {
	userRepo *repositories.UserRepository
}

// NewUserService создает новый сервис пользователей
func NewUserService(userRepo *repositories.UserRepository) *UserService {
	return &UserService{userRepo}
}

// GetAllUsers возвращает всех пользователей
func (s *UserService) GetAllUsers(ctx context.Context) ([]models.User, error) {
	return s.userRepo.FindAll(ctx)
}

// GetUserByID возвращает пользователя по ID
func (s *UserService) GetUserByID(ctx context.Context, id string) (models.User, error) {
	return s.userRepo.FindByID(ctx, id)
}

// CreateUser создает нового пользователя
func (s *UserService) CreateUser(ctx context.Context, user models.User) (models.User, error) {
	// Проверить, существует ли пользователь с таким email
	existingUser, err := s.userRepo.FindByEmail(ctx, user.Email)
	if err == nil && existingUser.ID != "" {
		return models.User{}, errors.New("user with this email already exists")
	}

	// Хешировать пароль
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return models.User{}, err
	}
	user.Password = string(hashedPassword)

	// Установить начальный рейтинг
	user.Rating = 0

	return s.userRepo.Create(ctx, user)
}

// UpdateUser обновляет пользователя
func (s *UserService) UpdateUser(ctx context.Context, id string, user models.User) error {
	existingUser, err := s.userRepo.FindByID(ctx, id)
	if err != nil {
		return err
	}

	// Если пароль не был изменен, сохраняем старый хешированный пароль
	if user.Password == "" {
		user.Password = existingUser.Password
	} else {
		// Иначе хешируем новый пароль
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			return err
		}
		user.Password = string(hashedPassword)
	}

	return s.userRepo.Update(ctx, id, user)
}

// DeleteUser удаляет пользователя
func (s *UserService) DeleteUser(ctx context.Context, id string) error {
	return s.userRepo.Delete(ctx, id)
}

// SearchUsersByName ищет пользователей по имени
func (s *UserService) SearchUsersByName(ctx context.Context, name string) ([]models.User, error) {
	return s.userRepo.SearchByName(ctx, name)
}

// SearchUsersBySkills ищет пользователей по навыкам
func (s *UserService) SearchUsersBySkills(ctx context.Context, skill string) ([]models.User, error) {
	return s.userRepo.SearchBySkills(ctx, skill)
}

// AuthenticateUser аутентифицирует пользователя
func (s *UserService) AuthenticateUser(ctx context.Context, email, password string) (models.User, error) {
	user, err := s.userRepo.FindByEmail(ctx, email)
	if err != nil {
		return models.User{}, errors.New("invalid credentials")
	}

	// Проверить пароль
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return models.User{}, errors.New("invalid credentials")
	}

	return user, nil
}
