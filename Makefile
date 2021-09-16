BIN_NAME=app
export GO111MODULE=on

all: init build

.PHONY: init
init: init-client init-server

.PHONY: init-client
init-client:
	@echo "> Installing the client dependencies ..."
	@yarn install -D --unsafe-perm

.PHONY: init-server
init-server:
	@echo "> Installing the server dependencies ..."
	@go mod tidy -v
	@go get -v ./...
  @go install https://github.com/gravityblast/fresh

.PHONY: build
build: build-client build-server

.PHONY: build-client
build-client:
	@echo "> Building the client ..."
	yarn run build

.PHONY: build-server
build-server:
	@echo "> Building the server binary ..."
	@rm -rf bin && go build -o bin/${BIN_NAME} .

.PHONY: run
run:
	@echo "> Running Frontend & Backend ..."
	./node_modules/.bin/concurrently "yarn run dev" "fresh"
