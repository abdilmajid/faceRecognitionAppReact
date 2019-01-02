# **Face Recognition App**

> This is a Full Stack Application that uses React for the frontend, Node-Express and PostgreSQL for the backend

<p align="center">
  <a href="https://faceapp-front-end.herokuapp.com/"><img src="readme/faceApp.gif" alt="FaceApp"/></a>
</p>

<br>

## Table of Contents
- [Synopsis](#Synopsis)
- [Tools Used](#tools-used)
- [Walkthrough ](#Walkthrough)

<br>


# **Synopsis**

This project is a simple face recognition app that uses the [Clarifai Api](https://clarifai.com) to find faces inside images. The [Clarifai Api](https://clarifai.com) is able to recognize multiple faces in images but this project is limited to only recognizing a single face inside an image. Users insert the URL of an image and the app tries to outline the face. 


# **Tools Used** 
>### ***Client Side***
<a href='https://www.npmjs.com/package/react'><img src="readme/ReactJS.png" alt="react-logo" height=50 align="center"/></a>
<a href='https://github.com/lukehoban/es6features'><img src="readme/es6.jpeg" alt="es6-logo" height=30 align="center"/></a>



>### ***Server Side***
<a href='https://nodejs.org/en/'><img src="readme/nodejs-logo.png" alt="node" height=50 align="center"/></a>
<a href='https://www.npmjs.com/package/express'>
<img src="readme/express-facebook-share.png" alt="Express" height=35 align="center"/></a>
<a href='https://knexjs.org/'>
<img src="readme/knex.png" alt="knex" height=30 align="center"/></a>
<a href='https://www.npmjs.com/package/pg'>
<img src="readme/favicon.png" alt="node-postgres" height=20 align="center"/> (Node-Postgres) </a>
<a href='https://clarifai.com/'><img src="readme/clarifai-logo-black.png" alt="clarifai" height=50 align="center"/></a>


>### ***Database***
<a href='https://www.postgresql.org/'>
<img src="readme/Node_js_database_example_PostgreSQL_1461672928728-1466683645768.png" alt="postgres" height=60 align="center"/></a>
<a href='https://www.postgresql.org/'>
<img src="readme/pgAdminLogo.png" alt="pgAdmin" height=50 align="center"/></a>
<br>

>### ***Other Tools***
<a href='https://www.heroku.com/'>
<img src="readme/logo-square-heroku.png" alt="Heroku" height=80 align="center"/></a>
<a href='https://www.npmjs.com/package/bcrypt'>
<img src="readme/bcrypt.png" alt="bcrypt-logo" height=30 align="center"/></a>
<a href='https://www.npmjs.com/'>
<img src="readme/1280px-Npm-logo.svg.png" alt="npm" height=25 align="center"/></a>
<a href='https://git-scm.com/'>
<img src="readme/1_QoR3rxWIbnf5wmF_IuAHqQ.png" alt="git" height=30 align="center"/></a>
<a href='https://github.com/'>
<img src="readme/github-logo.png" alt="github-logo" height=40 align="center"/></a>
<br>
<br>


# **Walkthrough**

:star: The first page users see in the application is the **Sign In** page.

<p align="center">
<img src="readme/page01.png" alt="signin" height=400 align="center"/></p>
<br>

:star: If a user tries to sign in with an incorrect Email/Password, an error message will pop up, this also happens if the fields are empty when trying to sign in.

<p align="center">
<img src="readme/02errormsg.png" alt="error1" height=300 align="center"/></p>
<br>

:star: Under the **Sign In** button there is a **Register** button that takes users to the registration page. 

<p align="center">
<img src="readme/03reg.png" alt="registration" height=350 align="center"/></p>
<br>

:star: If the user tries to register with credentials that already exists, an error message pops up. 

<p align="center">
<img src="readme/04errorreg.png" alt="error2" height=360 align="center"/></p>
<br>

:star: When a user submits the **Registration** form, the app sends that data to the server which inserts it to the database. The data is inserted into a login and user table. When the user first creates an account they enter a password which is stored as a hash. When the user tries to login again the server uses **BCRYPT** to validate the password.


<p align="center">
<img src="readme/06pgusers.png" alt="homepage" height=80 align="center"/></p>

<p align="center">
<img src="readme/06pglogin.png" alt="login" height=80 align="center"/></p>
<br>

:star: After the user is registered or signs in, they are taken to the main page. This page displays the users name as well as the number of submissions made. 

<p align="center">
<img src="readme/05main.png" alt="homepage" height=350 align="center"/></p>
<br>


:star: After the user inserts an image url and clicks **Detect**, a blue box appears over the location of the face. When the user clicks the detect button, the app send the image to the **Clarifai** API which uses an AI to guess the location of the faces in an image. The data that is sent back from **Clarifai** is coordinate information which is mapped out using CSS. After every submission a counter increments, showing the number of submissions a user has made.

<p align="center">
<img src="readme/07face1.png" alt="face1" height=450 align="center"/></p>

<p align="center">
<img src="readme/07face2.png" alt="face2" height=500 align="center"/></p>
<p align="center">
<img src="readme/07face3.png" alt="face3" height=430 align="center"/></p>
<p align="center">
<img src="readme/07face4.png" alt="face4" height=412 align="center"/></p>
<br>


