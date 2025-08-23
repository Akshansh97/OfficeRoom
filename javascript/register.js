document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerusers");
    if (!form) {
        console.error("Registration page not found");

        let secondsLeft = 30;

        document.body.innerHTML = `
            <style>
                .error-link {
                    display: inline-block;
                    margin-top: 20px;
                    padding: 10px 20px;
                    background: #7a1596;
                    box-shadow: 0 0 15px rgba(255, 0, 79, 0.4);
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    font-family: 'Orbitron', sans-serif;
                    transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s;
                }
                .error-link:hover {
                    opacity: 0.85; 
                    color: #ff004f; 
                    text-shadow: 0 0 0.1px #ff004f, 0 0 1px #ff004f, 0 0 2px #ff004f; 
                    transition: all 0.4s ease;
                    transform: scale(1.03);
                }
            </style>

            <div style="text-align:center; margin-top:100px; color:red; font-family:'Orbitron', sans-serif; text-shadow: 0 0 0px #ff004f, 0 0 2px #ff004f, 0 0 4px #ff004f, 0 0 20px #ff004f;">
                <h1>Critical Error</h1>
                <p>Registration page not found. Please contact the site administrator.</p>
                <a href="OfficeRoom.html" class="error-link">Go to Home</a>
                <a href="tel:9399151219" class="error-link">Contact Administrator</a>
                <p id="countdown" style="margin-top: 10px; font-size: 14px; color: gray;">
                    Redirecting in <strong style="color:black">${secondsLeft}</strong> seconds...
                </p>
            </div>
        `;

        const countdownInterval = setInterval(() => {
            secondsLeft--;
            const countdownEl = document.getElementById("countdown");
            if (countdownEl) {
                countdownEl.innerHTML = `Redirecting in <strong style="color:black">${secondsLeft}</strong> seconds...`;
            }

            if (secondsLeft <= 0) {
                clearInterval(countdownInterval);
                window.location.href = "OfficeRoom.html";
            }
        }, 1000);

        return;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const firstname = document.getElementById("firstname").value;
        const lastname = document.getElementById("lastname").value;
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirm = document.getElementById("confirmpassword").value;

        if (password !== confirm) {
            showAlert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstname,
                    lastname,
                    username,
                    email,
                    password
                })
            });

            const result = await response.json();

            if (response.ok) {
                showAlert("Congratulations! You have successfully registered.", function () {
                    window.location.href = "login.html";
                });
            } else {
                showAlert(result.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            showAlert("Something went wrong. Please try again later.");
        }
    });
});

let alertCallback = null;

function showAlert(message, callback = null) {
    const alertBox = document.getElementById("customAlert");
    const alertMessage = document.getElementById("alertMessage");

    if (alertBox && alertMessage) {
        alertMessage.textContent = message;
        alertBox.classList.remove("hidden");
        alertCallback = callback;
    }
}

function closeAlert() {
    const alertBox = document.getElementById("customAlert");
    if (alertBox) {
        alertBox.classList.add("hidden");
    }
    if (typeof alertCallback === "function") {
        alertCallback();
        alertCallback = null;
    }
}
