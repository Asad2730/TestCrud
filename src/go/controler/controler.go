package controler

import (
	"employee/db"
	"employee/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAll(ctx *gin.Context) {

	users := []model.User{}
	err := db.Db.Find(&users).Error
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, err.Error())
		return
	}

	ctx.JSON(200, users)

}

func GetSingle(ctx *gin.Context) {

	var user model.User
	id := ctx.Param("id")
	err := db.Db.First(&user, "ID = ?", id).Error
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, err.Error())
		return
	}
	ctx.JSON(200, user)

}

func Create(ctx *gin.Context) {

	var user model.User
	ctx.BindJSON(&user)

	err := db.Db.Create(&user).Error

	if err != nil {
		ctx.JSON(http.StatusUnauthorized, err.Error())
		return
	}

	ctx.JSON(200, user)
}

func Login(ctx *gin.Context) {

	var user model.User
	ctx.BindJSON(&user)
	email := user.Email
	password := user.Password
	err := db.Db.First(&user, "email = ? and password = ?", email, password).Error
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, err.Error())
		return
	}

	ctx.JSON(200, user)
}

func Delete(ctx *gin.Context) {

	var user model.User
	id := ctx.Param("id")

	err := db.Db.Delete(&user, id).Error

	if err != nil {
		ctx.JSON(http.StatusUnauthorized, err.Error())
	}

	ctx.JSON(200, "Deleted Successfully!")
}

func Update(ctx *gin.Context) {

	var user model.User
	ctx.BindJSON(&user)

	id := ctx.Param("id")

	err := db.Db.Where("id = ?", id).Updates(&user).Error

	if err != nil {
		ctx.JSON(http.StatusUnauthorized, err.Error())
	}

	ctx.JSON(200, "Updated Successfully!")
}
