
package main

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"your-project/backend/controllers"
	"your-project/backend/repositories"
	"your-project/backend/services"
)

const (
	DatabaseName = "portfolio"
	MongoURI     = "mongodb://localhost:27017"
)

func main() {
	// Connect to MongoDB
	client, err := ConnectToMongoDB(MongoURI)
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		client.Disconnect(ctx)
	}()

	// Setup database (create indexes, etc.)
	err = SetupDatabase(client, DatabaseName)
	if err != nil {
		log.Fatal("Failed to setup database:", err)
	}

	// Create repositories
	userRepo := repositories.NewUserRepository(client, DatabaseName)
	projectRepo := repositories.NewProjectRepository(client, DatabaseName)
	reviewRepo := repositories.NewReviewRepository(client, DatabaseName)

	// Create services
	userService := services.NewUserService(userRepo)
	projectService := services.NewProjectService(projectRepo, userRepo)
	reviewService := services.NewReviewService(reviewRepo, userRepo)

	// Create controllers
	userController := controllers.NewUserController(userService)
	projectController := controllers.NewProjectController(projectService)
	reviewController := controllers.NewReviewController(reviewService)
	searchController := controllers.NewSearchController(userService, projectService)

	// Setup Gin
	router := gin.Default()

	// Setup CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Register routes
	api := router.Group("/api")
	{
		userController.RegisterRoutes(api)
		projectController.RegisterRoutes(api)
		reviewController.RegisterRoutes(api)
		searchController.RegisterRoutes(api)
	}

	// Add a test route for health checking
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"message": "API is running",
		})
	})

	// Start server
	log.Println("Server running on :8080")
	if err := router.Run(":8080"); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
