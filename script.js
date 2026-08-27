let input = document.getElementById("inputBox");
let buttons = document.querySelectorAll(".buttons-grid button");
let string = "";

const copyBtn = document.getElementById("copyBtn");
let copyTimeout = null;

// Initially hide copy button
hideCopyBtn();

function showCopyBtn() {
    copyBtn.style.display = "flex";
}

function hideCopyBtn() {
    copyBtn.style.display = "none";
    copyBtn.textContent = "📋";
    copyBtn.classList.remove("copied");
    clearTimeout(copyTimeout);
}

copyBtn.addEventListener("click", () => {
    const result = input.value;
    if (!result || result === "Error" || result === "Can't divide by zero") return;

    navigator.clipboard.writeText(result).then(() => {
        copyBtn.textContent = "Copied!";
        copyBtn.classList.add("copied");
        clearTimeout(copyTimeout);
        copyTimeout = setTimeout(() => {
            copyBtn.textContent = "📋";
            copyBtn.classList.remove("copied");
        }, 2000);
    }).catch(() => {
        input.select();
        document.execCommand("copy");
    });
});

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
                if (string === "") return;
                let evalString = string.replace(/×/g, '*').replace(/÷/g, '/');
                string = eval(evalString);
                if (!isFinite(string)) {
                    input.value = "Can't divide by zero";
                    string = "";
                    hideCopyBtn();
                } else {
                    input.value = string;
                    string = string.toString();
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
            hideCopyBtn();
        }
        else if (value === "DEL") {
            string = string.toString().slice(0, -1);
            input.value = string;
            if (!string) hideCopyBtn();
            else hideCopyBtn(); // result is no longer final
        }
        else if (value === "√") {
            try {
                let evalString = string.replace(/×/g, '*').replace(/÷/g, '/');
                let num = eval(evalString);
                if (num < 0 || isNaN(num)) {
                    input.value = "Error";
                    string = "";
                    hideCopyBtn();
                } else {
                    string = Math.sqrt(num).toString();
                    input.value = string;
                    showCopyBtn();
                }
            } catch {
                input.value = "Error";
                string = "";
                hideCopyBtn();
            }
        }
        else if (value === "!") {
            try {
                let evalString = string.replace(/×/g, '*').replace(/÷/g, '/');
                let num = eval(evalString);
                let result = factorial(parseFloat(num));
                input.value = result;
                string = result !== "Error" ? result.toString() : "";
                if (result !== "Error") showCopyBtn();
                else hideCopyBtn();
            } catch {
                input.value = "Error";
                string = "";
                hideCopyBtn();
            }
        }
        else {
            string += value;
            input.value = string;
            hideCopyBtn(); 
        }
        input.scrollLeft = input.scrollWidth;
    });
});
