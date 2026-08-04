/*=========================================
            MOHALLO SIGNUP
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("signupForm");

    const fullName = document.getElementById("fullName");

    const continueBtn = document.querySelector(".continue-btn");


    form.addEventListener("submit", function(e){

        e.preventDefault();

        const name = fullName.value.trim();

        /*==============================
            VALIDATION
        ==============================*/

        if(name === ""){

            alert("Please enter your full name.");

            fullName.focus();

            return;

        }

        if(name.length < 3){

            alert("Name must contain at least 3 characters.");

            fullName.focus();

            return;

        }

        /*==============================
        SAVE NAME
        ==============================*/

        sessionStorage.setItem("fullName", name);

        /*==============================
        BUTTON LOADING
        ==============================*/

        continueBtn.disabled = true;

        continueBtn.innerHTML =
        `<i class="fa-solid fa-spinner fa-spin"></i> Please Wait`;

        /*==============================
        REDIRECT
        ==============================*/

        setTimeout(()=>{

            window.location.href="phone.html";

        },1200);

    });

});