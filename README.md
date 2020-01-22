# SCHEDULE PLUS PLUS
### Front end website for admin and employee use

This is my capstone project for <a href="https://adadevelopersacademy.org">Ada Developers Academy</a>.  I made this in 4 weeks, and that includes the front end (what you see right here), and the [back end](https://github.com/stupendousC/schedule).  

The front end is written in Javascript with React, and it's deployed via AWS S3, you can find it [here](http://schedplusplus.s3-website-us-west-2.amazonaws.com/).  As of this writing on 1/22/2020, the front end is not yet fully functional.  When it is, you will be able to log in with this dummy google authorization of email = FakeEmployee001@yahoo.com and password = RealPassword001, which is attached to an employee named Lisa Simpson, and you'll be able to play with the employee dashboard functions.  For now you can still play with it on http://localhost:3000/.

The back end is written in Java using the Spring Boot framework, plus PostgreSQL database.  Deployed via AWS Elastic Beanstalk [here](http://schedplusplusbackend.us-west-2.elasticbeanstalk.com/).

***

## WHAT DOES SCHEDULE PLUS PLUS DO?

This website is inspired by my time working at a temp staffing agency.  Whenever a client contacts the agency requesting someone to work a shift, the office would consult the master calendar and start calling employees one by one until they get a 'yes'.  Yes they do text and email too, but the nature of a temp staffing agency sometimes does necessitate urgent responses and that's why phone calls are a big part of their daily workload.

I myself was an employee, and if I'm further down the line, then I won't get a chance at these shifts if someone else got called first.  So coming from an employee's perspective, FOMO (Fear of Missing Out) does plague me especially since my last name starts with W.

What about for the people at the office?  Surely they can automate some of their phone tasks and individual texts, thus free themselves up for other things.  

1. If such an app exists, that would automatically generate a list of which employees are available, and texts them all for you, wouldn't that be great?  

2. Also, the employees can just grab the shifts on a first come first serve basis, that way they get an equal chance of work, wouldn't that be awesome too?  

3. And what if, instead of employees individually emailing in their own availability schedules, they can just manage their own days on/off via their own employee dashboard, wouldn't that also be just wonderful?

### YES, YES, and YES!   Says Schedule Plus Plus, and that is what I set out to do.

***

## CAN I SEE A DEMO?

You don't even have to ask... 
#### Demo as an ADMIN 👇
[![Watch the video](https://img.youtube.com/vi/_9Q1ofPxcDg/hqdefault.jpg)](https://youtu.be/_9Q1ofPxcDg)

#### Demo on TEXTS received by employees 👇
[![Watch the video](https://img.youtube.com/vi/rvT_r7Nze6g/hqdefault.jpg)](https://youtu.be/rvT_r7Nze6g)

#### Demo as an EMPLOYEE 👇
[![Watch the video](https://img.youtube.com/vi/TMOkfiG8SKQ/hqdefault.jpg)](https://youtu.be/TMOkfiG8SKQ)

***

## HOW TO SET UP ON MY OWN COMPUTER?
### Requirements: 
A. You need to sign up with Google OAuth via their Google API Console.  [Overview here](https://developers.google.com/identity/protocols/OAuth2)  
B. You need a [Twilio](https://www.twilio.com/) account if you want to enable texting, which trust me, YOU DO.  
C. You need some way of deploying it, I used [AWS 3S](https://aws.amazon.com/s3/?nc2=h_ql_prod_fs_s3).  Or you can just use localhost:3000 for now.

### Download & Setup:
1. In your terminal, git clone a copy from here.  
    `git clone https://github.com/stupendousC/schedulePlusPlus.git`

2. Install the dependencies.  
    `npm install`

3. Make a .env file and declare your environment variables as below.  
  Note: I had my front end on localhost:3000 and my back end on localhost:5000  

    `REACT_APP_GOOGLE_CLIENT_ID=**<your_google_client_id>**  `

    `REACT_APP_LOGIN=**<your_back_end_url_OR_localhost:5000>**/login  `
    `REACT_APP_ALL_ADMINS=**<your_back_end_url_OR_localhost:5000>**/admin/admins  `
    `REACT_APP_ALL_EMPS=**<your_back_end_url_OR_localhost:5000>**/admin/employees  `
    `REACT_APP_ALL_CLIENTS=**<your_back_end_url_OR_localhost:5000>**/admin/clients  `
    `REACT_APP_ALL_SHIFTS=**<your_back_end_url_OR_localhost:5000>**/admin/shifts  `
    `REACT_APP_ALL_UNAVAILS=**<your_back_end_url_OR_localhost:5000>**/admin/unavails  `
    `REACT_APP_GET_AVAIL_EMPS_FOR_DAY=**<your_back_end_url_OR_localhost:5000>**/admin/employees/availableEmployees  `
    `REACT_APP_GET_AVAIL_EMPS_FOR_SHIFT=**<your_back_end_url_OR_localhost:5000>**/admin/shifts/availableEmployees  ` 
    `REACT_APP_TEXT_EMPS=**<your_back_end_url_OR_localhost:5000>**/sendText  `
    `REACT_APP_TEXTED_LINK=**<your_back_end_url_OR_localhost:5000>**/text  `
    `REACT_APP_EMP_DASH=**<your_back_end_url_OR_localhost:5000>**/employees  `

    `REACT_APP_FRONT_END_URL=**<your_front_end_url_OR_localhost:3000>**  `
  
4. To run it on your local machine.  
  Note: the [back end](https://github.com/stupendousC/schedule) needs to be up and running first on either localhost:5000 or deployed on a back_end_url, so make sure you have that done by this point.
    `npm run`

5. To [deploy](https://medium.com/dailyjs/a-guide-to-deploying-your-react-app-with-aws-s3-including-https-a-custom-domain-a-cdn-and-58245251f081)  
  Skip the sections on the top where the author makes a new react app and parks it on github.  You want start with the section that starts with "First steps with AWS S3" about 15% down the page.   
  As of this writing on 1/22/2020, I have not yet successfully and fully deployed on front end yet...
