import { getIdFromUrl } from "../utils/formUtils.js";

const name = getIdFromUrl();

const saveBtn = document.querySelector("#saveBtn");
const editBtn = document.querySelector("#editBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const passwordForm = document.querySelector("#passwordForm")

function renderWerknemerForm() {
    saveBtn.style.visibility = "hidden";
    deleteBtn.style.visibility = "hidden";
    passwordForm.style.visibility = "hidden";
    
    if (name != null) {editBtn.addEventListener("click", edit)}
    else {
        editBtn.style.visibility = "hidden";
        saveBtn.style.visibility = "visible";
    }
};

function fillInInputs() {}

function edit() {
    saveBtn.style.visibility = "visible";
    deleteBtn.style.visibility = "visible";
    passwordForm.style.visibility = "visible";
}

// ---------- Main Program ---------- //

renderWerknemerForm()