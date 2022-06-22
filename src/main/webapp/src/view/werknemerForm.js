import { getIdFromUrl, convertWerknemerDataToJSON, checkPassword, deleteWerknemerJson } from "../utils/formUtils.js";
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
        saveBtn.addEventListener("click", create);
    }
};


function edit() {
    // hide edit button
    editBtn.style.visibility = "hidden";
    editBtn.removeEventListener("click", edit);

    if (name !== "self") {
        // enable inputs
        document.getElementById("uurloon").disabled = false;
        document.getElementById("adminRecht").disabled = false;
    }

    //  show buttons
    saveBtn.style.visibility = "visible";
    deleteBtn.style.visibility = "visible";
    if (name === "self") {
        passwordForm.style.visibility = "visible";
        deleteBtn.style.visibility = "hidden";
    }

    saveBtn.addEventListener("click", update);
}

function create() {
    // get werknemer data
    const inputNameValue = document.getElementById("name").value;
    const uurloonValue = document.getElementById("uurloon").value;
    const adminValue = document.getElementById("adminRecht").checked;
    
    // convert werknemer data to json
    const werknemerJson = convertWerknemerDataToJSON(inputNameValue, uurloonValue, adminValue);

    // create werknemer
    werknemerServ.createWerknemer(werknemerJson)
    .then(response => {if (response.ok) {window.location.assign('./pages/tablePage.html'); return response.json();} else throw "Error"});

}

function deleteWerknemer() {
        // get werknemer data
        const inputNameValue = document.getElementById("name").value;
        
        // convert werknemer data to json
        const werknemerJson = convertWerknemerDataToJSON(inputNameValue);
    
        // delete werknemer
        werknemerServ.deleteWerknemer(werknemerJson)
        .then(response => {if (response.ok) {window.location.assign('./pages/tablePage.html'); return response.json();} else throw "Error"});
}

function update() {
    // get werknemer data
    const inputNameValue = document.getElementById("name").value;
    const uurloonValue = document.getElementById("uurloon").value;
    const adminValue = document.getElementById("adminRecht").checked;

    // convert werknemer data to json
    const werknemerJson = convertWerknemerDataToJSON(inputNameValue, uurloonValue, adminValue);
    
    //get password data
    const password = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // convert werknemer data to json
    const passwordJson = checkPassword(password, confirmPassword);

    // update werknemer
    let updateOk = false;
    werknemerServ.updateWerknemer(werknemerJson)
    .then(response => {if (response.ok) {updateOk = true; return response.json();} else {updateOk = false; throw "Error"}});

    // update password
    let passwordOk = false;
    if (passwordJson !== false && passwordJson.password !== "" && password !== "" && confirmPassword !== ""){
        werknemerServ.updatePassword(passwordJson)
        .then(response => {if (response.ok) {passwordOk = true; return true} else {passwordOk = false; throw "Error"}});
    }

    if (updateOk === true && passwordOk === true) {window.location.assign('./pages/tablePage.html');}
}

// ---------- Main Program ---------- //

renderWerknemerForm()