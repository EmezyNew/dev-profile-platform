
package repositories

import (
	"context"
	"time"

	"your-project/backend/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// UserRepository представляет репозиторий для работы с пользователями
type UserRepository struct {
	collection *mongo.Collection
}

// NewUserRepository создает новый репозиторий пользователей
func NewUserRepository(client *mongo.Client, dbName string) *UserRepository {
	collection := client.Database(dbName).Collection("users")
	return &UserRepository{collection}
}

// FindAll возвращает всех пользователей
func (r *UserRepository) FindAll(ctx context.Context) ([]models.User, error) {
	cursor, err := r.collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var users []models.User
	if err = cursor.All(ctx, &users); err != nil {
		return nil, err
	}

	return users, nil
}

// FindByID находит пользователя по ID
func (r *UserRepository) FindByID(ctx context.Context, id string) (models.User, error) {
	var user models.User

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return user, err
	}

	err = r.collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&user)
	return user, err
}

// Create создает нового пользователя
func (r *UserRepository) Create(ctx context.Context, user models.User) (models.User, error) {
	user.CreatedAt = time.Now()
	user.UpdatedAt = time.Now()

	result, err := r.collection.InsertOne(ctx, user)
	if err != nil {
		return user, err
	}

	user.ID = result.InsertedID.(primitive.ObjectID)
	return user, nil
}

// Update обновляет пользователя
func (r *UserRepository) Update(ctx context.Context, id string, user models.User) error {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	user.UpdatedAt = time.Now()

	_, err = r.collection.UpdateOne(
		ctx,
		bson.M{"_id": objectID},
		bson.M{"$set": user},
	)
	return err
}

// Delete удаляет пользователя
func (r *UserRepository) Delete(ctx context.Context, id string) error {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	_, err = r.collection.DeleteOne(ctx, bson.M{"_id": objectID})
	return err
}

// FindByEmail находит пользователя по email
func (r *UserRepository) FindByEmail(ctx context.Context, email string) (models.User, error) {
	var user models.User
	err := r.collection.FindOne(ctx, bson.M{"email": email}).Decode(&user)
	return user, err
}

// SearchByName ищет пользователей по имени
func (r *UserRepository) SearchByName(ctx context.Context, name string) ([]models.User, error) {
	filter := bson.M{"name": bson.M{"$regex": name, "$options": "i"}}
	cursor, err := r.collection.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var users []models.User
	if err = cursor.All(ctx, &users); err != nil {
		return nil, err
	}

	return users, nil
}

// SearchBySkills ищет пользователей по навыкам
func (r *UserRepository) SearchBySkills(ctx context.Context, skill string) ([]models.User, error) {
	filter := bson.M{"skills": bson.M{"$regex": skill, "$options": "i"}}
	cursor, err := r.collection.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var users []models.User
	if err = cursor.All(ctx, &users); err != nil {
		return nil, err
	}

	return users, nil
}
