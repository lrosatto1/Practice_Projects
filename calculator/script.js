// Calculator Program


const displayHTML = document.getElementById('display');

function appendToDisplay(input){
    displayHTML.value += input;
}

function clearDisplay() {
    displayHTML.value = "";

}

function calculate(){
    try{
        displayHTML.value = eval(displayHTML.value);
    }
    catch(error) {
        displayHTML.value = 'Error';
    }
}