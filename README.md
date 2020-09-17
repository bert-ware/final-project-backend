# App
Drink-app
# Developers: 
Robert Ledezma - Alberto Correia  
# Link to App: 

https://drinks-app.herokuapp.com/

## Description

An app to calculate cost breakdown of cocktail recipes
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **Homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **Sign up** - As a user I want to sign up on the webpage so I can add and manage my providers,products and recipes  
- **Login** - As a user I want to be able to log in on the webpage so I can get back to my account
- **Logout** - As a user I want to be able to log out from the webpage so I can make sure no one will access my account
-**User-Profile** - As a user I want to access to my profile, change my profile image, and see more info
- **Providers** - As a user I want to see all my providers, introduce new ones or deleted those that are not helpfull anymore.
- **Provider details** - As a user I want to see general information of the especific provider and add the products those providers serve me.
-**Products** - As a user i want to see a display of all my products, compare if a product have different prize depending on provider and select products to make a new recipe.
- **Recipes** - As a user I want to see all my recipes.
- **Recipes details** - As a user I want to see usefull info about my recipes (cost price, recomended sale price...).


## Backlog

- **Share user recipes** 
- **Integrate testings**
-**Implement Metrics**
-**Implement loading pages**


## ROUTES:

|Method|URL|Description|
|---|---|---|
Auth|   
POST | /auth/signup |Create user
POST | /auth/login | login, redirects to user-profile
POST | /auth/logout | logout user 
PUT | /auth/user/:id | Change user image endpoint
Home |
GET | / | renders the homepage. if the user is logged in, render access. 
Products|
GET | /products | renders full products list
POST | /products | create a new product
GET | /products/:id | return a render of a specific product
PUT | /products/:id | route to update a specific product
DELETE | /products/:id | route to delete a specific product
PUT | /products/image/:id |  Change product image endpoint
Providers |
GET | /providers | renders full providers list
POST | /providers | create a new provider
GET | /providers/:id | return a render of a specific provider
PUT | /providers/:id | route to update a specific provider
DELETE | /providers/:id | route to delete a specific provider
PUT | /providers/image/:id |  Change provider image endpoint
Recipes |
GET | /recipes | renders full recipe list
POST | recipes | create a new recipe
GET | /recipes/:id | return a render of a specific recipe
PUT | /recipes/:id | route to update a specific recipe
DELETE | /recipes/:id | route to delete a specific recipe
PUT | /recipes/image/:id |  Change recipe image endpoint


## Models

```
User model
- ID: Object ID
- username: String
- Email: String
- passwordHash: String
- userImgUrl: String

```
```
provider model
- ID: Object ID
- name: String
- adress: String
- info: String
- telephone: Number
- userID : Object ID
- providerImgUrl : String

```
```
Product model
- ID: Object ID
- name: String
- price: Number
- format: Number
- typeFormat : String
- info: String
- provider: Object ID
- productImgUrl: String

```
```

Recipe model
- ID: Object ID
- name: String
- ingredients: [Products, quantity]
- user: Object ID
- method: String
- recipeImgUrl: String

```
``` 

## Links


### Git

The url to your repository and to your deployed project

[Repository Frontend Link] (https://github.com/bert-ware/final-project-frontend)
[Repository Frontend Link] (https://github.com/bert-ware/final-project-backend)


### Kanban

(https://trello.com/b/juxGftXn/proyecto-final)

### Slides

The url to your presentation slides

(https://docs.google.com/presentation/d/1vmC0sIQ1zcjQDe6x2H2RxkLYNl8pqDgb7VOf8klEVxI/edit#slide=id.g98ab30ac2d_0_5)
