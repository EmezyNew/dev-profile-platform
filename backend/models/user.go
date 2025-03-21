
package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// User представляет модель пользователя
type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Name      string             `bson:"name" json:"name"`
	Email     string             `bson:"email" json:"email"`
	Password  string             `bson:"password" json:"-"` // Не отдаем пароль в JSON
	Title     string             `bson:"title" json:"title"`
	Bio       string             `bson:"bio" json:"bio"`
	Avatar    string             `bson:"avatar" json:"avatar"`
	Skills    []string           `bson:"skills" json:"skills"`
	Social    Social             `bson:"social" json:"social"`
	CreatedAt time.Time          `bson:"created_at" json:"createdAt"`
	UpdatedAt time.Time          `bson:"updated_at" json:"updatedAt"`
	Rating    float64            `bson:"rating" json:"rating"`
}

// Social представляет социальные ссылки пользователя
type Social struct {
	GitHub   string `bson:"github" json:"github"`
	Twitter  string `bson:"twitter" json:"twitter"`
	LinkedIn string `bson:"linkedin" json:"linkedin"`
	Website  string `bson:"website" json:"website"`
}
