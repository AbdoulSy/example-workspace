message ?= 'Quick update'

app:
	$(MAKE) app -C ./projects/backend-examples
	$(MAKE) app -C ./projects/frontend-examples
	docker-compose up

init:
	npm run update
	npm run fetch
	npm run pull

commit:
	npm run add
	npm run commit $(message)
	npm run push
