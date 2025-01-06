const {handleSimpleLinearRegression ,} = require("./../controllers/dataSciController")
const express = require("express");

const router = express.Router()

router.post("/linear-regression" , handleSimpleLinearRegression);

module.exports =  router ;