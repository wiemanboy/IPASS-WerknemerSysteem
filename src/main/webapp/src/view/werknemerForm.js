import { getIdFromUrl, convertWerknemerDataToJSON, checkPassword } from "../utils/formUtils.js";
import WerknemerService from "../service/werknemerService.js";

const name = getIdFromUrl();
const werknemerServ = new WerknemerService();

// get buttons
const saveBtn = document.querySelector("#saveBtn");
const editBtn = document.querySelector("#editBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const passwordForm = document.querySelector("#passwordForm")

function renderWerknemerForm() {
    // hide buttons and password form
    saveBtn.style.visibility = "hidden";
    deleteBtn.style.visibility = "hidden";
    passwordForm.style.visibility = "hidden";

    // get inputs
    const inputName = document.getElementById("name");
    const uurloon = document.getElementById("uurloon");
    const admin = document.getElementById("adminRecht");
    
    console.log(name);

    if (name != null) {
         // edit werknemer
        editBtn.addEventListener("click", edit);

        // get werknemer
        let werknemer = null;
        if (name === "self") {
            werknemer = werknemerServ.getSelf();
        }
        else {
            werknemer = werknemerServ.getWerknemer(name);
        };

        // fill in inputs
        werknemer    
        .then(response => {if (response.ok) {return response.json();} else throw "error"})
        .then((data) => {
            console.log(data);
            let adminValue = false;
            if (data.role === "admin") {adminValue = true;}

            inputName.value = data.naam;
            uurloon.value = data.uurloon;
            admin.checked = adminValue;
        });

        // disable inputs
        inputName.disabled = true;
        uurloon.disabled = true;
        admin.disabled = true;
    }
    else {
        // create werknemer
        editBtn.style.visibility = "hidden";
        saveBtn.style.visibility = "visible";
    }
};


function edit() {
    // hide edit button
    editBtn.style.visibility = "hidden";
    editBtn.removeEventListener("click", edit);

    // enable inputs
    const inputName = document.getElementById("name").disabled = false;
    const uurloon = document.getElementById("uurloon").disabled = false;
    const admin = document.getElementById("adminRecht").disabled = false;

    //  show buttons
    saveBtn.style.visibility = "visible";
    deleteBtn.style.visibility = "visible";
    if (name === "self") {
        passwordForm.style.visibility = "visible";
        deleteBtn.style.visibility = "hidden";
    }

    saveBtn.addEventListener("click", update);
}

function update() {
    // get werknemer data
    const inputNameValue = document.getElementById("name").value;
    const uurloonValue = document.getElementById("uurloon").value;
    const adminValue = document.getElementById("adminRecht").checked;

    // convert werknemer data to json
    const werknemerJson = convertWerknemerDataToJSON(inputNameValue, uurloonValue, adminValue);
    
    console.log(werknemerJson);

    //get password data
    const password = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // convert werknemer data to json
    const passwordJson = checkPassword(password, confirmPassword);

    if (passwordJson !== false && passwordJson.password !== "" && password !== "" && confirmPassword !== ""){
        console.log(passwordJson);
    }
}

// ---------- Main Program ---------- //

renderWerknemerForm()