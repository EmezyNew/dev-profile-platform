
package repositories

import (
	"context"
	"time"

	"your-project/backend/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// ReviewRepository представляет репозиторий для работы с отзывами
type ReviewRepository struct {
	collection *mongo.Collection
}

// NewReviewRepository создает новый репозиторий отзывов
func NewReviewRepository(client *mongo.Client, dbName string) *ReviewRepository {
	collection := client.Database(dbName).Collection("reviews")
	return &ReviewRepository{collection}
}

// FindAll возвращает все отзывы
func (r *ReviewRepository) FindAll(ctx context.Context) ([]models.Review, error) {
	cursor, err := r.collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var reviews []models.Review
	if err = cursor.All(ctx, &reviews); err != nil {
		return nil, err
	}

	return reviews, nil
}

// FindByID находит отзыв по ID
func (r *ReviewRepository) FindByID(ctx context.Context, id string) (models.Review, error) {
	var review models.Review

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return review, err
	}

	err = r.collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&review)
	return review, err
}

// Create создает новый отзыв
func (r *ReviewRepository) Create(ctx context.Context, review models.Review) (models.Review, error) {
	review.CreatedAt = time.Now()
	review.UpdatedAt = time.Now()

	result, err := r.collection.InsertOne(ctx, review)
	if err != nil {
		return review, err
	}

	review.ID = result.InsertedID.(primitive.ObjectID)
	return review, nil
}

// Update обновляет отзыв
func (r *ReviewRepository) Update(ctx context.Context, id string, review models.Review) error {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	review.UpdatedAt = time.Now()

	_, err = r.collection.UpdateOne(
		ctx,
		bson.M{"_id": objectID},
		bson.M{"$set": review},
	)
	return err
}

// Delete удаляет отзыв
func (r *ReviewRepository) Delete(ctx context.Context, id string) error {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	_, err = r.collection.DeleteOne(ctx, bson.M{"_id": objectID})
	return err
}

// FindByUserID находит отзывы о пользователе
func (r *ReviewRepository) FindByUserID(ctx context.Context, userID string) ([]models.Review, error) {
	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return nil, err
	}

	cursor, err := r.collection.Find(ctx, bson.M{"user_id": objectID})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var reviews []models.Review
	if err = cursor.All(ctx, &reviews); err != nil {
		return nil, err
	}

	return reviews, nil
}

// CalculateAverageRating вычисляет среднюю оценку пользователя
func (r *ReviewRepository) CalculateAverageRating(ctx context.Context, userID string) (float64, error) {
	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return 0, err
	}

	matchStage := bson.D{{"$match", bson.D{{"user_id", objectID}}}}
	groupStage := bson.D{
		{"$group", bson.D{
			{"_id", nil},
			{"averageRating", bson.D{{"$avg", "$rating"}}},
		}},
	}

	cursor, err := r.collection.Aggregate(ctx, mongo.Pipeline{matchStage, groupStage})
	if err != nil {
		return 0, err
	}
	defer cursor.Close(ctx)

	var results []bson.M
	if err = cursor.All(ctx, &results); err != nil {
		return 0, err
	}

	if len(results) == 0 {
		return 0, nil
	}

	return results[0]["averageRating"].(float64), nil
}
