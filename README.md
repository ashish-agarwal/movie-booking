# Movie-booking
    Movie Ticket Booking has the following configurations
        * NodeJS
        * MongoDB
        * Docker
        * AWS Codepipeline


 - Used express framework to code all the APIs with MongoDB as my database.
 - Used docker to containerize the application and AWS ECS for hosting my server.
 - AWS code pipeline is used to automate the deployments.

## Database Design
 - Kept cinema and movie as embedded instead of referenced is because of 2 reasons
    * Ease the queries
    * These attributes will hardly change
 - Kept reserved seats array in screening object because we would never need reserved seats separately from screening. We always need them together.


 ## Setup
  * Run `npm install` to install all the dependencies.
  * You need to add a .env file which has ```MONGODB_URI=<mongodb url>```
  * Now just run ```npm start``` to start the server.
  * You can also run ```npm test``` to run the tests.







