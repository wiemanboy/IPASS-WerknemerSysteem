import { getIdFromUrl, convertUrenMinutenToDouble, formatDate, createKlusJson, addWerknemerJson, addMaterialJson } from "../utils/klusFormUtils.js";
import KlusService from "../service/klusService.js";

const id = getIdFromUrl();
const klusServ = new KlusService();

// get buttons
const saveBtn = document.querySelector("#saveBtn");
const editBtn = document.querySelector("#editBtn");
const addMaterialBtn = document.querySelector("#addMaterialBtn");
const addWerknemerBtn = document.querySelector("#addWerknemerBtn");


const klusInfo = document.querySelector("#klusInfo");
const uren = document.querySelector("#uren");

// get inputs
const klantInput = document.querySelector("#klant");
const adresInput = document.querySelector("#adres");
const datumInput = document.querySelector("#Begindatum");

const urenInput = document.querySelector("#addUren");
const minutenInput = document.querySelector("#addMinute");

const materialInput = document.querySelector("#addMaterial");
const werknemerSelect = document.querySelector("#selectWerknemer");



function renderKlusForm() {
    // hide buttons and klus info
    saveBtn.style.visibility = "hidden";
    uren.style.visibility = "hidden";

    if (id === null) {
        // create klus
        klusInfo.style.visibility = "hidden";
        editBtn.style.visibility = "hidden";
        saveBtn.style.visibility = "visible";

        saveBtn.addEventListener("click", create);
    }
    else {
        // edit klus
        editBtn.addEventListener("click", edit);

        // get klus data
        klusServ.getKlus(id)
        .then(response => {if (response.ok) {return response.json();} else throw "error"})
        .then((data) => {
            klantInput.value = data.klant;
            adresInput.value = data.adres;
            datumInput.value = formatDate(data.beginDatum);

            data.materialen.forEach(element => {addMaterialToTable(element)});
            data.werknemers.forEach(element => {addWerknemerToTable(element)});

        });

        // disable inputs
        klantInput.disabled = true;
        adresInput.disabled = true;
        datumInput.disabled = true;
        materialInput.disabled = true;
        werknemerSelect.disabled = true;

    }
}

function create() {
    // get values
    const klant = klantInput.value;
    const adres = adresInput.value;
    const begindatum = datumInput.value;

    const json = createKlusJson(klant, adres, begindatum);

    klusServ.createKlus(json)
    .then(response => {if (response.ok) {window.location.assign('/pages/tablePage.html'); return response.json();} else throw "Error"});

    datumInput.value = begindatum;
}

function edit() {
    // hide edit button
    editBtn.removeEventListener("click", edit);
    editBtn.style.visibility = "hidden";

    // show buttons and inputs
    saveBtn.style.visibility = "visible";
    uren.style.visibility = "visible";

    // enable inputs
    materialInput.disabled = false;
    werknemerSelect.disabled = false;

    // add eventlistners
    addWerknemerBtn.addEventListener("click", addWerknemer);
    addMaterialBtn.addEventListener("click", addMaterial);
    saveBtn.addEventListener("click", update);

}

function addWerknemer() {
        // get value
        const werknemer = werknemerSelect.value;

        // convert to json
        const json = addWerknemerJson(werknemer);
    
        // add to list
        werknemerLst.push(json);
}

function addMaterial() {
    // get value
    const material = materialInput.value;

    // convert to json
    const json = addMaterialJson(material);

    // add to list
    materialLst.push(json);

    // add to table
    addMaterialToTable(json.materiaal);

    // empty input
    materialInput.value = "";
}

function update() {
    // get uren
    const urenValue = urenInput.value;
    const minutenValue = minutenInput.value;
    const uren = convertUrenMinutenToDouble(urenValue, minutenValue);

    // update klus
    console.log(uren);
    console.log(materialLst);
    console.log(werknemerLst);
}

var materialEven = true;

function addMaterialToTable(material){
        // get template data
        const rowNode = document.querySelector("#materialTemplate").content.cloneNode(true);
        const tableData = rowNode.querySelectorAll("td");
    
        // get table
        const table = document.querySelector("#materialBody");
    
        if (materialEven === true) {
            rowNode.querySelector('tr').setAttribute('class', "even");
            materialEven = false;
        }
        else {materialEven = true};
    
        // set table data
        tableData[0].textContent = material;

         // add table data
        table.appendChild(rowNode);
}

var werknemerEven = true;

function addWerknemerToTable(werkbon){
            // get template data
            const rowNode = document.querySelector("#werbonTemplate").content.cloneNode(true);
            const tableData = rowNode.querySelectorAll("td");
        
            // get table
            const table = document.querySelector("#werknemerBody");
        
            if (werknemerEven === true) {
                rowNode.querySelector('tr').setAttribute('class', "even");
                werknemerEven = false;
            }
            else {werknemerEven = true};
        
            // set table data
            tableData[0].textContent = werkbon.werknemer.naam;
            tableData[1].textContent = werkbon.uren;

    
             // add table data
            table.appendChild(rowNode);
}


// ---------- Main Program ---------- //
const materialLst = [];
const werknemerLst = [];

renderKlusForm()