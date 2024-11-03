package entity

type Household struct {
    ID          uint   `json:"id" gorm:"primaryKey"`
    Address     string `json:"address"`
    Identifier  string `json:"identifier"` 
    OwnerID     uint   `json:"owner_id"`   
    CreatedAt   string `json:"created_at"`
    UpdatedAt   string `json:"updated_at"`
}
