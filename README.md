# notifications service

## Installation

run `docker-compose up`

## Run Tests

producer

docker exec -it backend-services_producer_1 bash -c "pytest"

notification

docker exec -it backend-services_notification_1 sh -c "npm run test"


## Available APIs And Docs

http://localhost:8000/docs

## Usage Scenario

- send notification to a user or group of users
- notification have many providers ('sms', 'email', 'fcm')

so to complete this scenario we should follow these steps

- send `POST` request to  `/api/users` to create user
- send `GET` request to `/api/users` to get users ids
- send `POST` request to  `/api/notifications/send` to send a notification

User body
```json
{
    "name": "name",
    "email": "email"
}
```
Notification body
```json
{
    "providers": ["sms", "fcm"],
    "body": "Hello from the other side",
    "receivers": ["5cc80b47e9db456789836abe"]
}
```

in the console you will see logs of notifications

## Explanation


![alt text](https://github.com/muhammad-habib/Backend-Services/blob/main/chart.jpg?raw=true)



- when we send request to **producer service** which is responsible to save notification to DB and notify notification service via **rabitmq**  


- **notification service**
    - listen to reabitmq queue
    - select messaeg from mongo
    - load all message providers
    - publish to them the message
    - every Provider has throttled-queue to manage the rate limit
    - send the notification
