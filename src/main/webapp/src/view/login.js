import AuthenticationService from "../service/authenticationService.js";
import { convertFormDataToJSON } from "../utils/loginFormUtils.js"

const auth = new AuthenticationService();

function authenticate() {
    const formData = new FormData(document.forms['login']);
    const json = convertFormDataToJSON(formData);

    if (window.sessionStorage != undefined) {
        window.location.assign('./pages/tablePage.html')
    }
}

function renderLoginForm() {
    const submit = document.querySelector("#loginSubmit");
    submit.addEventListener("click", authenticate)
}

// ---------- Main Program ---------- //

renderLoginForm()
