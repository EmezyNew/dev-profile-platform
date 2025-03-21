
package main

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// SetupDatabase configures the MongoDB database and creates indexes
func SetupDatabase(client *mongo.Client, dbName string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Example: Create indexes if needed
	// userCollection := client.Database(dbName).Collection("users")
	// _, err := userCollection.Indexes().CreateOne(ctx, mongo.IndexModel{
	//     Keys: bson.D{{"email", 1}},
	//     Options: options.Index().SetUnique(true),
	// })
	// if err != nil {
	//     return err
	// }

	log.Println("Database setup completed")
	return nil
}

// ConnectToMongoDB establishes a connection to the MongoDB server
func ConnectToMongoDB(uri string) (*mongo.Client, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	
	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		return nil, err
	}

	// Ping the database to verify connection
	err = client.Ping(ctx, nil)
	if err != nil {
		return nil, err
	}
	
	log.Println("Connected to MongoDB!")
	return client, nil
}
