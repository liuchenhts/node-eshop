docker-compose up -d
# then docker-compose exec node bash, to get the shell

# alternative
# export ESHOP_ENV=dev
# docker-compose run --rm --service-ports node bash
# or docker-compose run --rm --service-ports -e ESHOP_ENV=dev node bash
