
package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Project представляет модель проекта
type Project struct {
	ID           primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Title        string             `bson:"title" json:"title"`
	Description  string             `bson:"description" json:"description"`
	Image        string             `bson:"image" json:"image"`
	Technologies []string           `bson:"technologies" json:"technologies"`
	GitHubURL    string             `bson:"github_url" json:"githubUrl"`
	LiveURL      string             `bson:"live_url" json:"liveUrl"`
	UserID       primitive.ObjectID `bson:"user_id" json:"userId"`
	UserName     string             `bson:"user_name" json:"userName"`
	UserAvatar   string             `bson:"user_avatar" json:"userAvatar"`
	CreatedAt    time.Time          `bson:"created_at" json:"createdAt"`
	UpdatedAt    time.Time          `bson:"updated_at" json:"updatedAt"`
}
