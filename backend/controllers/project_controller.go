
package controllers

import (
	"net/http"

	"your-project/backend/middleware"
	"your-project/backend/models"
	"your-project/backend/services"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// ProjectController представляет контроллер для работы с проектами
type ProjectController struct {
	projectService *services.ProjectService
}

// NewProjectController создает новый контроллер проектов
func NewProjectController(projectService *services.ProjectService) *ProjectController {
	return &ProjectController{projectService}
}

// RegisterRoutes регистрирует маршруты для проектов
func (c *ProjectController) RegisterRoutes(router *gin.RouterGroup) {
	projects := router.Group("/projects")
	{
		projects.GET("", c.GetAllProjects)
		projects.GET("/:id", c.GetProjectByID)
		projects.POST("", middleware.AuthMiddleware(), c.CreateProject)
		projects.PUT("/:id", middleware.AuthMiddleware(), c.UpdateProject)
		projects.DELETE("/:id", middleware.AuthMiddleware(), c.DeleteProject)
		projects.GET("/user/:userId", c.GetUserProjects)
	}
}

// GetAllProjects возвращает все проекты
func (c *ProjectController) GetAllProjects(ctx *gin.Context) {
	projects, err := c.projectService.GetAllProjects(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, projects)
}

// GetProjectByID возвращает проект по ID
func (c *ProjectController) GetProjectByID(ctx *gin.Context) {
	id := ctx.Param("id")
	project, err := c.projectService.GetProjectByID(ctx, id)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	ctx.JSON(http.StatusOK, project)
}

// CreateProject создает новый проект
func (c *ProjectController) CreateProject(ctx *gin.Context) {
	var project models.Project
	if err := ctx.ShouldBindJSON(&project); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Получить ID пользователя из JWT токена
	userID, exists := ctx.Get("user_id")
	if !exists {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "User ID not found in token"})
		return
	}

	// Установить ID пользователя в проект
	objectID, err := primitive.ObjectIDFromHex(userID.(string))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID"})
		return
	}
	project.UserID = objectID

	createdProject, err := c.projectService.CreateProject(ctx, project)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, createdProject)
}

// UpdateProject обновляет проект
func (c *ProjectController) UpdateProject(ctx *gin.Context) {
	id := ctx.Param("id")
	
	// Получить проект для проверки владельца
	project, err := c.projectService.GetProjectByID(ctx, id)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	// Получить ID пользователя из JWT токена
	userID, exists := ctx.Get("user_id")
	if !exists {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "User ID not found in token"})
		return
	}

	// Проверить, что пользователь является владельцем проекта
	if project.UserID.Hex() != userID.(string) {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "You can only update your own projects"})
		return
	}

	// Привязать JSON к модели проекта
	var updatedProject models.Project
	if err := ctx.ShouldBindJSON(&updatedProject); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Установить ID пользователя
	objectID, err := primitive.ObjectIDFromHex(userID.(string))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID"})
		return
	}
	updatedProject.UserID = objectID

	err = c.projectService.UpdateProject(ctx, id, updatedProject)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Project updated successfully"})
}

// DeleteProject удаляет проект
func (c *ProjectController) DeleteProject(ctx *gin.Context) {
	id := ctx.Param("id")
	
	// Получить проект для проверки владельца
	project, err := c.projectService.GetProjectByID(ctx, id)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	// Получить ID пользователя из JWT токена
	userID, exists := ctx.Get("user_id")
	if !exists {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "User ID not found in token"})
		return
	}

	// Проверить, что пользователь является владельцем проекта
	if project.UserID.Hex() != userID.(string) {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "You can only delete your own projects"})
		return
	}

	err = c.projectService.DeleteProject(ctx, id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Project deleted successfully"})
}

// GetUserProjects возвращает проекты пользователя
func (c *ProjectController) GetUserProjects(ctx *gin.Context) {
	userID := ctx.Param("userId")
	projects, err := c.projectService.GetUserProjects(ctx, userID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, projects)
}
