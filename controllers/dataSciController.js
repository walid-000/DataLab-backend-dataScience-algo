const ss = require("simple-statistics");
const math = require("mathjs")

const calculateRSquared = require("./calculateRsq")
function handleSimpleLinearRegression(req , res){
    const {data : {xField , yField}}  = req.body ;
    const processdata = xField.map((item , index)=> [item , yField[index]]);
    const LinearRegression = ss.linearRegression(processdata)
    console.log("process data" , processdata)
    const slope =  LinearRegression.m ;
    const intercept =    LinearRegression.b ;
    const yPredict = xField.map((x) => slope*x + intercept);
    console.log("y predict  : " , yPredict)
    const rSq = calculateRSquared(yField ,yPredict)
    return res.status(200).json({"slope" : slope , "intercept" : intercept , "rSq" : rSq});
}



function handleMultipleLinearRegression(req, res) {
    let { x, y } = req.body; // x is the matrix of Independent variables and y is dependent variable  
    console.log("Independent values X:", x);
    console.log("Dependent values y:", y);

    // Add intercept term (1's) to the X matrix
    const x_designed = x.map((arr) => { 
        arr.unshift(1); 
        return arr; 
    });
    
    // Convert y into a column vector
    y = y.map((i) => [i]);
    
    console.log("Matrix y:", y);
    console.log("X adjusted for intercept:", x_designed);

    // Convert to math.js matrices
    const X_matrix = math.matrix(x_designed);
    const Y_matrix = math.matrix(y);

    try {
        // X^T * X
        const X_transpose = math.transpose(X_matrix);
        const X_transpose_X = math.multiply(X_transpose, X_matrix);
        
        // (X^T * X)^-1
        const X_transpose_X_inv = math.inv(X_transpose_X);  
        
        // (X^T * X)^-1 * X^T
        const Beta = math.multiply(X_transpose_X_inv, X_transpose);
        
        // (X^T * X)^-1 * X^T * Y
        const coefficients = math.multiply(Beta, Y_matrix);
        
        // Predict Y (Y_hat = X * Beta)
        const Y_hat = math.multiply(X_matrix, coefficients);
        
        // Calculate residuals (epsilon = Y - Y_hat)
        const residuals = math.subtract(Y_matrix, Y_hat);
        
        // Output results
        console.log("Regression Coefficients (Beta):", coefficients);
        console.log("Predicted Y (Y-hat):", Y_hat);
        console.log("Residuals (epsilon):", residuals);
        // const rSq = calculateRSquared(y , Y_hat.valueOf())    
        // console.log(" score is", rSq)    // Return the response with regression results
        return res.status(200).json({
            coefficients: coefficients.valueOf(),
            predictedY: Y_hat.valueOf(),
            residuals: residuals.valueOf()
        });
    } catch (error) {
        console.error("Error during regression calculation:", error);
        return res.status(500).json({
            error: "An error occurred during regression calculation",
            details: error.message
        });
    }
}


module.exports = {
    handleSimpleLinearRegression ,
    handleMultipleLinearRegression ,
    
}