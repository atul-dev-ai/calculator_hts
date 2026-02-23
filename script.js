let input = document.getElementById("inputBox");
let buttons = document.querySelectorAll("button:not(#copyBtn)");
let string = "";

// ==================== COPY BUTTON ====================
const copyBtn = document.getElementById("copyBtn");
let copyTimeout = null;

/** Shows the copy button — called whenever a result is ready on the display */
function showCopyBtn() {
    copyBtn.style.display = "block";
}

/** Hides the copy button — called on AC or when display is cleared */
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
        // Show "Copied!" feedback briefly, then restore the icon
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
            // Hide copy button if display is cleared by DEL
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
            string += value;
            input.value = string;
            hideCopyBtn(); // user is still typing, hide the button
        }
        input.scrollLeft = input.scrollWidth;
    });
});

// Enter key support
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        try {
            string = eval(input.value);
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
});

// Block invalid keyboard input
const allowedKeys = "0123456789+-*/().!";
input.addEventListener("keypress", (e) => {
    if (!allowedKeys.includes(e.key)) {
        e.preventDefault();
    }
});

// Allow pasting values into the calculator (e.g. a copied result)
input.addEventListener("paste", (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData("text");
    // Only allow if the pasted text is a valid number
    if (!isNaN(pasted) && pasted.trim() !== "") {
        string = pasted.trim();
        input.value = string;
        hideCopyBtn();
    }
});