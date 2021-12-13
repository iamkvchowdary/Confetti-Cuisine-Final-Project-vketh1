"use strict";

const mongoose = require("mongoose"),
    Vacation = require("./models/vacation");
mongoose.Promise = global.Promise;

// Updated by TJM (11/8/21) to add better connection error handling
mongoose
    .connect("mongodb://localhost:27017/confetti_cuisine", {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });

mongoose.set("useCreateIndex", true);

let vacationCount = 0;

Vacation.deleteMany({})
    .then(() => {
        return Vacation.create({
            title: "Cuisine de la France",
            description: "Learn the best of the culinary arts in the heart of France's best restaurants in Lyon.",
            cuisine: "Continental",
            cost: 7500,
            maxTravelers: 10,
            heroImage: "French.jpg",
            destination: "Lyon, France",
            departureLocation: "New York (JFK)",
            departureDate: "2022-03-01",
            returnDate: "2022-03-22",
        });
    })
    .then((vacation) => {
        console.log(vacation.title);
        vacationCount++;
    })
    .then(() => {
        return Vacation.create({
            title: "Thai Cuisine 101",
            description: "Pad thai, drunken noodles, guay teow, som tom, ... you name it. Learn how to make them like a pro right at home from the top masters of Thai cuisine.",
            cuisine: "Asian",
            cost: 12500,
            maxTravelers: 10,
            heroImage: "Thai.jpg",
            destination: "Bangkok, Thailand",
            departureLocation: "San Francisco (SFO)",
            departureDate: "2022-03-01",
            returnDate: "2022-03-22",
        });
    })
    .then((vacation) => {
        console.log(vacation.title);
        vacationCount++;
    })
    .then(() => {
        return Vacation.create({
            title: "Pasta, pasta, pasta!!!",
            description: "Study with the very best of everyday chefs making homemade dished just the way that their Nonna taught them.",
            cuisine: "Continental",
            cost: 3750,
            maxTravelers: 15,
            heroImage: "Italy.jpg",
            destination: "Rome, Italy",
            departureLocation: "Chicago (ORD)",
            departureDate: "2022-12-02",
            returnDate: "2022-12-12",
        });
    })
    .then((vacation) => {
        console.log(vacation.title);
        vacationCount++;
    })
    .then(() => {
        return Vacation.create({
            title: "Deutsche Kueche: German cooking beyond the bratwurst",
            description: "German cooking has a long history and is as varied as the countries where German is the prime language. Come explore the wide range of preparation styles, ingredients, etc. that this cuisine has to offer. Your teacher is Matthias Brandt of the Goldener Hirsch in Salzburg, Austria.",
            cuisine: "Continental",
            cost: 5500,
            maxTravelers: 10,
            heroImage: "Germany.jpg",
            destination: "Munich, Germany",
            departureLocation: "Boston (BOS)",
            departureDate: "2022-01-15",
            returnDate: "2022-01-22",
        });
    })
    .then((vacation) => {
        console.log(vacation.title);
        vacationCount++;
    });