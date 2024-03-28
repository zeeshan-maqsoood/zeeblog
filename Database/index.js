const express = require("express");
const mongoose = require("mongoose");
const config = require("../Config/index");

const connectMongoDb = async () => {
  try {
    await mongoose.connect(config.mongoURL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(`MongoDB connection error ${error}`);
  }
};

module.exports = connectMongoDb;
