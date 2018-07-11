'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Recipe Schema
 */
var RecipeSchema = new Schema({
  flavour: {
    type: String,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  ingredients: {
    type: [],
    trim: true,
    default: ['']
  },
  calories: {
    type: Number,
    trim: true
  },
  protein: {
    type: Number,
    trim: true
  },
  fat: {
    type: Number,
    trim: true
  },
  carbs: {
    type: Number,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});


mongoose.model('Recipe', RecipeSchema);
