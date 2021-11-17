# Sniffer

_Duration: 2 Week Sprint_

Sniffer designed to help the average pet parent manage their dog's food allergies and connect them with foods that fit their pooch's specific needs. In this app, you can create a profile for your dog where you can list known sensitivities, as well as track every food you've tried and how they did on it. Each profile features a "Sniff Out a New Food" button that brings the user to a search tailored specifically to their dog, showing only food that do not contain the ingredients they're sensitive to. Sniffer also has a comparison tool that allows the user to feed in two foods and instantly see any overlapping ingredients so they can more quickly zero in on what their pup is reacting to.

To see the fully functional site, please [CLICK HERE](https://sniffer-solo.herokuapp.com/#/home) [^1]

To see my scope document, including the database structure, wire frames, and stretch goals, please [CLICK HERE](https://docs.google.com/document/d/1MfT_YGyvV-wqLupuVIduDa7uiQT5kG6XzuGrqrRO8hY/edit?usp=sharing)

Demo login: 
> Username: Barbra
>
> Password: password

## Table of Contents

- [Screenshots](#screenshots)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contacts](#contacts)

## Screenshots

![List of a User's Pet with names and pictures showing](/documentation/screenshots/Pet_all.png)
On the Pet Page, you can see a list of all of the dogs you've added to Sniffer.

![Form to add a new pet to the site](/documentation/screenshots/Pet_add.png)
Easily add a new dog to your profile.

![Profile showing a pet's info](/documentation/screenshots/Pet_profile.png)
Keep all of your dog's information in one place, including an easily edited food log to track past foods you have tried. Click "sniff out a new food" to quickly bring up a food search specifically curated to your dog's needs.

![Food search filtering out allergens](/documentation/screenshots/Search.png)

![Detail view on specific food in search](/documentation/screenshots/Search_detail.png)
Click into one of the foods to see a list of its ingredients. From here you can easily add it to your dog's profile.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)

## Installation

1. Create a database named `sniffer_db`
2. The queries in the `database.sql` file are set up to create all the necessary tables and `sniffer_data.zip` has all the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries,
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage

### User

Track their dog's food, allergies, find new foods through a curated search, compare past foods to see overlapping ingredients.

### Admin

The admin has access to all of the user functionality as well as the ability to add new foods to the database and assign allegry groups to existing ingredients from the Admin Portal

![Admin page to add new foods to the database](/documentation/screenshots/Admin_addfood.png)

![Admin page to update allergy groups on ingredients in the database](/documentation/screenshots/Admin_allergies.png)

## Built With

- Javascript
- React
- Redux
- Node
- Express
- PostgreSQL
- Material UI

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Acknowledgement

Thanks to the Cullen Cohort, my instructors, and specifically Zach, John, and Dusty for their support through this project and the Prime program.

## Support

If you have suggestions or issues, please email me at [vada.karlen@gmail.com](vada.karlen@gmail.com)

[^1]: If at any point while using the deployed app things seem to freeze up or not render, refresh the page. Heroku will sometimes time out the database and it needs to be re spun up. 
