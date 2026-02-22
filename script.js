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
// Theme Toggle
let themeToggle = document.getElementById("themeToggle");
let colorPicker = document.getElementById("colorPicker");

let darkMode = false;
themeToggle.addEventListener("click", () => {
    darkMode = !darkMode;
    if (darkMode) {
        document.documentElement.style.setProperty("--bg-color", "#1e1e1e");
        document.documentElement.style.setProperty("--calc-bg", "#2d2d2d");
        document.documentElement.style.setProperty("--btn-bg", "#3c3c3c");
        document.documentElement.style.setProperty("--text-color", "#ffffff");
        themeToggle.innerHTML = "☀ Light Mode";
    } else {
        document.documentElement.style.setProperty("--bg-color", "#ffffff");
        document.documentElement.style.setProperty("--calc-bg", "#f3f3f3");
        document.documentElement.style.setProperty("--btn-bg", "#e0e0e0");
        document.documentElement.style.setProperty("--text-color", "#000000");
        themeToggle.innerHTML = "🌙 Dark Mode";
    }
});
colorPicker.addEventListener("input", (e) => {
    document.documentElement.style.setProperty("--operator-bg", e.target.value);
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

