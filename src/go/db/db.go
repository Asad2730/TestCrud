package db

import (
	"employee/model"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var Db *gorm.DB

func DBConnect() {

	dsn := "host=localhost user=postgres password=123 dbname=Employee port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect to database")
	}

	Db = db
	db.AutoMigrate(&model.User{})
}
