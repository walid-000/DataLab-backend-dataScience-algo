const ss = require("simple-statistics");
const calculateRSquared = require("./calculateRsq")
function handleSimpleLinearRegression(req , res){
    const {data : {xField , yField}}  = req.body ;
    const {data } = req.body ;
    const processdata = xField.map((item , index)=> [item , yField[index]]);
    const LinearRegression = ss.linearRegression(processdata)
    console.log("x " ,xField)
    console.log("y " ,yField)
    console.log("process data" , processdata)
    const slope =  LinearRegression.m ;
    const intercept =    LinearRegression.b ;
    const yPredict = xField.map((x) => slope*x + intercept);
    console.log("y predict  : " , yPredict)
    const rSq = calculateRSquared(yField ,yPredict)
    console.log(`slope ${slope} intercept ${intercept}  and for value of x 1 y => ${slope*1 + intercept} score is ${rSq}`);
    return res.status(200).json({"slope" : slope , "intercept" : intercept , "rSq" : rSq});
}

module.exports = {
    handleSimpleLinearRegression ,
    
}