'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  path = require('path'),
  Schema = mongoose.Schema,
  validator = require('validator');

var validateLocalStrategyCalories = function(calories) {
  return validator.isNumeric(calories);
}

/**
 * Recipe Schema
 */
var RecipeSchema = new Schema({
  flavour: {
    type: String,
    trim: true,
    required: 'Please fill in atleast protein flavour'
  },
  ingredients: {
    type: [],
    trim: true,
    default: ['']
  },
  calories: {
    type: String,
    trim: true,
    validate: [validateLocalStrategyCalories, 'Please choose correct number of calories']
  },
  type: {
    type: String,
    trim: true,
    default:''
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  created: {
    type: Date,
    default: Date.now
  },
});


mongoose.model('Recipe', RecipeSchema);
