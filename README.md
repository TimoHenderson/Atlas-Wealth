# CodeClan - JavaScript Group Project

<kbd>
 <img width="250" alt="Atlas Wealth Logo" src="https://github.com/Neil-Burgoyne/Shares-Portfolio-Application/blob/main/client/public/atlaslogo.png">
 </kbd>
 <br></br>

Atlas Wealth is a full-stack web application intended to help the client to record the held shares and track the market value changes.

This project was built using:

- React JS
- Express.js
- MongoDB
- Styled with MaterialUI
- TDD - Mocha | Cypress
- Finnhub API


<hr>

<span>
<img hspace="5" height="50px" src="https://github.com/devicons/devicon/blob/v2.15.1/icons/react/react-original.svg">
<img hspace="5" height="50px" src="https://github.com/devicons/devicon/blob/v2.15.1/icons/javascript/javascript-original.svg">
<img hspace="5" height="50px" src="https://github.com/devicons/devicon/blob/v2.15.1/icons/mongodb/mongodb-original.svg">
<img hspace="5" height="50px" src="https://github.com/devicons/devicon/blob/v2.15.1/icons/materialui/materialui-plain.svg">
<img hspace="5" height="50px" src="https://github.com/devicons/devicon/blob/v2.15.1/icons/mocha/mocha-plain.svg">
</span>

<br>
<hr>

### Screenshots

<div align="center">
   <span>
    <kbd>
      <img height="200px" alt="home page view" src="https://github.com/rosscondie/Atlas_Wealth_Group_Project/blob/main/client/public/homepageview.png">
    </kbd>
     &emsp;&emsp;
    <kbd>
     <img height="200px" alt="view stocks page view" src="https://github.com/rosscondie/Atlas_Wealth_Group_Project/blob/main/client/public/singlestockview.png">
    </kbd>
     <span>
 </div>



## Brief

A local trader has come to you with a portfolio of shares. She wants to be able to analyse it more effectively. She has a small sample data set to give you and would like you to build a Minimum Viable Product that uses the data to display her portfolio so that she can make better decisions.

### MVP

A user should be able to:

- View total current value.
- View individual and total performance trends.
- Retrieve a list of share prices from an external API and allow the user to add shares to her portfolio.
- Sell individual or multiple shares from her portfolio.
- View a chart of the current values in her portfolio.

### Extensions 

Possible Extensions:

- Be able to view current News relating to a specifc share.
- Setup the application for multiple users to use. 
- Add a watched list for favourite shares.

## Project Setup

#### Inside Server Folder:

Install required node modules:

```
npm i
```

Run seed file to populate app with template data:

```
npm run seeds
```

Create .env file in the server folder, add the following code and insert the API key from [Finnhub](https://finnhub.io/):
    
    
```
API_KEY="your api key goes here"
```
Start the server:

```
npm run server:dev
```

#### Inside Client Folder:

Install required node modules:

```
npm i
```

Start the app:

```
npm start
```

## Contributors:

<a href="https://github.com/Neil-Burgoyne/Shares-Portfolio-Application/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Neil-Burgoyne/Shares-Portfolio-Application" />
</a>

[Tim Henderson](https://github.com/TimoHenderson) | [Chris Barclay](https://github.com/doublerdiner) | [Neil Burgoyne](https://github.com/Neil-Burgoyne) | [Ross Condie](https://github.com/rosscondie)
