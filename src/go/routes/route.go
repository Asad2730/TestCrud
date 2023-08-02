package routes

import (
	"employee/controler"

	"github.com/gin-gonic/gin"
)

func Routes(r *gin.Engine) {
	r.GET("/get", controler.GetAll)
	r.GET("/get/:id", controler.GetSingle)
	r.POST("/create", controler.Create)
	r.POST("/login", controler.Login)
	r.DELETE("/delete/:id", controler.Delete)
	r.PUT("/update/:id", controler.Update)
}
