# Backend Fullcast Take Home

### Description

Backend server to a categorized notes application.

## Postman Collection

<p>Note: In "./src/types/inputs" you can find the expected input for each request. I have also included a postman collection below for ease of use.</p>

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/32871542-4a4aa764-542b-44a6-ad58-551388589e8b?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D32871542-4a4aa764-542b-44a6-ad58-551388589e8b%26entityType%3Dcollection%26workspaceId%3D4af8e7c4-e9c1-4957-89a0-acf2c3f11e55)


## Local Setup

### Server Startup

```
npm run local
```

### Dependencies & Environment

* Install required dependencies

<p><i>Note: NVM is not required, but is recommended in order keep dependencies working as expected</i></p>

```
nvm use
npm install
```
* Use `.env.example` file to create your own `.env` file with relevant credentials

### Database Initialization

<p>Prerequisites:</p>

* MySQL is installed
* MySQL server is running


<p>Instructions:</p>

* Run SQL query to initialize the notes database.
```
CREATE DATABASE IF NOT EXISTS notes_db;
```

* Run seeds to create tables and initial data for the notes database.
```
npm run seed:local
```