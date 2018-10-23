# STORE MANUS

[![Build Status](https://travis-ci.org/XROLE/storeManus.svg?branch=develop)](https://travis-ci.org/XROLE/storeManus)

Store Manus is a web application that helps store owners manage sales and product inventory records. This application is meant for use in a single store. With Store Manus,
  - Store attendant can search and add products to buyer’s cart.
  - Store attendant can see his/her sale records but can’t modify them.
  - Store attendant can update their profile
  - Store owner can add and delete attendant
  - Store owner can see sales and can filter by attendants.
  - Store owner can add, modify and delete products.
 
## Extra Features!
  - Store Owner can add name of his/her store
  - Store attendant can not add products that are out of stock
  - Products are grouped into types and categories
  
Note: The store owner is also referred to as the admin of the application.

# Table of Contents
- Getting Started
- Technology Stack
  - Dependencies
- Installation and Usage
- Testing
- Features
- Models
- API Documentation
- Express Routes
- License
FAQ
Current state

## Get Started
Store Manus is a javascript application built with [Node js](https://nodejs.org/en/) js and [Express] js.

## Tech Stack
- Node js
- Express js
- CSS
- HTML
- Javascript(ES6+)
- Mocha
- Chaijs

## API Endpoints 

| Endpoints | Functionality |
| ------ | ------ |
| Get/produts | Fetch all the products |
| Get/produts/:id | Fetch a single product |
| Get/sales | Fetch all sales record|
|Get/sales/:id |Fetch a single sales record |
| Post/products | Add products to store record |
| Post/sales | Create new sales record |
| Put/products/:id | Edit a product |
| Delete/products/:id | Delete a product|

## Other Dependencies
 - [Eslint](https://www.npmjs.com/package/eslint)
 - [Babel](https://www.npmjs.com/package/babel-cli)
 ## Style Guide
- [Air bnb]()

# Build Setup
Clone repo and cd into directory :
```
git clone https://github.com/XROLE/storeManus.git
```
Change Directory into storeManus and install Dependencies
```
$ cd storeManus
$npm install
```
Start the server : 
``` 
$ npm start 
```
To test the app,  run:
```
$npm test
```

Start Url:
```
 http://localhost:5000
```
## Links
Project Management: https://www.pivotaltracker.com/n/projects/2203086

Gh-pages: https://xrole.github.io/storeManus/

Heroku app: https://storemanus.herokuapp.com/

# Author
- Xrole Diamond