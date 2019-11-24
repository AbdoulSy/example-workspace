app:
	$(MAKE) app -C ./projects/backend-examples
	$(MAKE) app -C ./projects/frontend-examples
	docker-compose up
