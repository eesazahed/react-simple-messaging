# react-social
A social media test website that is made with react.

This is completely open to anyone and does not require sign up/log in. All you have to do is write your name and select a message. You can reload it to recieve new messages. Once you send a message, you can delete it afterwards.

This project uses Google's free Firebase service. 

To try out this project, first open the terminal and type in `git clone https://github.com/EesaZahed/react-simple-messaging.git`
Next, type `cd react-simple-messaging` and `npm i react` in the terminal.

Next, create a Google Firebase project at https://console.firebase.google.com/, and enable a realtime database (in test mode). Once you create your project, go to your project settings, and copy the `firebaseConfig` object, and paste it in `src/firebase.js`.

To finally run it, type in the terminal of your project's directory `npm start`.

I hope you enjoy my project. It uses pre-written messages but you can edit them if you want. If you run it locally, it saves the posts even if you reload, and it can even be open on other browsers.
