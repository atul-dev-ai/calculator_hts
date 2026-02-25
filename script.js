let input = document.getElementById("inputBox");
let buttons = document.querySelectorAll(".calc button");
let string = "";

const copyBtn = document.getElementById("copyBtn");
let copyTimeout = null;

function showCopyBtn() {
    copyBtn.style.display = "block";
}

function hideCopyBtn() {
    copyBtn.style.display = "none";
    copyBtn.textContent = "📋";
    copyBtn.classList.remove("copied");
    clearTimeout(copyTimeout);
}

copyBtn.addEventListener("click", () => {
    const result = input.value;
    if (!result || result === "Error") return;

    navigator.clipboard.writeText(result).then(() => {
        copyBtn.textContent = "Copied!";
        copyBtn.classList.add("copied");
        clearTimeout(copyTimeout);
        copyTimeout = setTimeout(() => {
            copyBtn.textContent = "📋";
            copyBtn.classList.remove("copied");
        }, 2000);
    }).catch(() => {
        // Fallback for browsers where clipboard write fails
        input.select();
        document.execCommand("copy");
    });
});
// =====================================================

// Factorial function
function factorial(n) {
    if (n < 0 || !Number.isInteger(n)) return "Error";
    let fact = 1;
    for (let i = 1; i <= n; i++) {
        fact *= i;
    }
    return fact;
}

buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        let value = e.target.innerHTML;

        if (value === "=") {
            try {

                string = eval(string); 
                input.value = string;
            } catch {
                input.value = "Error";
                string = ""; 
            }
        }
        else if (e.target.innerHTML == "AC") {
            string = "";  
            input.value = string;
        }
        else if (e.target.innerHTML == "DEL") {
            string = string.toString().slice(0, -1); 

                string = eval(string);
                // eval("5/0") returns Infinity — treat it as an error
                if (!isFinite(string)) {
                    input.value = "Can't divide by zero";
                    string = "";
                    hideCopyBtn();
                } else {
                    input.value = string;
                    string = "";
                    showCopyBtn();
                }
            } catch {
                input.value = "Error";
                string = "";
                hideCopyBtn();
            }
        }

        else if (value === "AC") {
            string = "";
            input.value = "";
            hideCopyBtn(); // clear resets everything
        }

        else if (value === "DEL") {
            string = string.slice(0, -1);
            input.value = string;
            if (!string) hideCopyBtn();
        }

        else if (value === "√") {
            let num = parseFloat(input.value);
            if (num < 0 || isNaN(num)) {
                input.value = "Error";
                hideCopyBtn();
            } else {
                input.value = Math.sqrt(num);
                string = "";
                showCopyBtn(); // result is ready
            }
        }

        else if (value === "!") {
            let num = parseFloat(input.value);
            let result = factorial(num);
            input.value = result;
            string = "";
            if (result !== "Error") showCopyBtn(); // result is ready
            else hideCopyBtn();
        }

        else {

            input.value = string;
            hideCopyBtn(); // user is still typing, hide the button
        }
        input.scrollLeft = input.scrollWidth;
    });
});
