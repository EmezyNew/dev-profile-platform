
package main

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"your-project/backend/controllers"
	"your-project/backend/repositories"
	"your-project/backend/services"
)

const (
	DatabaseName = "portfolio"
	MongoURI     = "mongodb://localhost:27017"
)

func main() {
	// Подключение к MongoDB
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	clientOptions := options.Client().ApplyURI(MongoURI)
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)

	// Проверка соединения
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Connected to MongoDB!")

	// Создание репозиториев
	userRepo := repositories.NewUserRepository(client, DatabaseName)
	projectRepo := repositories.NewProjectRepository(client, DatabaseName)
	reviewRepo := repositories.NewReviewRepository(client, DatabaseName)

	// Создание сервисов
	userService := services.NewUserService(userRepo)
	projectService := services.NewProjectService(projectRepo, userRepo)
	reviewService := services.NewReviewService(reviewRepo, userRepo)

	// Создание контроллеров
	userController := controllers.NewUserController(userService)
	projectController := controllers.NewProjectController(projectService)
	reviewController := controllers.NewReviewController(reviewService)
	searchController := controllers.NewSearchController(userService, projectService)

	// Настройка Gin
	router := gin.Default()

	// Настройка CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Регистрация маршрутов
	api := router.Group("/api")
	{
		userController.RegisterRoutes(api)
		projectController.RegisterRoutes(api)
		reviewController.RegisterRoutes(api)
		searchController.RegisterRoutes(api)
	}

	// Добавим тестовый маршрут для проверки работы API
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
			"message": "API is running",
		})
	})

	// Запуск сервера
	log.Println("Server running on :8080")
	if err := router.Run(":8080"); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
