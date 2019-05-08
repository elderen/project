# Wifi Chat

-This project began as an attempt to create a chat platform for people who are connected on the same wifi network.
Only those connected to the same wifi can chat together.

Built using websockets (npm socket.io)

Steps:
1. git clone repo and cd inside /project
2. npm i
3. npm run build
4. npm start

The data persists due to Mongo database on the backend
Although the server uses websockets, there are RESTful APIs open on the server that can run the same functions.
