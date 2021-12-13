"use strict";

const mongoose = require("mongoose"),
        {Schema} = require("mongoose");

var vacationSchema = new Schema(
        {
            title: {
                type: String,
                required: true,
                unique: true
            },
            description: {
                type: String,
                required: true
            },
            maxTravelers: {
                type: Number,
                default: 0,
                min: [0, "Vacation packages cannot have more than 25 travelers"]
            },
            cost: {
                type: Number,
                default: 0,
                min: [0, "Vacation packages cannot have a negative cost"]
            },
            heroImage: {
                type: String,
                default: "HeroImage.jpg",
                required: true
            },
            cuisine: {
                type: String,
                enum: ["", "Continental", "Traditional", "Haute-cuisine", "Nouvelle-cuisine", "Fusion", "Vegan", "Vegetarian", "Asian", "Indian", "Middle-Eastern", "African", "Central American", "South American"],
                required: true
            },
            destination:{
                type: String,
                required: true
            },
            departureLocation:{
                type: String,
                enum: ["", "New York (JFK)", "Boston (BOS)", "Chicago (ORD)", "Miami (MIA)", "St. Louis (STL)", "San Francisco (SFO)", "Dallas (DFW)", "Seattle (SEA)"],
                required: true
            },
            departureDate:{
                type: Date,
                required: true
            },
            returnDate:{
                type: Date,
                required: true
            }
        },
        {
            timestamps: true
        }
);

module.exports = mongoose.model("Vacation", vacationSchema);