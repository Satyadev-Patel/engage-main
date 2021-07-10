# Nanosoft Teams ( Microsoft Teams Clone )

This Web-Application is a part of my Microsoft Engage Mentorship program 2021. This app is build using the simple-peer library for peer to peer connections such as Video-Voice Calling and text messaging. For bi-directional communication, web sockets are used with the help of socket.io library.

#### Feautres:

1. Video-Audio Calling
   a) Microphone - Mute/Unmute
   b) Disable/Enable Video
   c) Send an invite through email
2. Chat functionality which can be used before,during or after the meeting.
   a) All the chats can be accessed later on through 'Your meetings' tab
3. Weekly Schedular
   a) Schedule your upcoming meetings for your whole week in a simpler way
4. User Authentication

# npm install

For installing all the dependencies of server

# client> npm install

For client side dependencies

# Run the application

#### Environment variables

set REACT_APP_LOCAL_URL = http://localhost:5000 in your client side.

#### package.json

add a new property of 'proxy' and set it to http://localhost:5000

#### npm run dev

This will run the application on your local machine
