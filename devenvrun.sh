docker-compose up -d
# then docker-compose exec ruby bash, to get the shell

# alternative
# export ESHOP_ENV=dev
# docker-compose run --rm --service-ports ruby bash
# or docker-compose run --rm --service-ports -e ESHOP_ENV=dev ruby bash
