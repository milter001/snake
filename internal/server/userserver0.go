package server

import (
	"log"
	"net"

	"google.golang.org/grpc"

	v1 "strawberrymaker/app/api/grpc/user/v1"
	"strawberrymaker/internal/service"
	"strawberrymaker/pkg/conf"
)

// New new grpc server
func New(c *conf.Config, svc *service.Service) *grpc.Server {
	// todo: get addr from conf
	lis, err := net.Listen("tcp", "127.0.0.1:12345")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()
	v1.RegisterUserServiceServer(grpcServer, svc.UserSvc())
	err = grpcServer.Serve(lis)
	if err != nil {
		log.Fatalf("failed to serve grpc server: %v", err)
	}
	log.Println("serve grpc server is success, port:1234")

	return grpcServer
}
