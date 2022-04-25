service := 
dist :=
name :=
mode :=

up: ## Start the container (ARGS: service)
ifeq ($(service), '')
	@docker-compose up -d --scale gh-app=0 --scale test-db=0
else
	@docker-compose up -d --scale gh-app=0 --scale test-db=0 ${service}
endif

build-up: ## Build the container and get started (ARGS: dist)
ifeq ($(dist), alpine)
	@DOCKER_FILE="Dockerfile.alpine" \
	docker-compose up -d --build --scale gh-app=0 --scale test-db=0
else
	@docker-compose up -d --build --scale gh-app=0 --scale test-db=0
endif

start: ## Start an existing container as a service
	@docker-compose start ${service}

stop: ## Stop running containers without deleting them
	@docker-compose stop ${service}

down: ## Stop the container and delete the container, network, volume, and image created in up
	@docker-compose rm -fsv db app

down-rm: ## Stop the container and delete the container, network, volume, and image created in up (including the named volume)
	@docker-compose down --volume

log: ## View the log (ARGS: name)
	@docker-compose logs ${name}

test:
ifeq ($(mode), watch)
	@(docker-compose up -d test-db && \
	until DB_HOST="127.0.0.1" python3 libs/db_check.py 2>/dev/null; do sleep 1; done && \
	DB_HOST="127.0.0.1" yarn test-watch) && \
	docker-compose rm -fsv test-db
else ifeq ($(mode), coverage)
	@(docker-compose up -d test-db && \
	until DB_HOST="127.0.0.1" python3 libs/db_check.py 2>/dev/null; do sleep 1; done && \
	DB_HOST="127.0.0.1" yarn test:coverage && \
	docker-compose rm -fsv test-db) || \
	(docker-compose rm -fsv test-db && exit 1)
else
	@(docker-compose up -d test-db && \
	until DB_HOST="127.0.0.1" python3 libs/db_check.py 2>/dev/null; do sleep 1; done && \
	DB_HOST="127.0.0.1" yarn test) && \
	docker-compose rm -fsv test-db || \
	(docker-compose rm -fsv test-db && exit 1)
endif

build:
	@yarn build && \
	yarn run pkg dist/main.js -o build/main

gh-action:
	@docker-compose up -d db && \
	docker-compose up gh-app && \
	docker-compose down --volume && \
	sudo chown -R ${USER}:${USER} ./docker

.DEFAULT_GOAL := help
.PHONY: up build-up start stop down down-rm log test build gh-action help
help: ## Display this help screen
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
