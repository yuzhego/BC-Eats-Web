Bulldog Eats Product Spec - Web App MVP
===================================


Contributors
--------------
Product Manager: Yuzhe (Jason) Guo
Web Developers: Francois (Frank) Mukaba, Patrick Render
Mobile Developers: Marcella Huang, Priyanka Ganesha
UI/UX Designers: Hannah Mei, Koyo Nakamura, Sandra Kov


Links
--------------
LinkedIn: https://www.linkedin.com/company/bulldog-eats/
Website Prototype: https://bulldogeats.webflow.io
Bulldog Eats Mobile MVP: https://github.com/priyankaganesha/Bulldog-Eats-Mobile


Product Description
--------------
Bulldog Eats is a mobile and a web application helping connect hungry students on the Bellevue College (BC) campus with free excess food after campus catered events. The ability to allow food providers to upload food posts and notify the rest of the users are key features in Bulldog Eats’ mission to reduce food waste on campus by offering excess food after catered events to the campus community.


Why we build Bulldog Eats
--------------
There is often excess food that food providers need to handle after catered events at Bellevue College. According to the user research surveys we collected from 27 Bellevue College employees/event organizers, 11 of them reported that they often saw excess food after the events they hosted, and 12 reported that they sometimes saw excess food. Out of the 27 survey participants, only 5 people were not worried about ordering more food than needed for their events, and the rest expressed different levels of concern because they felt unsure about how much food they needed for their events. All participants in the user research survey responded that they are willing to share excess food from their events with Bellevue College students and employees even if they did not attend the events. With Bulldog Eats, we can use this platform to better connect students with free excess food after campus events, which will help reduce food waste, contribute to the Bellevue College sustainability goals, and have a positive environmental and social impact on the campus community.


MVP Features (July 2020 - September 2020)
--------------
1. Sign up
• Sign up is only restricted to users who have a Bellevue College email address
• Users create a password when they sign up with their Bellevue College email
• Users verify their email address using the verification link sent to their BC email

2. Log in
• Users log in with their BC email and the password they create during sign-up

3. Make a food post
• Users upload food information, location, and optional notes to post
• Food posts and their corresponding information are saved in Google Firebase

4. See available food posts on the feed
• Users are able to see all food posts made by food providers on the feed

5. Edit previous food posts
• Users may choose to edit and delete their previous food posts
• Edits and deletions of food posts would be updated on the feed

6. Sign out
• Users log out of their Bulldog Eats account


Second Stage Features
--------------
1. Image upload for each food post
• Users may choose to upload an image when they create a food post
• Food posts on the feed would contain the image uploaded for each post

2. Delete expired food posts automatically
• Expired food posts are automatically deleted based on how long each food post is available till

3. Food alert notifications
• Users can choose to opt in to receive notifications when a new food post is created
• Email/SMS notifications for web app and in-app push notifications for mobile app


How to run the app locally
--------------
###### Open a terminal
###### Make sure you have Node and npm installed properly
###### run 'npm install -g firebase-tools'
###### run 'firebase login'
###### Any trouble? follow this link https://firebase.google.com/docs/cli
###### go to functions directory
###### run 'npm install'
###### run 'firebase serve'
