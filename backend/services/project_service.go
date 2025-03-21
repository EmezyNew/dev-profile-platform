
package services

import (
	"context"

	"your-project/backend/models"
	"your-project/backend/repositories"
)

// ProjectService представляет сервис для работы с проектами
type ProjectService struct {
	projectRepo *repositories.ProjectRepository
	userRepo    *repositories.UserRepository
}

// NewProjectService создает новый сервис проектов
func NewProjectService(projectRepo *repositories.ProjectRepository, userRepo *repositories.UserRepository) *ProjectService {
	return &ProjectService{
		projectRepo: projectRepo,
		userRepo:    userRepo,
	}
}

// GetAllProjects возвращает все проекты
func (s *ProjectService) GetAllProjects(ctx context.Context) ([]models.Project, error) {
	return s.projectRepo.FindAll(ctx)
}

// GetProjectByID возвращает проект по ID
func (s *ProjectService) GetProjectByID(ctx context.Context, id string) (models.Project, error) {
	return s.projectRepo.FindByID(ctx, id)
}

// CreateProject создает новый проект
func (s *ProjectService) CreateProject(ctx context.Context, project models.Project) (models.Project, error) {
	// Получить информацию о пользователе для добавления в проект
	user, err := s.userRepo.FindByID(ctx, project.UserID.Hex())
	if err != nil {
		return project, err
	}

	project.UserName = user.Name
	project.UserAvatar = user.Avatar

	return s.projectRepo.Create(ctx, project)
}

// UpdateProject обновляет проект
func (s *ProjectService) UpdateProject(ctx context.Context, id string, project models.Project) error {
	// Обновить информацию о пользователе в проекте
	user, err := s.userRepo.FindByID(ctx, project.UserID.Hex())
	if err != nil {
		return err
	}

	project.UserName = user.Name
	project.UserAvatar = user.Avatar

	return s.projectRepo.Update(ctx, id, project)
}

// DeleteProject удаляет проект
func (s *ProjectService) DeleteProject(ctx context.Context, id string) error {
	return s.projectRepo.Delete(ctx, id)
}

// GetUserProjects возвращает проекты пользователя
func (s *ProjectService) GetUserProjects(ctx context.Context, userID string) ([]models.Project, error) {
	return s.projectRepo.FindByUserID(ctx, userID)
}

// SearchProjects ищет проекты по заголовку или технологиям
func (s *ProjectService) SearchProjects(ctx context.Context, query string) ([]models.Project, error) {
	// Сначала ищем по заголовку
	titleResults, err := s.projectRepo.SearchByTitle(ctx, query)
	if err != nil {
		return nil, err
	}

	// Затем ищем по технологиям
	techResults, err := s.projectRepo.SearchByTechnologies(ctx, query)
	if err != nil {
		return nil, err
	}

	// Объединяем результаты, исключая дубликаты
	results := titleResults
	seenIDs := make(map[string]bool)

	for _, project := range titleResults {
		seenIDs[project.ID.Hex()] = true
	}

	for _, project := range techResults {
		if _, seen := seenIDs[project.ID.Hex()]; !seen {
			results = append(results, project)
			seenIDs[project.ID.Hex()] = true
		}
	}

	return results, nil
}
