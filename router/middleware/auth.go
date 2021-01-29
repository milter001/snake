package middleware

import (
	"github.com/gin-gonic/gin"

	"strawberrymaker/app/api"
	"strawberrymaker/pkg/errno"
	"strawberrymaker/pkg/log"
	"strawberrymaker/pkg/token"
)

// AuthMiddleware 认证中间件
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Parse the json web token.
		ctx, err := token.ParseRequest(c)
		log.Infof("context is: %+v", ctx)

		if err != nil {
			api.SendResponse(c, errno.ErrTokenInvalid, nil)
			c.Abort()
			return
		}

		// set uid to context
		c.Set("uid", ctx.UserID)

		c.Next()
	}
}
