# Docker image should be as light as possible
# It should only contain the official running env, the app itself and it's dependencies

FROM node:9
ARG working_dir=/code
RUN mkdir ${working_dir}
ADD . ${working_dir}/
WORKDIR ${working_dir}
RUN npm install
CMD node index.js
EXPOSE 8081
