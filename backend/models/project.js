'use strict'

var mongose= require('mongoose');
var Schema = mongose.Schema;

var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String

});

module.exports= mongose.model('Project', ProjectSchema);