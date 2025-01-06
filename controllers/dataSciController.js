const ss = require("simple-statistics");

function handleSimpleLinearRegression(req , res){
    const {data : {xField , yField}}  = req.body ;
    const {data } = req.body ;
    const LinearRegression = ss.linearRegression([xField , yField])
    console.log(data);
    console.log(xField)
    console.log(yField)
    const slope =  LinearRegression.m ;
    const intercept =    LinearRegression.b ;
    return res.status(200).json({"slope" : slope , "intercept" : intercept});
}

module.exports = {
    handleSimpleLinearRegression ,
    
}