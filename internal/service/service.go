package service

import (
	"strawberrymaker/internal/service/relation"
	"strawberrymaker/internal/service/user"
	"strawberrymaker/pkg/conf"
)

var (
	// Svc global service var
	Svc *Service
)

// Service struct
type Service struct {
	c           *conf.Config
	userSvc     user.IUserService
	relationSvc relation.IRelationService
}

// New init service
func New(c *conf.Config) (s *Service) {
	s = &Service{
		c:           c,
		userSvc:     user.NewUserService(c),
		relationSvc: relation.NewRelationService(c),
	}
	return s
}

// UserSvc return user service
func (s *Service) UserSvc() user.IUserService {
	return s.userSvc
}

// RelationSvc return relation service
func (s *Service) RelationSvc() relation.IRelationService {
	return s.relationSvc
}

// Ping service
func (s *Service) Ping() error {
	return nil
}

// Close service
func (s *Service) Close() {
	s.userSvc.Close()
	s.relationSvc.Close()
}
