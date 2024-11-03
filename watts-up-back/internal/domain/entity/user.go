package entity

type User struct {
    ID        uint      `json:"id"`
    Username  string    `json:"username"`
    Email     string    `json:"email"`
    Password  string    `json:"-"`
    Role      string    `json:"role"`
    IsActive  bool      `json:"is_active"`
    ImagePath  string    `json:"image_path"`
}
