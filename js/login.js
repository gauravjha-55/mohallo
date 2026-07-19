/*=========================================
            MOHALLO LOGIN
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=====================================
          SHOW / HIDE PASSWORD
    =====================================*/

    const password = document.getElementById("password");
    const toggle = document.getElementById("togglePassword");

    if (password && toggle) {

        toggle.addEventListener("click", () => {

            if (password.type === "password") {

                password.type = "text";

                toggle.classList.remove("fa-eye");
                toggle.classList.add("fa-eye-slash");

            } else {

                password.type = "password";

                toggle.classList.remove("fa-eye-slash");
                toggle.classList.add("fa-eye");

            }

        });

    }

    /*=====================================
             LOGIN BUTTON
    =====================================*/

    const loginButton = document.querySelector(".login-btn");

    if (loginButton) {

        loginButton.addEventListener("click", (e) => {

            e.preventDefault();

            const username = document.querySelector(
                'input[type="text"]'
            ).value.trim();

            const passwordValue = password.value.trim();

            if (username === "" || passwordValue === "") {

                alert("Please fill in all the fields.");

                return;

            }

            loginButton.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Logging in...';

            loginButton.disabled = true;

            setTimeout(() => {

                alert("Frontend Login Successful! 🚀");

                loginButton.innerHTML = "Login";

                loginButton.disabled = false;

                /*
                Later we will replace this with:

                window.location.href="dashboard.html";

                */

            }, 1800);

        });

    }

    /*=====================================
            INPUT FOCUS EFFECT
    =====================================*/

    const inputs = document.querySelectorAll("input");

    inputs.forEach((input) => {

        input.addEventListener("focus", () => {

            input.parentElement.classList.add("active");

        });

        input.addEventListener("blur", () => {

            input.parentElement.classList.remove("active");

        });

    });

    /*=====================================
            ENTER KEY LOGIN
    =====================================*/

    document.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {

            loginButton.click();

        }

    });
});