import AuthenticationService from "../service/authenticationService.js";
import { convertFormDataToJSON } from "../utils/loginFormUtils.js"

const auth = new AuthenticationService();

function authenticate() {
    const formData = new FormData(document.forms['login']);
    const json = convertFormDataToJSON(formData);

    auth.login(json)
    .then((data) => console.log(data))
}

function renderLoginForm() {
    const submit = document.querySelector("#loginSubmit");
    submit.addEventListener("click", authenticate())
}

// ---------- Main Program ---------- //

renderLoginForm()