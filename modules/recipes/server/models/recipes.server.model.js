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
  nutritional: {
    type: String,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});


mongoose.model('Recipe', RecipeSchema);
