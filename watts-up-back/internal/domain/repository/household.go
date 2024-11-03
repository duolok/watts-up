package repository

import "gitlab.com/duolok/watts-up/watts-up-back/internal/domain/entity"

type HouseholdRepository interface {
    Create(household *entity.Household) error
    FindByID(id uint) (*entity.Household, error)
    FindAll() ([]*entity.Household, error)
    Update(household *entity.Household) error
    Delete(id uint) error
}
