package utils

import (
	"fmt"
    "time"

	"github.com/golang-jwt/jwt/v5"
    "gitlab.com/duolok/watts-up/watts-up-back/pkg/config"
)

type Claims struct {
	jwt.RegisteredClaims

	Uid      uint `json:"uid"`
	Username uint `json:"username"`
}

func GenerateToken(claims *Claims) string {
    EnvConfig := config.EnvConfig

    claims.ExpiresAt = jwt.NewNumericDate(time.Now().Add(time.Minute * 60))

    token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(EnvConfig.Jwt.Secret))
    if err != nil {
        panic(err)
    }

    return token
}


func JwtVerify(tokenStr string) (*Claims, error) {
    EnvConfig := config.EnvConfig
    token, err := jwt.ParseWithClaims(tokenStr, &Claims{}, func(token *jwt.Token) (interface{}, error) {
        if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
            return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
        }
        return []byte(EnvConfig.Jwt.Secret), nil
    })

    if !token.Valid || err != nil {
        return nil, fmt.Errorf("Token invalid")
    }

    claims, ok := token.Claims.(*Claims)
    if !ok {
        return nil, err
    }

    if float64(claims.ExpiresAt.Unix()) < float64(time.Now().Unix()) {
        return nil, fmt.Errorf("Token expired")
    }

    return claims, err
}
