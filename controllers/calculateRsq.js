// Function to calculate the mean of an array
function mean(arr) {
    const sum = arr.reduce((acc, val) => acc + val, 0);
    return sum / arr.length;
  }
  
  // Function to calculate the sum of squared differences (SST)
  function totalSumOfSquares(observed) {
    const meanObserved = mean(observed);
    return observed.reduce((acc, val) => acc + Math.pow(val - meanObserved, 2), 0);
  }
  
  // Function to calculate the sum of squared residuals (SSE)
  function sumOfSquaredResiduals(observed, predicted) {
    return observed.reduce((acc, val, idx) => acc + Math.pow(val - predicted[idx], 2), 0);
  }
  
  // Function to calculate R-squared manually
  function calculateRSquared(observed, predicted) {
    const sst = totalSumOfSquares(observed);
    const sse = sumOfSquaredResiduals(observed, predicted);
    return 1 - (sse / sst);
  }
  

  module.exports = calculateRSquared ;