# Sms Management Api
[![Build Status](https://travis-ci.org/hadijahkyampeire/sms-management-api-mongo.svg?branch=master)](https://travis-ci.org/hadijahkyampeire/sms-management-api-mongo)
[![Coverage Status](https://coveralls.io/repos/github/hadijahkyampeire/sms-management-api-mongo/badge.svg?branch=master)](https://coveralls.io/github/hadijahkyampeire/sms-management-api-mongo?branch=master)


## Documentation

- Find the live documentation [Here](https://documenter.getpostman.com/view/2646235/S11GTLmL)

## About the API

SMS Management Application is an API that manages sending and receiving of SMS messages. With this API, you can manage contacts, send SMS, update an SMS, receive SMS, view an SMS.

## Requirements
Ensure to have these on your machine.
- [Node (stable)](https://nodejs.org/en/)

- [MongoDB](https://www.mongodb.com/)

- [Postman](https://www.getpostman.com/)

- Some knowledge of terminal or use Mongodb Compass for database UI

## How to set it up

1. Clone the repository.

```

git clone https://github.com/hadijahkyampeire/sms-management-api-mongo.git

```

2. Install the dependencies by running:

```

yarn install

```

3. Start you mongodb service

```

mongod, if it requires authentication use sudo mongod

```

4. Get started

```

yarn start:dev

```

5. you can now access the application using postman

```

http://localhost:5000

```

## Testing

The application's tests can be executed by running the script below within the terminal at the application root directory:

```

yarn test or npm test

```
if you want to know the coverage use:
```

yarn test -- --coverage

```

## Endpoints
- After creating a contact one has to get authenticated first before they access other endpoints.

## CONTACTS

#### **_api/v1/contacts_**

description: Creates a contact
method : POST
headers: content-Type →application/json
sample payload:

    `{
        "first_name": "Haddy",
        "last_name":"Kyamps"
        "phoneNumber": "0781980273",
        "password": "password"
     }`

#### **_api/v1/contacts_**

description: Updates user contact information
method : PUT
headers: content-Type →application/json
Authorization: put a token got from authorization
sample payload:

    `{
        "phoneNumber": "0705221421",
        "first_name":"Hadijah"
     }`

#### **_api/v1/contacts_**

description: Retrieves users contacts information
method : GET
headers: content-Type →application/json
Authorization: put a token got from authorization
returns:

    `{
    "contacts": [
        {
            "_id": "5c7434ad282c7f95ee924353",
            "first_name": "kyampeire",
            "last_name": "hadijah",
            "password": "$2b$10$31Ibyx0d76W1A.OBaum8NuX7s7ayo51VJHt3yBhzP/zvR432DyKH6",
            "phone_number": "0781980273",
            "__v": 0
        },
    ]

}`

#### **_api/v1/contacts_**

description: Deletes a contact for the authenticated user along with messages associated to them
method : DELETE
headers: content-Type →application/json
Authorization: put a token got from authorization

returns:

    ` {
      message:"contact deleted successfully"
      }`


## AUTHENTICATION

#### **_api/v1/authentication_**

description: Login and authenticate the user
method : POST
headers: content-Type →application/json
payload:

     `{
    	"phone_number": "0705221421",
    	"password": "password"
      }`

returns:

    ` {
      "message": "You were successfully authenticated",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InBob25lX251bWJlciI6IjA3MDUyMjE0MjEiLCJjb250YWN0X2lkIjoiNWM3NTM1ZWM2OWJlYzUyZmQ1Y2MwN2VkIn0sImlhdCI6MTU1MTE4NTQzNSwiZXhwIjoxNTUxMjcxODM1fQ.p0l_mnTwTNcYME2jmXtpEyjRXNsyE4Ws3wt_PWilBRc"
    }`

## MESSAGES

#### **_api/vi/messages_**

description: Sends a message
method : POST
headers: content-Type →application/json
Authorization: put a token got from authorization
sample payload:

    `{
        "receiver": "5c1337021fbf86ef244f8534",
        "message": "Test massage 3"
    }`

#### **_api/v1/messages_**

description: Retrieves all messages belonging to the authenticated user
method : GET
headers: content-Type →application/json
Authorization: put a token got from authorization
returns:

    `
    `{
        "success": true,
        "data": [
        {
            "status": "sent",
            "_id": "5c162261bcaf48e17ca22c76",
            "sender": "5c155afb60bf0f0518328497",
            "receiver": "5c1337021fbf86ef244f8534",
            "message": "Test massage 3",
            "created": "2018-12-16T10:01:05.372Z",
            "__v": 0
        }
        ],
        "message": "SMS collected succefully"
    }`

#### **_api/v1/messages/id_**

description: Updates a message
method : PUT
headers: content-Type →application/json
Authorization: put a token got from authorization
payload:

    `{
        "message": "How are you"
    }`
returns:

    `{
    "status": "sent",
    "_id": "5c743665282c7f95ee924357",
    "receiver": "0781980273",
    "message": "How are you",
    "sender": "0705221421",
    "created": "2019-02-25T18:39:33.062Z",
    "__v": 0
}`

#### **_api/v1/messages/:id_**

description: Returns one message by ID
method : GET
headers: content-Type →application/json
Authorization: put a token got from authorization
returns:

    `
    {
    "status": "sent",
    "_id": "5c743665282c7f95ee924357",
    "receiver": "0781980273",
    "message": "Hey dia how are you",
    "sender": "0705221421",
    "created": "2019-02-25T18:39:33.062Z",
    "__v": 0

}`

#### **_api/v1/messages/:id_**

description: Deletes a message you created by ID
method : DELETE
headers: content-Type →application/json
Authorization: put a token got from authorization


