# 18 NoSQL: MongoDBSocial Network API

### GitHub repository:  	https://github.com/smokerdog57/mongoDbSocialNetworkApi
### Chrome Cast Recording:	https://drive.google.com/file/d/1y1jzJMV1vhpRmNugLpiUYPzy5q2AQ7wf/view

## Badges
    
![github](https://img.shields.io/badge/github-Profile-lightgrey.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-yellow.svg)
![node.js](https://img.shields.io/badge/node.js-12.0-green.svg)
![npm](https://img.shields.io/badge/npm-6.14.4-blue.svg)
![Express](https://img.shields.io/badge/Express-red.svg)
![chrome castify](https://img.shields.io/badge/chrome%20castify-orange.svg)
![MongoDb](https://img.shields.io/badge/MongoDB-4.4.9-green?style=flat&logo=mongodb)
![NoSQLBooster](https://img.shields.io/badge/NoSQL%20Booster-6.2.2-blue?style=flat&logo=nosqlbooster)
![dotenv](https://img.shields.io/badge/dotenv-blue.svg)

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Requirements](#requirements)
- [Mock-up](#mock-up)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Description

 This is an  API for a social network that uses a NoSQL database,  so that the app can handle large amounts of unstructured data. It is based on MongoDB which is a popular choice for many social networks due to its speed with large amounts of data and flexibility with unstructured data. 

## Installation
  
1. Follow the [MongoDB installation guide on The Full-Stack Blog](https://coding-boot-camp.github.io/full-stack/mongodb/how-to-install-mongodb) to install MongoDB 7.0 Community Edition on Windows locally.  Also install noSQLBooster for MongoDB.
2. create a new github repository named 'mongoDbSocialNetworkApi'
3. launch microsoft visual studio
4. enter cli:  cd ~/bootcamp/homework
5. enter cli:  git clone <repository> // creates mongoDbSocialNetworkApi folder (project root directory)
6. enter cli:  cd mongoDbSocialNetworkApi
7. enter cli:  npm init // this initializes the package.json project file
8. Edit the `package.json` file to add the following dependencies:
   - "dotenv": "^16.3.1",
   - "express": "^4.18.2",
   - "mongoose": "^7.0.2"
   - and dev dependency:  "nodemon": "^2.0.9"
9. enter cli: npm install //install the dependencies
10. After running above steps create, copy and/or confirm the following directory structure and files:
	assets			// copy from challenge
	config
	controllers
	models
	utils
	index.js
	.env
	.gitignore
	node_modules		// confirm: created by npm	
	package.json		// confirm: created by npm		
	package-lock.json		// confirm: created by npm	
	README.md		// copy from challenge

## Usage
```md
1. open MS Visual Studio and terminal
2. enter cli:  cd mongoDbSocialNetworkApi
3. enter cli:  npm start
4. Launch insomnia and send api requests to test the app
```

## Requirements
```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

### Models
```md
**** User:

* `username`
  * String
  * Unique
  * Required
  * Trimmed

* `email`
  * String
  * Required
  * Unique
  * Must match a valid email address (look into Mongoose's matching validation)

* `thoughts`
  * Array of `_id` values referencing the `Thought` model

* `friends`
  * Array of `_id` values referencing the `User` model (self-reference)

* `Schema Settings` Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
```



****Thought:

```md
* `thoughtText`
  * String
  * Required
  * Must be between 1 and 280 characters

* `createdAt`
  * Date
  * Set default value to the current timestamp
  * Use a getter method to format the timestamp on query

* `username` (The user that created this thought)
  * String
  * Required

* `reactions` (These are like replies)
  * Array of nested documents created with the `reactionSchema`

* `Schema Settings`: Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
```


**** Reaction (SCHEMA ONLY):
```md

* `reactionId`
  * Use Mongoose's ObjectId data type
  * Default value is set to a new ObjectId

* `reactionBody`
  * String
  * Required
  * 280 character maximum

* `username`
  * String
  * Required

* `createdAt`
  * Date
  * Set default value to the current timestamp
  * Use a getter method to format the timestamp on query

* `Schema Settings`: This will not be a model, but rather will be used as the `reaction` field's subdocument schema in the `Thought` model.
```


### API Routes

**** `/api/users`

```md
* `GET` all users
* `GET` a single user by its `_id` and populated thought and friend data
* `POST` a new user:

// example data
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}

* `PUT` to update a user by its `_id`
* `DELETE` to remove user by its `_id`
**BONUS**: Remove a user's associated thoughts when deleted.

**`/api/users/:userId/friends/:friendId`**

* `POST` to add a new friend to a user's friend list
* `DELETE` to remove a friend from a user's friend list
```

**** `/api/thoughts`

```md
* `GET` to get all thoughts
* `GET` to get a single thought by its `_id`
* `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)

// example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}

* `PUT` to update a thought by its `_id`
* `DELETE` to remove a thought by its `_id`

**`/api/thoughts/:thoughtId/reactions`**

* `POST` to create a reaction stored in a single thought's `reactions` array field
* `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
```

## Mock-Up

Please reference chrome cast recording:  https://drive.google.com/file/d/1y1jzJMV1vhpRmNugLpiUYPzy5q2AQ7wf/view

## License

github, jses6, express.js
https://opensource.org/licenses/MIT

npm
https://opensource.org/licenses/Artistic-2.0


- - -
© 2023 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.

## Contributing

1. Sandy Smith (tutor):  Sandy helped me understand the acceptance criteria.

## Tests                 

1. Test001: 	START THE SERVER. At the CLI:  npm run start and verify server.js is run and starts listening on port 3001 without errors.
2. Test002: 	CREATE USERstart the server and from insomnia send a POST to http://localhost3001/api/users/ to add a user.  response is User json which includes user contents and friendCount virtual.
3. Test003: 	CREATE THOUGHT. start the server and from insomnia send a POST to http://localhost3001/api/thoughts/ to add a thought
4. Test004: 	CREATE REACTION TO THOUGHT. start the server and from insomnia send a POST to http://localhost:3001/api/thoughts/thoughtID/reactions/ to add a reaction to a thought
other fields _id, username, email and friendcount should be included. 
5. Test005: 	ADD FRIEND TO USER.  start the server and from insomnia send a POST to http://localhost3001/api/:users/userId/friends/:friendId. The response json should include: user key/values including friend id. 
6. Test006: 	UPDATE USER BY ID.  start the server and from insomnia send a POST to http://localhost3001/api/users/:userId/. The response should include: user json.
7. Test007: 	GET ALL USERS. start the server and from insomnia send a GET to http://localhost3001/api/users/ to get all users.  The response json object should include all users including:thought field should include thought id if there is one, friends field should include friend id if there is one and other user fields including _id, username and email and friendCount.
8. Test008: 	GET USER BY ID.  start the server and from insomnia send a GET to http://localhost3001/api/users/:userid to get single user..  The response json should include single user including populated thought and firend data.
9. Test009:   CREATE Thought for amiko.
10. Test00A: 	GET ALL THOUGHTS. start the server and from insomnia send a GET to http://localhost3001/api/thoughts/ to get all thoughts.  The response json object should include all thoughts.
11. Test00B: 	UPDATE THOUGHT BY ID..  start the server and from insomnia send a POST to http://localhost3001/api/thoughts/:thoughtId/. The response should include: thought json.
12. Test00C: 	GET THOUGHT BY ID.  start the server and from insomnia send a GET to http://localhost3001/api/thoughts/:thoughtId/. The response should include: thought json.
13. Test00D: 	DELETE REACTION BY ID.  start the server and from insomnia send a DELETE to http://localhost3001/api/thoughts/:thoughtId/reactions/:reactionId. The response should include: thought json.
14. Test00E: 	DELETE THOUGHT BY ID.  start the server and from insomnia send a DELETE TO http://localhost3001/api/users/:thoughtId/ The response should include: thought json.
15. Test00F: 	DELETE FRIEND.  start the server and from insomnia send a DELETE TO http://localhost3001/api/users/:userId/ friends/:friendId/.  The response should include: user json showing friend is not there. 
16. Test00G: DELETE USER AND ASSOCIATED THOUGHTS.  start the server and from insomnia send a DELETE TO http://localhost3001/api/users/:userId.  The response should include: msg: User and associated thoughts deleted.


## Questions
  
### Github username
smokerdog57

### Github url
https://github.com/smokerdog57/mongoDbSocialNetworkApi
  
### Contact me
email: smokerdog57@gmail.com
phone: 941-221-1132
