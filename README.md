# React-Native-App-Auth :wave:
Download Sensible App: https://expo.io/@miulia12/sensible-finance-management


Technologies used:
- React Native - Expo Framework
- Firebase - Database & Authentication
- External API: OCR (Text Recognition), Google Maps API, Facebook & Google Login API
- Trello – Project Management Tool
- GitHub – Version Control System
 
Karl Warren   , Gabrielle Mulholland  , Maria Severin


 :man_technologist: Github: @S00179711
 
:woman_technologist: Github: @S00182354 
 
:woman_technologist: Github: @S00201400
 
This is a project realized by Sensible Team. This is a application for students for financial management that helps them track their incomes and expenses and learn more about how they can manage it more easily. The information they find is: individual amount per income/expenses, total amount, receipt picture, location and description.
![Logo](/assets/Capture5.jpeg)
![Logo](/assets/Capture4.jpeg)

While we were working on our Xamarin App, we decided to test other technologies. React-Native is the one we liked the most and we decided to continue implementing the features for the future.


* OCR Technology

We used Nanonets OCR API for this feature of the application. We created a new model, added 140 images of individual receipts for an accuracy of 92%,we annotate it and after we set the model to train. The result is a Json response which we are using for extracting the total-price. We have functions for the request, taking the picture, send it and extracting the maximum number from that Json response which represents the total-price.
![Logo](/assets/Capture1.JPG)
![Logo](/assets/Capture3.JPG)

* Map Component

We used Google Maps API for implementing the map which allows a user to provide their current location or mark one on the map. We used GeoLocation Api for displaying a real address of the chosen location. In this way, a user takes a picture of the receipt and choose location, saving this data in the database.


![Logo](/assets/Capture6.jpeg)



* Google Sign-In

Google Sign-In manages the OAuth 2.0 flow and token lifecycle, simplifying the integration with Google APIs. Before you can integrate Google Sign-In into your website, you must create a client ID, which you need to call the sign-in API.
Using Google Account to sign in to third-party sites and apps makes everything easier because you do not need to remember individual usernames and passwords for each account.




 
