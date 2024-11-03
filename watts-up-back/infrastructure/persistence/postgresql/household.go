package postgresql

import (
    "gorm.io/gorm"
    "gitlab.com/duolok/watts-up/watts-up-back/internal/domain/entity"
    "gitlab.com/duolok/watts-up/watts-up-back/internal/domain/repository"
)

type HouseholdRepo struct {
    db *gorm.DB
}

func NewHouseholdRepo(db *gorm.DB) repository.HouseholdRepository {
    return &HouseholdRepo{db: db}
}

func (r *HouseholdRepo) Create(household *entity.Household) error {
    return r.db.Create(household).Error
}

func (r *HouseholdRepo) FindByID(id uint) (*entity.Household, error) {
    var household entity.Household
    if err := r.db.First(&household, id).Error; err != nil {
        return nil, err
    }
    return &household, nil
}

func (r *HouseholdRepo) FindAll() ([]*entity.Household, error) {
    var households []*entity.Household
    if err := r.db.Find(&households).Error; err != nil {
        return nil, err
    }
    return households, nil
}

func (r *HouseholdRepo) Update(household *entity.Household) error {
    return r.db.Save(household).Error
}

func (r *HouseholdRepo) Delete(id uint) error {
    return r.db.Delete(&entity.Household{}, id).Error
}
