import processResult from "./ProcessResult";
import { insertInput } from '../../helpers/db';

//This function is expecting the imagePath and using FormData object lets you compile a 
//set of value pairs to send using XMLHttpRequest. 
async function getTextFromImage(name, imagePath, address, description,lat,lng) {
    var data = new FormData();
    data.append('file', {
        uri: imagePath,
        type: 'image/jpg',
        name: 'file'
    });

    //Request Manager
    var xhr = new XMLHttpRequest();

    //OnStateChange is looking if the state is done (if i have an answare) 
    //and if yes, is showing me using console.log the JSON Response
    //Once I have the response, I am calling Process Result where I am extracting the right
    //thing that I need from that response
    //And finally, I am returning the result which it should be the price from the receipt
    xhr.onreadystatechange = async function () {

        if (this.readyState === this.DONE) {
            const ADD_INPUT = 'ADD_INPUT';
            console.log(this.responseText);
            var result = processResult(this.responseText);
            console.log(result);
            const dbResult = await insertInput(
                name,
                imagePath,
                address,
                result,
                description,
                lat,
                lng
            );
            console.log(dbResult);
            ({
                type: ADD_INPUT, inputData:
                {
                    id: dbResult.insertId, name: name,
                    imageURL: imagePath, address: address, amount: result, description: description, lat: lat, lng: lng
                }
            });
        }

    };

    //Opening the request with POST method and sending it to that link
    //The Request Header should have their Authorization included
    xhr.open("POST", "https://app.nanonets.com/api/v2/OCR/Model/a06d9d4c-6bb5-4985-8d00-9322db7140a3/LabelFile/");
    xhr.setRequestHeader("authorization", 'Basic ' + 'bDRNdjlfWC1BNU1MYkJQU2YzY3NVajZIVTNZTFFUSUg6');

    //sending the FormData Object
    xhr.send(data);
}

export default getTextFromImage
