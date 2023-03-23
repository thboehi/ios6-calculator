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
//Define a var to save the text before it's copied
let beforeCopy
//Text that is shown on copy
let copyConfirmationText = "Copied"
//Variable to say if notification is active
let ntfActive = false
//Define a variable to know if calculator is waiting for a new input
let isWaiting = false
//Define a new var for last equation number to use multiple egal (Not use for the moment, future update)
//let lastEquationNumber
//Define if the next number will be negative, because of opposite function (Not used for the moment, future update)
//let isNegative = false

//This part is enterly for visual. It is done to adapt the size of the buttons when the page is loaded or when resized.
//The first variable is when the page is loaded, it get the button width (as on css it is 1fr and it adapts on user's screen)
let buttonWidth = document.querySelector('.calculator-button').clientWidth;
//Get the container of buttons, to apply later the style
const gridButtonsContainer = document.querySelector('#calculator-buttons-container')
//Get the size of user's screen
let screenWidth = document.documentElement.clientWidth
//If the user has a screen smaller than 768, which mean that he is on an tablet or phone, apply the style.
if (screenWidth <= 768){
    //First we set a new height which is based on button width, but minus 1/6 of his size
    buttonsHeight = (parseInt(buttonWidth - ((1/6)*buttonWidth)))
    //Apply the style
    gridButtonsContainer.style.gridTemplateRows = `repeat(5, ${buttonsHeight}px)`
}
//This is exactly the same as before but it is triggered when the page is resized, to be responsive and nice looking
window.addEventListener('resize', () => {
    screenWidth = document.documentElement.clientWidth;
    if (screenWidth <= 768){
        buttonWidth = document.querySelector('.calculator-button').clientWidth;
        buttonsHeight = (parseInt(buttonWidth - ((1/6)*buttonWidth)))
        gridButtonsContainer.style.gridTemplateRows = `repeat(5, ${buttonsHeight}px)`
    } else {
        //If it is bigger than 768px, just apply default style
        gridButtonsContainer.style.gridTemplateRows = `repeat(5, 60px)`
    }
    
});
//Add a copy function to copy last result
screenTextContainer.addEventListener("click", () => {
    if (screenTextContainer.textContent.includes(copyConfirmationText)){
        //If the screen is showing the copy confirmation, stop the function
        return;
    } else if (screenTextContainer.textContent.includes("...")){
        //If the result is an answer that was shorten, get the result variable instead of what's on the screen
        navigator.clipboard.writeText(result)
    } else {
        //If everything is alright, copy what's on the screen
        navigator.clipboard.writeText(screenTextContainer.textContent)
    }
    //Save what number is on the screen
    beforeCopy = screenTextContainer.textContent
    //Change text to copied!
    screenTextContainer.textContent = copyConfirmationText
    //Set the screen to show the previous number
    setTimeout(() => {
        screenTextContainer.textContent = beforeCopy
    }, 500);
})


//Function to add number
function addNumber(nbr){
    //Get what is on the screen
    onScreenNumber = screenTextContainer.textContent
    if (onResult === true){
        //If the screen is actually showing an answer, reset the screen with the new inputed number and put onResult boolean to false
        screenTextContainer.textContent = nbr
        onResult = false
    } else if(onScreenNumber.length >= 5){
        if (isWaiting){
            screenTextContainer.textContent = nbr
        } else {
            //Notification to show that you cannot add more than 5 numbers
            if (ntfActive){
                //If a notification is already on screen, don't show a new one
            } else if (!ntfActive) {
                //Activate notification on screen
                ntfActive = true
                //Set in html that ntf-container must be visible
                document.getElementById("ntf-container").setAttribute("data-value", "visible")
                //Set the message that will be shown
                document.getElementById("ntf-content").textContent = "5 numbers maximum allowed."
                //Set a timeout that will hide the message after 3 seconds
                setTimeout(() => {
                    //Deactivate notification on screen
                    ntfActive = false
                    //Set in html that ntf-container must be hidden
                    document.getElementById("ntf-container").setAttribute("data-value", "hidden")
                }, 3000);
            }
        //If the number is bigger than 5 characters, stop adding more. Or if he tries to add . but there is already one, don't add.
        return;
        }
    } else if (onScreenNumber.includes(".") && nbr === "."){
        //Same as before, please read above for explanation
        if (ntfActive){
        } else if (!ntfActive) {
            ntfActive = true
            document.getElementById("ntf-container").setAttribute("data-value", "visible")
            document.getElementById("ntf-content").textContent = "Why 2 points?.."
            setTimeout(() => {
                ntfActive = false
                document.getElementById("ntf-container").setAttribute("data-value", "hidden")
            }, 3000);
        }
        //If the number is bigger than 5 characters, stop adding more. Or if he tries to add . but there is already one, don't add.
        return;
    } else if (onScreenNumber.length === 0 && nbr === ".") {
        //If the user tries to add a point directly on an empty screen, add a zero before
        screenTextContainer.textContent = "0."
        isWaiting = false
    } else if (onScreenNumber === "0" && nbr === "."){
        //If the user tries to add a point when the screen is showing a zero (which is default), add directly after the zero.
        screenTextContainer.textContent = onScreenNumber + nbr
        isWaiting = false
    } else if (onScreenNumber === "0"){
        //If the screen is showing the default number, zero, clear it and show the new input
        screenTextContainer.textContent = nbr
        isWaiting = false
    } else if (onScreenNumber === "-0"){
        screenTextContainer.textContent = "-" + nbr
        isWaiting = false
    } else {
        //Add number after what already exists
        if (isWaiting){
            screenTextContainer.textContent = nbr
            isWaiting = false
        } else {
            screenTextContainer.textContent = onScreenNumber + nbr
        }
        
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
        //If the text on screen is empty, just change the equation type but nothing else
    } else if(screenTextContainer.textContent === copyConfirmationText){
        //If the screen is showing copy text, stop function (Nobody should ever do this, this is to achieve minimum possible error as possible)
        return;
    } else {
        onScreenNumber = screenTextContainer.textContent
        lastNumber = screenTextContainer.textContent
    }
    equationType = type
    onResult = false
    isWaiting = true
}

//Function to get the opposite
function opposite(){
    if (isWaiting){
        screenTextContainer.textContent = "-0"
    } else {
        screenTextContainer.textContent = -screenTextContainer.textContent
    }
    
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
