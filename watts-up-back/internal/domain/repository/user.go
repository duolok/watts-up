package repository

import (
    "gitlab.com/duolok/watts-up/watts-up-back/internal/domain/entity"
)

type UserRepository interface {
    Create(user *entity.User) error
    FindById(id uint) (*entity.User, error)
    FindByEmail(email string) (*entity.User, error)
    Update(user *entity.User) error
    Delete(id uint) error
}
