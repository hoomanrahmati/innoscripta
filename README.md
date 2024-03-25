# To run the react project in docker file

first run:

### docker build . -t sample

then it build a image with the name of "sample"

to run the image on the port 3000 we need to run it(as a container) and expose the port like:

### docker run -p 3000:3000 -d sample

then we should open browser and in http://localhost:3000/
