let input = document.getElementById("inputBox");
let buttons = document.querySelectorAll("button");
let string = "";
let arr = Array.from(buttons);

arr.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (e.target.innerHTML == "=") {
                string = eval(string); // calculates result using eval() fn and update string 
                input.value = string;
                string = ""; //clear string after computing result
        }
        else if (e.target.innerHTML == "AC") {
            string = ""; 
            input.value = string;
        }
        else if (e.target.innerHTML == "DEL") {
            string = string.slice(0, string.length - 2); // deletes 2 chars instead of 1
            input.value = string;
        }
        else {
            // fixed double i/p error
            string += e.target.innerHTML;
            input.value = string;
        }
    });
});

//fn to evaluate expression when enter key is pressed
function calculateResult(){
    try{

        string = input.value.trim();   // sync with display
        string = eval(string);
        input.value = string;
        string = "";
    }
    catch (err) {
        input.value = "Error";
        string = "";
    }
}

//added event listener for enter key
document.addEventListener("keydown",(e) => {
    console.log("Key pressed:", e.key);
    if(e.key == "Enter"){
        e.preventDefault();
        calculateResult();  
    }
});

