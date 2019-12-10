# GithubIssues

Kindly visit **https://git-hub-issue-webapp.herokuapp.com/** to view the live vue-webapp.

The project contains two folders: 
  1. **Git Info Backend** : This contains all the backend services files and REST APIs for the project in Node.js.
  2. **Github-issues** : This folder contains all the frontend files in Vue.js.
   
The **Backend** ie, **Git Info Backend** is hosted on heroku at **https://git-issues-backend.herokuapp.com/**.
The **Frontend** ie, **Github-issues** is hosted on heroku at **https://git-hub-issue-webapp.herokuapp.com/**.

Since Github APIs to fetch the open issues of any github repository, was resulting in default upto 30 issues. So I implemented the pagination option in my API to fetch all the open issues.
I have used the NPM package Octonode to achieve this. Octonode is a library for nodejs to access the github v3 api.

Given more time I would have done the following:

1.Improve UI. 

2.Adding loader.

3.Used material themes and Vuetify elements.
