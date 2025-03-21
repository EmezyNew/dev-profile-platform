
package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Review представляет модель отзыва
type Review struct {
	ID           primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	UserID       primitive.ObjectID `bson:"user_id" json:"userId"`
	ReviewerID   primitive.ObjectID `bson:"reviewer_id" json:"reviewerId"`
	ReviewerName string             `bson:"reviewer_name" json:"reviewerName"`
	ReviewerAvatar string           `bson:"reviewer_avatar" json:"reviewerAvatar"`
	Rating       float64            `bson:"rating" json:"rating"`
	Content      string             `bson:"content" json:"content"`
	CreatedAt    time.Time          `bson:"created_at" json:"createdAt"`
	UpdatedAt    time.Time          `bson:"updated_at" json:"updatedAt"`
}
