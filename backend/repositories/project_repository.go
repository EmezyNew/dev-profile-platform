
package repositories

import (
	"context"
	"time"

	"your-project/backend/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// ProjectRepository представляет репозиторий для работы с проектами
type ProjectRepository struct {
	collection *mongo.Collection
}

// NewProjectRepository создает новый репозиторий проектов
func NewProjectRepository(client *mongo.Client, dbName string) *ProjectRepository {
	collection := client.Database(dbName).Collection("projects")
	return &ProjectRepository{collection}
}

// FindAll возвращает все проекты
func (r *ProjectRepository) FindAll(ctx context.Context) ([]models.Project, error) {
	cursor, err := r.collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var projects []models.Project
	if err = cursor.All(ctx, &projects); err != nil {
		return nil, err
	}

	return projects, nil
}

// FindByID находит проект по ID
func (r *ProjectRepository) FindByID(ctx context.Context, id string) (models.Project, error) {
	var project models.Project

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return project, err
	}

	err = r.collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&project)
	return project, err
}

// Create создает новый проект
func (r *ProjectRepository) Create(ctx context.Context, project models.Project) (models.Project, error) {
	project.CreatedAt = time.Now()
	project.UpdatedAt = time.Now()

	result, err := r.collection.InsertOne(ctx, project)
	if err != nil {
		return project, err
	}

	project.ID = result.InsertedID.(primitive.ObjectID)
	return project, nil
}

// Update обновляет проект
func (r *ProjectRepository) Update(ctx context.Context, id string, project models.Project) error {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	project.UpdatedAt = time.Now()

	_, err = r.collection.UpdateOne(
		ctx,
		bson.M{"_id": objectID},
		bson.M{"$set": project},
	)
	return err
}

// Delete удаляет проект
func (r *ProjectRepository) Delete(ctx context.Context, id string) error {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	_, err = r.collection.DeleteOne(ctx, bson.M{"_id": objectID})
	return err
}

// FindByUserID находит проекты пользователя
func (r *ProjectRepository) FindByUserID(ctx context.Context, userID string) ([]models.Project, error) {
	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return nil, err
	}

	cursor, err := r.collection.Find(ctx, bson.M{"user_id": objectID})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var projects []models.Project
	if err = cursor.All(ctx, &projects); err != nil {
		return nil, err
	}

	return projects, nil
}

// SearchByTitle ищет проекты по заголовку
func (r *ProjectRepository) SearchByTitle(ctx context.Context, title string) ([]models.Project, error) {
	filter := bson.M{"title": bson.M{"$regex": title, "$options": "i"}}
	cursor, err := r.collection.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var projects []models.Project
	if err = cursor.All(ctx, &projects); err != nil {
		return nil, err
	}

	return projects, nil
}

// SearchByTechnologies ищет проекты по технологиям
func (r *ProjectRepository) SearchByTechnologies(ctx context.Context, technology string) ([]models.Project, error) {
	filter := bson.M{"technologies": bson.M{"$regex": technology, "$options": "i"}}
	cursor, err := r.collection.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var projects []models.Project
	if err = cursor.All(ctx, &projects); err != nil {
		return nil, err
	}

	return projects, nil
}
