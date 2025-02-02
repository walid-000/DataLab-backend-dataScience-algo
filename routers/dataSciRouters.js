const {handleSimpleLinearRegression , handleMultipleLinearRegression , handleAprioriAlgo} = require("./../controllers/dataSciController")
const express = require("express");

const router = express.Router()

router.post("/linear-regression" , handleSimpleLinearRegression);
router.post("/multiple-linear-regression" , handleMultipleLinearRegression);

module.exports =  router ;