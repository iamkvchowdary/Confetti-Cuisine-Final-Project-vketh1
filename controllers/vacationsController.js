"use strict";

const Vacation = require("../models/vacation"),
        passport = require("passport"),
        getVacationParams = body => {
            return {
                title: body.title,
                description: body.description,
                maxTravelers: body.maxTravelers,
                cost: body.cost,
                heroImage: body.heroImage,
                cuisine: body.cuisine,
                destination: body.destination,
                departureLocation: body.departureLocation,
                departureDate: body.departureDate,
                returnDate: body.returnDate
            };
        };

module.exports = {
    index: (req, res, next) => {
        Vacation.find()
                .then(vacations => {
                    res.locals.vacations = vacations;
                    next();
                })
                .catch(error => {
                    console.log(`Error fetching vacations: ${error.message}`);
                    next(error);
                });
    },
    indexView: (req, res) => {
        res.render("vacations/index");
    },

    new : (req, res) => {
        res.render("vacations/new");
    },

    create: (req, res, next) => {
        let newVacation = getVacationParams(req.body);
        Vacation.create(newVacation)
                .then(vacation => {
                    res.locals.redirect = "/vacations";
                    res.locals.vacation = vacation;
                    next();
                })
                .catch(error => {
                    console.log(`Error saving vacation: ${error.message}`);
                    next(error);
                });
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath !== undefined)
            res.redirect(redirectPath);
        else
            next();
    },

    show: (req, res, next) => {
        let vacationId = req.params.id;
        Vacation.findById(vacationId)
                .then(vacation => {
                    res.locals.vacation = vacation;
                    next();
                })
                .catch(error => {
                    console.log(`Error fetching vacation by ID: ${error.message}`);
                    next(error);
                });
    },

    showView: (req, res) => {
        res.render("vacations/show");
    },

    edit: (req, res, next) => {
        let vacationId = req.params.id;
        Vacation.findById(vacationId)
                .then(vacation => {
                    res.render("vacations/edit", {
                        vacation: vacation
                    });
                })
                .catch(error => {
                    console.log(`Error fetching vacation by ID: ${error.message}`);
                    next(error);
                });
    },

    update: (req, res, next) => {
        let vacationId = req.params.id,
                vacationParams = getVacationParams(req.body);

        Vacation.findByIdAndUpdate(vacationId, {
            $set: vacationParams
        })
                .then(vacation => {
                    res.locals.redirect = `/vacations/${vacationId}`;
                    res.locals.vacation = vacation;
                    next();
                })
                .catch(error => {
                    console.log(`Error updating vacation by ID: ${error.message}`);
                    next(error);
                });
    },

    delete: (req, res, next) => {
        let vacationId = req.params.id;
        Vacation.findByIdAndRemove(vacationId)
                .then(() => {
                    res.locals.redirect = "/vacations";
                    next();
                })
                .catch(error => {
                    console.log(`Error deleting vacation by ID: ${error.message}`);
                    next();
                });
    },
    login: (req, res) => {
        res.render("vacations/login");
    },
    validate: (req, res, next) => {
        req
                .sanitizeBody("email")
                .normalizeEmail({
                    all_lowercase: true
                })
                .trim();
        req.check("email", "Email is invalid").isEmail();
        req
                .check("zipCode", "Zip code is invalid")
                .notEmpty()
                .isInt()
                .isLength({
                    min: 5,
                    max: 5
                })
                .equals(req.body.zipCode);
        req.check("password", "Password cannot be empty").notEmpty();
        req.getValidationResult().then(error => {
            if (!error.isEmpty()) {
                let messages = error.array().map(e => e.msg);
                req.skip = true;
                req.flash("error", messages.join(" and "));
                res.locals.redirect = "/vacations/new";
                next();
            } else {
                next();
            }
        });
    },
    authenticate: passport.authenticate("local", {
        failureRedirect: "/vacations/login",
        failureFlash: "Failed to login.",
        successRedirect: "/",
        successFlash: "Logged in!"
    }),
    logout: (req, res, next) => {
        req.logout();
        req.flash("success", "You have been logged out!");
        res.locals.redirect = "/";
        next();
    }
};
