//Number before equation is selected
let lastNumber = 0
//Define the number that is on screen
let onScreenNumber = 0
//Define the second number that will be used for the equation
let equationNumber = 0
//Define what type of equation it will be, substraction, addition, division, etc...
let equationType = ""
//Define a variable that will be the result to show on the screen
let result = 0
//Get the element screen-text where the numbers will be shown
let screenTextContainer = document.getElementById("calculator-screen-text")
//Define if the calculator state, if showing a result or if entering a number
let onResult = false
const buttonWidth = document.querySelector('.calculator-button').clientWidth;
const gridButtonsContainer = document.querySelector('#calculator-buttons-container')

let screenWidth = document.documentElement.clientWidth
if (screenWidth <= 768){
    buttonsHeight = (parseInt(buttonWidth - ((1/6)*buttonWidth)))
    gridButtonsContainer.style.gridTemplateRows = `repeat(5, ${buttonsHeight}px)`
}
//Function to add number
function addNumber(nbr){
    //Get what is on the screen
    onScreenNumber = screenTextContainer.textContent
    if (onResult === true){
        //If the screen is actually showing an answer, reset the screen with the new inputed number and put onResult boolean to false
        screenTextContainer.textContent = nbr
        onResult = false
    } else if(onScreenNumber.length >= 5 || onScreenNumber.includes(".") && nbr === "."){
        alert("Maximum 5 caracters !")
        //If the number is bigger than 5 characters, stop adding more. Or if he tries to add . but there is already one, don't add.
        return;
    } else if (onScreenNumber.length === 0 && nbr === ".") {
        //If the user tries to add a point directly on an empty screen, add a zero before
        screenTextContainer.textContent = "0."
    } else if (onScreenNumber === "0" && nbr === "."){
        //If the user tries to add a point when the screen is showing a zero (which is default), add directly after the zero.
        screenTextContainer.textContent = onScreenNumber + nbr
    } else if (onScreenNumber === "0"){
        //If the screen is showing the default number, zero, clear it and show the new input
        screenTextContainer.textContent = nbr
    } else {
        //Add number after what already exists
        screenTextContainer.textContent = onScreenNumber + nbr
    }
}

//Function to clear text area
function clearText(){
    //Set the onResult boolean to false and set screen to show zero, which is default
    onResult = false
    screenTextContainer.textContent = "0"
}

//Function to get first number and type of equation
function equation(type){
    //Get what on the screen and define what type of equation user wants to do when the user will press egal
    //If the user already pressed once and is on the second etap (which is add a second number) it doesn't
    // get what on the screen again as it is empty.
    if (screenTextContainer.textContent === ""){
        
    } else {
        onScreenNumber = screenTextContainer.textContent
        lastNumber = screenTextContainer.textContent
    }
    equationType = type
    onResult = false
    screenTextContainer.textContent = ""
}

//Function to get result based on what equation was choosen by the user
function egal(){
    if (onResult === true){
        //If screen is already showing a result, do nothing
        return
    }
    //Define that is showing a result (State)
    onResult = true
    //Get the second number of the equation (currently on screen)
    equationNumber = screenTextContainer.textContent
    if (equationNumber === ""){
        alert("Give another number.");
        return;
    }
    if (equationType === "addition"){
        //Get the String and transform to Float to make the addition
        result = parseFloat(lastNumber) + parseFloat(equationNumber)
    } else if (equationType === "substraction") {
        //Same but with substraction
        result = parseFloat(lastNumber) - parseFloat(equationNumber)
    } else if (equationType === "multiplication") {
        //Same but with multiplication
        result = parseFloat(lastNumber) * parseFloat(equationNumber)
    } else if (equationType === "division") {
        //Same but with division
        result = parseFloat(lastNumber) / parseFloat(equationNumber)
    } else { return }

    //If the result is longer than 7 chars, add "..." at the end.
    if (result.toString().length <= 7){
        screenTextContainer.textContent = result
    } else {
        screenTextContainer.textContent = result.toString().substring(0, 7) + "..."
    }

}
