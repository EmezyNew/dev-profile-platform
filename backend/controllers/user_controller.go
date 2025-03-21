
package controllers

import (
	"net/http"

	"your-project/backend/middleware"
	"your-project/backend/models"
	"your-project/backend/services"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// UserController представляет контроллер для работы с пользователями
type UserController struct {
	userService *services.UserService
}

// NewUserController создает новый контроллер пользователей
func NewUserController(userService *services.UserService) *UserController {
	return &UserController{userService}
}

// RegisterRoutes регистрирует маршруты для пользователей
func (c *UserController) RegisterRoutes(router *gin.RouterGroup) {
	users := router.Group("/users")
	{
		users.GET("", c.GetAllUsers)
		users.GET("/:id", c.GetUserByID)
		users.POST("", c.CreateUser)
		users.PUT("/:id", middleware.AuthMiddleware(), c.UpdateUser)
		users.DELETE("/:id", middleware.AuthMiddleware(), c.DeleteUser)
	}

	auth := router.Group("/auth")
	{
		auth.POST("/register", c.Register)
		auth.POST("/login", c.Login)
	}
}

// GetAllUsers возвращает всех пользователей
func (c *UserController) GetAllUsers(ctx *gin.Context) {
	users, err := c.userService.GetAllUsers(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, users)
}

// GetUserByID возвращает пользователя по ID
func (c *UserController) GetUserByID(ctx *gin.Context) {
	id := ctx.Param("id")
	user, err := c.userService.GetUserByID(ctx, id)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	ctx.JSON(http.StatusOK, user)
}

// CreateUser создает нового пользователя
func (c *UserController) CreateUser(ctx *gin.Context) {
	var user models.User
	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	createdUser, err := c.userService.CreateUser(ctx, user)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, createdUser)
}

// UpdateUser обновляет пользователя
func (c *UserController) UpdateUser(ctx *gin.Context) {
	id := ctx.Param("id")
	userID, exists := ctx.Get("user_id")
	if !exists || userID != id {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "You can only update your own profile"})
		return
	}

	var user models.User
	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := c.userService.UpdateUser(ctx, id, user)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "User updated successfully"})
}

// DeleteUser удаляет пользователя
func (c *UserController) DeleteUser(ctx *gin.Context) {
	id := ctx.Param("id")
	userID, exists := ctx.Get("user_id")
	if !exists || userID != id {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "You can only delete your own profile"})
		return
	}

	err := c.userService.DeleteUser(ctx, id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}

// Register регистрирует нового пользователя
func (c *UserController) Register(ctx *gin.Context) {
	var user models.User
	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	createdUser, err := c.userService.CreateUser(ctx, user)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Генерируем JWT токен
	token, err := middleware.GenerateToken(createdUser.ID.Hex(), createdUser.Email)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{
		"user":  createdUser,
		"token": token,
	})
}

// Login аутентифицирует пользователя
func (c *UserController) Login(ctx *gin.Context) {
	var credentials struct {
		Email    string `json:"email" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	if err := ctx.ShouldBindJSON(&credentials); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := c.userService.AuthenticateUser(ctx, credentials.Email, credentials.Password)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Генерируем JWT токен
	token, err := middleware.GenerateToken(user.ID.Hex(), user.Email)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"user":  user,
		"token": token,
	})
}
