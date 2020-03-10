function processResult(rawPrediction) {
    //aici am sters semnul intrebarii
    var regexForNumbers = /[+-]?\d+(\.\d+)/g; 
    //This Pattern is returning the numbers
    var regexForExtractingStrings=/(?="ocr_text")(.+?)(?=])/g;
   // var regexForExtractingStrings = /(?="ocr_text")(.*)(?=")/g; 
    //This Pattern is returning everything bewtween the quotes for ocr-text
    var newString = rawPrediction.match(regexForExtractingStrings).toString(); 
    //rawPrediction is my JSON Response. I compare it and my newString will have
    //only OCR-TEXT : ....

    console.log(newString);

    //match()	Returns an array containing all of the matches
    var floats = newString.match(regexForNumbers).map(function(v) { return parseFloat(v); });
    //Map is appling the function over all the elements and is returning the numbers.

    console.log(floats);
    //Taking the max number which represents the Total Price
    return Math.max(...floats); 
}

export default processResult
