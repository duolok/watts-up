package household

import (
    "gitlab.com/duolok/watts-up/watts-up-back/internal/domain/entity"
    "gitlab.com/duolok/watts-up/watts-up-back/internal/domain/repository"
)

type HouseholdManagementService struct {
    householdRepo repository.HouseholdRepository
}

func NewManageHouseholdUseCase(householdRepo repository.HouseholdRepository) *HouseholdManagementService {
    return &HouseholdManagementService{householdRepo: householdRepo}
}

func (u *HouseholdManagementService) CreateHousehold(household *entity.Household) error {
    return u.householdRepo.Create(household)
}

func (u *HouseholdManagementService) GetHouseholdByID(id uint) (*entity.Household, error) {
    return u.householdRepo.FindByID(id)
}

func (u *HouseholdManagementService) ListHouseholds() ([]*entity.Household, error) {
    return u.householdRepo.FindAll()
}

func (u *HouseholdManagementService) UpdateHousehold(household *entity.Household) error {
    return u.householdRepo.Update(household)
}

func (u *HouseholdManagementService) DeleteHousehold(id uint) error {
    return u.householdRepo.Delete(id)
}
