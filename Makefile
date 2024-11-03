frontend-install:
	cd watts-up-front && npm install

frontend-run:
	cd watts-up-front && npm start

frontend-build:
	cd watts-up-front && npm run build

backend-run:
	cd watts-up-back && go run cmd/api/main.go --dev --debug

backend-local-build:
	cd watts-up-back && go build cmd/server/main.go

backend-cross-build:
	cd watts-up-back && GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build cmd/server/main.go

build-local: frontend-install frontend-build backend-local-build
	rm -rf build
	mkdir build
	mv watts-up-back/main build
	mv watts-up-front/build build/dist

build-cross: frontend-install frontend-build backend-cross-build
	rm -rf build
	mkdir build
	mv watts-up-back/main build
	mv watts-up-front/build build/dist
