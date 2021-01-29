/**
 *    
 */
package main

import (
	"github.com/gin-gonic/gin"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"github.com/spf13/pflag"
	"google.golang.org/grpc"

	"strawberrymaker/app/api"
	rpc "strawberrymaker/internal/server"
	"strawberrymaker/internal/service"
	"strawberrymaker/pkg/conf"
	"strawberrymaker/pkg/snake"
	routers "strawberrymaker/router"
)

var (
	cfg = pflag.StringP("config", "c", "", "snake config file path.")
)

// @title snake docs api
// @version 1.0
// @description snake demo

// @contact.name milter001/snake
// @contact.url http://www.swagger.io/support
// @contact.email

// @host localhost:8080
// @BasePath /v1
func main() {
	pflag.Parse()

	// init config
	if err := conf.Init(*cfg); err != nil {
		panic(err)
	}

	// Set gin mode.
	gin.SetMode(conf.Conf.App.RunMode)

	// init app
	app := snake.New(conf.Conf)
	snake.App = app

	// Create the Gin engine.
	router := app.Router

	// HealthCheck 健康检查路由
	router.GET("/health", api.HealthCheck)
	// metrics router 可以在 prometheus 中进行监控
	// 通过 grafana 可视化查看 prometheus 的监控数据，使用插件6671查看
	router.GET("/metrics", gin.WrapH(promhttp.Handler()))

	// API Routes.
	routers.Load(router)
	// WEB Routes
	routers.LoadWebRouter(router)

	// init service
	svc := service.New(conf.Conf)

	// set global service
	service.Svc = svc
	snake.App.BizService = svc

	// start grpc server
	var rpcSrv *grpc.Server
	go func() {
		rpcSrv = rpc.New(conf.Conf, svc)
		snake.App.RPCServer = rpcSrv
	}()

	// here register to service discovery

	// start server
	app.Run()
}
