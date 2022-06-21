import AuthenticationService from "../service/authenticationService.js";
import { convertFormDataToJSON } from "../utils/loginFormUtils.js"

const auth = new AuthenticationService();

function authenticate() {
    // get login data from form
    const formData = new FormData(document.forms['login']);
    const json = convertFormDataToJSON(formData);

    // authorize user
    auth.login(json)

    // check if user is authorized if so go to next page
    .then(response => {if (response.ok) {window.location.assign('./pages/tablePage.html'); return response.json();} else throw "wrong username or password"})
    // set JWTtoken in session storage
    .then(result => window.sessionStorage.setItem("JWTtoken", result.JWT))
}

function renderLoginForm() {
    // add eventlistner to login button
    const submit = document.querySelector("#loginSubmit");
    submit.addEventListener("click", authenticate)
}

// ---------- Main Program ---------- //

renderLoginForm()
