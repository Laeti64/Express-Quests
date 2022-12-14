const Joi = require("joi");
const joi = require("joi");
// const validateMovie = (req, res, next) => {
//   const { title, director, year, color, duration } = req.body;
//   const errors = [];

//   if (title == null) {
//     errors.push({
//       field: "title",
//       message: "The field 'title' is required",
//     });
//   }

//   if (director == null) {
//     errors.push({
//       field: "director",
//       message: "The field 'director' is required",
//     });
//   }

//   if (year == null) {
//     errors.push({
//       field: "year",
//       message: "The field 'year' is required",
//     });
//   }

//   if (color == null) {
//     errors.push({
//       field: "color",
//       message: "The field 'color' is required",
//     });
//   }

//   if (duration == null) {
//     errors.push({
//       field: "duration",
//       message: "The field 'duration' is required",
//     });
//   }

//   if (title.length >= 255) {
//     errors.push({
//       field: title,
//       message: "the title length is too long, must be less than 255 characters",
//     });
//   }
//   if (errors.length) {
//     res.status(422).json({ validationErrors: errors });
//   } else {
//     next();
//   }
// };

// const validateUser = (req, res, next) => {
//   const { firstname, lastname, email, city, language } = req.body;
//   const errors = [];

//   const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

//   if (!emailRegex.test(email)) {
//     errors.push({
//       field: "email",
//       message: "Invalid email",
//     });
//   }

//   if (errors.length) {
//     res.status(422).json({ validationErrors: errors });
//   } else {
//     next();
//   }
// };

const userSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
  city: Joi.string().max(255),
  language: Joi.string().max(255),
});

const movieSchema = Joi.object({
  title: Joi.string().max(255).required(),
  director: Joi.string().max(255).required(),
  year: Joi.string().max(255).required(),
  color: Joi.string().max(255),
  duration: Joi.number().max(11),
});

const validateUser = (req, res, next) => {
  const { firstname, lastname, email, city, language } = req.body;

  const { error } = userSchema.validate(
    { firstname, lastname, email, city, language },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;

  const { error } = movieSchema.validate(
    { title, director, year, color, duration },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  }
};

module.exports = {
  validateMovie,
  validateUser,
};
