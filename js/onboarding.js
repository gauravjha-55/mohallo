/*=========================================================
                MOHALLO ONBOARDING
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const page = document.body.dataset.page;

    switch(page){

        case "signup":
            signupPage();
            break;

        case "phone":
            phonePage();
            break;

        case "otp":
            otpPage();
            break;

        case "identity":
            identityPage();
            break;

        case "selfie":
            selfiePage();
            break;

        case "account":
            accountPage();
            break;

    }

});

/*=========================================================
                    SIGNUP PAGE
=========================================================*/

function signupPage(){

    const form = document.getElementById("signupForm");

    if(!form) return;

    form.addEventListener("submit",(e)=>{

        e.preventDefault();

        const fullName =
        document.getElementById("fullName").value.trim();

        if(fullName.length < 3){

            showToast(
                     "error",
                     "Invalid Name",
                    "Please enter your full name."
);

return;

            return;

        }

        sessionStorage.setItem("fullName",fullName);

        window.location.href="phone.html";

    });

}

/*=========================================================
                    PHONE PAGE
=========================================================*/

function phonePage(){

    const name =
    sessionStorage.getItem("fullName");

    const welcome =
    document.getElementById("welcomeText");

    if(name && welcome){

        welcome.innerHTML=`Hi ${name} 👋`;

    }

    const form =
    document.getElementById("phoneForm");

    if(!form) return;

    form.addEventListener("submit",(e)=>{

        e.preventDefault();

        const phone =
        document.getElementById("phone").value.trim();

        if(!/^[6-9]\d{9}$/.test(phone)){

            showToast(
                    "error",
                    "Invalid Number",
                    "Please enter a valid 10-digit mobile number."
);

return;

            return;

        }

        sessionStorage.setItem("phone",phone);

        window.location.href="otp.html";

    });

}

/*=========================================================
                    OTP PAGE
=========================================================*/

function otpPage(){

    console.log("OTP Loaded");

}

/*=========================================================
                IDENTITY PAGE
=========================================================*/

function identityPage(){

    console.log("Identity Loaded");

}

/*=========================================================
                SELFIE PAGE
=========================================================*/

function selfiePage(){

    console.log("Selfie Loaded");

}

/*=========================================================
                ACCOUNT PAGE
=========================================================*/

function accountPage(){

    console.log("Account Loaded");

}

/*=========================================================
                    TOAST
=========================================================*/

function showToast(type,title,message){

    const toast =
    document.getElementById("toast");

    const icon =
    document.getElementById("toastIcon");

    const toastTitle =
    document.getElementById("toastTitle");

    const toastMessage =
    document.getElementById("toastMessage");

    toast.className="toast";

    toast.classList.add(type);

    if(type==="success"){

        icon.className="fa-solid fa-circle-check";

    }

    if(type==="error"){

        icon.className="fa-solid fa-circle-xmark";

    }

    if(type==="info"){

        icon.className="fa-solid fa-circle-info";

    }

    toastTitle.innerHTML=title;

    toastMessage.innerHTML=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}