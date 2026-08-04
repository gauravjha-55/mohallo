/*=========================================================
                MOHALLO ONBOARDING
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const page = document.body.dataset.page;

    switch (page) {

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

function signupPage() {

    const form = document.getElementById("signupForm");

    if (!form) return;

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        const fullName =
            document.getElementById("fullName").value.trim();

        if (fullName.length < 3) {

            showToast(
                "error",
                "Invalid Name",
                "Please enter your full name."
            );

            return;

            return;

        }

        sessionStorage.setItem("fullName", fullName);

        window.location.href = "phone.html";

    });

}

/*=========================================================
                    PHONE PAGE
=========================================================*/

function phonePage() {

    const name =
        sessionStorage.getItem("fullName");

    const welcome =
        document.getElementById("welcomeText");

    if (name && welcome) {

        welcome.innerHTML = `Hi ${name} 👋`;

    }

    const form =
        document.getElementById("phoneForm");

    if (!form) return;

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        const phone =
            document.getElementById("phone").value.trim();

        if (!/^[6-9]\d{9}$/.test(phone)) {

            showToast(
                "error",
                "Invalid Number",
                "Please enter a valid 10-digit mobile number."
            );

            return;

            return;

        }

        sessionStorage.setItem("phone", phone);

        window.location.href = "otp.html";

    });

}

/*=========================================================
                    OTP PAGE
=========================================================*/
function otpPage() {

    const inputs = document.querySelectorAll(".otp-input");
    const phoneDisplay = document.getElementById("phoneDisplay");
    const phone = sessionStorage.getItem("phone");

    /*=========================
        SHOW PHONE NUMBER
    =========================*/

    if (phone) {

        const hidden =
            phone.substring(0, 2) +
            "XXXXXX" +
            phone.substring(8);

        phoneDisplay.innerHTML =
            `Enter the 6-digit verification code sent to <br><strong>+91 ${hidden}</strong>`;

    }

    /*=========================
            OTP INPUTS
    =========================*/

    inputs.forEach((input, index) => {

        input.addEventListener("input", () => {

            input.value = input.value.replace(/[^0-9]/g, '');

            if (input.value && index < inputs.length - 1) {

                inputs[index + 1].focus();

            }

        });

        input.addEventListener("keydown", (e) => {

            if (e.key === "Backspace" &&
                input.value === "" &&
                index > 0) {

                inputs[index - 1].focus();

            }

        });

    });

    /*=========================
            PASTE OTP
    =========================*/

    document.addEventListener("paste", (e) => {

        const pasted =
            e.clipboardData.getData("text").trim();

        if (/^\d{6}$/.test(pasted)) {

            inputs.forEach((box, i) => {

                box.value = pasted[i];

            });

        }

    });

    /*=========================
            VERIFY
    =========================*/

    const form = document.getElementById("otpForm");

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        let otp = "";

        inputs.forEach(box => {

            otp += box.value;

        });

        if (otp.length !== 6) {

            showToast(
                "error",
                "Incomplete OTP",
                "Please enter all 6 digits."
            );

            return;

        }

        showToast(
            "success",
            "OTP Verified",
            "Moving to Identity Verification..."
        );

        setTimeout(() => {

            window.location.href = "identity.html";

        }, 1200);

    });

    startOtpTimer();

}

/*=========================================================
                OTP TIMER
=========================================================*/

function startOtpTimer() {

    const countdown =
        document.getElementById("countdown");

    const timerText =
        document.getElementById("timerText");

    const resend =
        document.getElementById("resendOtp");

    let time = 30;

    resend.style.display = "none";
    timerText.style.display = "inline";

    countdown.textContent = time;

    const timer = setInterval(() => {

        time--;

        countdown.textContent = time;

        if (time <= 0) {

            clearInterval(timer);

            timerText.style.display = "none";

            resend.style.display = "inline";

        }

    }, 1000);

    resend.onclick = function (e) {

        e.preventDefault();

        showToast(
            "success",
            "OTP Sent",
            "A new verification code has been sent."
        );

        startOtpTimer();

    }

}

/*=========================================================
                IDENTITY PAGE
=========================================================*/

function identityPage() {

    const form = document.getElementById("identityForm");

    if (!form) return;

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        const file = document.getElementById("identityFile").files[0];

        if (!file) {

            showToast(
                "error",
                "No File",
                "Please upload your identity proof."
            );

            return;

        }

        sessionStorage.setItem("identityUploaded", "true");

        showToast(
            "success",
            "Uploaded",
            "Identity uploaded successfully."
        );

        setTimeout(() => {

            window.location.href = "selfie.html";

        }, 1200);

    });

}

/*=========================================================
                SELFIE PAGE
=========================================================*/

function selfiePage(){

    const video = document.getElementById("camera");
    const captureBtn = document.getElementById("captureBtn");
    const form = document.getElementById("selfieForm");

    let captured = false;

    navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {

        video.srcObject = stream;

    })
    .catch(() => {

        showToast(
            "error",
            "Camera Blocked",
            "Please allow camera access."
        );

    });

    captureBtn.addEventListener("click", () => {

        captured = true;

        showToast(
            "success",
            "Photo Captured",
            "Your selfie has been captured."
        );

    });

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        if(!captured){

            showToast(
                "error",
                "Capture Required",
                "Please capture your selfie first."
            );

            return;

        }

        sessionStorage.setItem("selfieCaptured","true");

        showToast(
            "success",
            "Verified",
            "Proceeding to account setup..."
        );

        setTimeout(() => {

            window.location.href = "create-account.html";

        },1200);

    });

}

/*=========================================================
                ACCOUNT PAGE
=========================================================*/

function accountPage(){

    const form = document.getElementById("accountForm");

    if(!form) return;

    form.addEventListener("submit",(e)=>{

        e.preventDefault();

        const username =
        document.getElementById("username").value.trim();

        const password =
        document.getElementById("password").value;

        const confirm =
        document.getElementById("confirmPassword").value;

        if(username.length < 4){

            showToast(
                "error",
                "Username",
                "Username must contain at least 4 characters."
            );

            return;

        }

        if(password.length < 8){

            showToast(
                "error",
                "Weak Password",
                "Password must contain at least 8 characters."
            );

            return;

        }

        if(password !== confirm){

            showToast(
                "error",
                "Password Mismatch",
                "Passwords do not match."
            );

            return;

        }

        sessionStorage.setItem("username",username);

        showToast(
            "success",
            "Welcome to Mohallo!",
            "Your account has been created successfully."
        );

        setTimeout(()=>{

            window.location.href="dashboard.html";

        },1500);

    });

}

/*=========================================================
                    TOAST
=========================================================*/

function showToast(type, title, message) {

    const toast =
        document.getElementById("toast");

    const icon =
        document.getElementById("toastIcon");

    const toastTitle =
        document.getElementById("toastTitle");

    const toastMessage =
        document.getElementById("toastMessage");

    toast.className = "toast";

    toast.classList.add(type);

    if (type === "success") {

        icon.className = "fa-solid fa-circle-check";

    }

    if (type === "error") {

        icon.className = "fa-solid fa-circle-xmark";

    }

    if (type === "info") {

        icon.className = "fa-solid fa-circle-info";

    }

    toastTitle.innerHTML = title;

    toastMessage.innerHTML = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}