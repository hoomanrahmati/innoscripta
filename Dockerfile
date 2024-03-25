FROM node:20.10.0-alpine3.18
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install 
EXPOSE 3000
# in real project we need to run "npm run build" to make a build folder 
# then we need to copy it into a server like nginx and then start it.
CMD ["npm", "start"]