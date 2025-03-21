
package controllers

import (
	"net/http"

	"your-project/backend/services"

	"github.com/gin-gonic/gin"
)

// SearchController представляет контроллер для поиска
type SearchController struct {
	userService    *services.UserService
	projectService *services.ProjectService
}

// NewSearchController создает новый контроллер поиска
func NewSearchController(userService *services.UserService, projectService *services.ProjectService) *SearchController {
	return &SearchController{
		userService:    userService,
		projectService: projectService,
	}
}

// RegisterRoutes регистрирует маршруты для поиска
func (c *SearchController) RegisterRoutes(router *gin.RouterGroup) {
	router.GET("/search", c.Search)
}

// Search выполняет поиск по пользователям и проектам
func (c *SearchController) Search(ctx *gin.Context) {
	query := ctx.Query("q")
	if query == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Query parameter 'q' is required"})
		return
	}

	// Поиск по имени пользователя
	usersByName, err := c.userService.SearchUsersByName(ctx, query)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Поиск по навыкам пользователя
	usersBySkills, err := c.userService.SearchUsersBySkills(ctx, query)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Объединить результаты поиска пользователей, исключая дубликаты
	users := usersByName
	seenUserIDs := make(map[string]bool)

	for _, user := range usersByName {
		seenUserIDs[user.ID.Hex()] = true
	}

	for _, user := range usersBySkills {
		if _, seen := seenUserIDs[user.ID.Hex()]; !seen {
			users = append(users, user)
			seenUserIDs[user.ID.Hex()] = true
		}
	}

	// Поиск по проектам
	projects, err := c.projectService.SearchProjects(ctx, query)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"users":    users,
		"projects": projects,
	})
}
