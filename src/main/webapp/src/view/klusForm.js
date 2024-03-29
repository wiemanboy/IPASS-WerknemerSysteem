import { getIdFromUrl, convertUrenMinutenToDouble, formatDate, formatTime, createKlusJson, addWerknemerJson, addMaterialJson } from "../utils/klusFormUtils.js";
import KlusService from "../service/klusService.js";
import WerknemerService from "../service/werknemerService.js";

const id = getIdFromUrl();
const klusServ = new KlusService();
const werknemerServ = new WerknemerService();


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

const error = document.querySelector(".errorDisplay");

function renderKlusForm() {
    // hide buttons and klus info
    saveBtn.style.display = "none";
    uren.style.visibility = "hidden";

    if (id === null) {
        // create klus
        klusInfo.style.visibility = "hidden";
        editBtn.style.visibility = "hidden";
        saveBtn.style.display = "initial";

        // edit title
        document.title = "Creëer Klus";

        saveBtn.addEventListener("click", create);
    }
    else {
        // edit klus
        editBtn.addEventListener("click", edit);

        // edit title
        document.title = "Klus #" + id;

        document.querySelector("#klusPageHead").textContent = "Klus #" + id;

        // get klus data
        klusServ.getKlus(id)
        .then(response => {if (response.ok) {return response.json();} else {if (response.status === 404) {error.textContent = "Klus bestaat niet";} throw "error";}})
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
    .then(response => {if (response.ok) {window.location.assign('/pages/tablePage.html'); return response.json();} else {if (response.status === 409) {error.textContent = "Klus bestaat al";} throw "error";}});

    datumInput.value = begindatum;
}

function edit() {
    // hide edit button
    editBtn.removeEventListener("click", edit);
    editBtn.style.visibility = "hidden";

    // show buttons and inputs
    saveBtn.style.display = "initial";
    uren.style.visibility = "visible";

    // enable inputs
    materialInput.disabled = false;
    werknemerSelect.disabled = false;

    //
    werknemerServ.getWerknemers()
    .then(response => {if (response.ok) {return response.json();} else throw "error"})
    .then((data) => {
        data.forEach(element => {werknemerSelect.options[werknemerSelect.options.length] = new Option(element.naam, element.naam);})
    });
    
    // add eventlistners
    addWerknemerBtn.addEventListener("click", addWerknemer);
    addMaterialBtn.addEventListener("click", addMaterial);
    saveBtn.addEventListener("click", update);

}

function addWerknemer() {
    // get value
    const werknemer = werknemerSelect.value;

    // add self
    if (werknemer === "addSelf") {
            werknemerServ.getSelf()
            .then(response => {if (response.ok) {return response.json();} else throw "error"})
            .then((data) => {addWerknemerToTable(data.naam)})
            .then(werknemerLst.push("self"));
    }
    else {
        // add werknemer to table
        addWerknemerToTable(werknemer)  

        // convert to json
        const json = addWerknemerJson(werknemer);
    
        // add to list
        werknemerLst.push(json);
    }
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

    // add werknemers
    if (werknemerLst !== []) {
        console.log("add werknemers");
        werknemerLst.forEach(element => {
            if (element === "self") {
                klusServ.addSelf(id)
                .then(response => {if (response.ok) {return response.json();} else throw "error"});
            }
            else {
                klusServ.addWerknemer(id, element)
                .then(response => {if (response.ok) {return response.json();} else throw "error"});
            }
        });
    }

    // add materials
    if (materialLst !== []) {
        console.log("add materials");
        materialLst.forEach(element => {
            klusServ.addMateriaal(id, element)
            .then(response => {if (response.ok) {return response.json();} else { throw "error";}});
        });
    }

    // add uren
    if (uren.uren !== 0) {
        console.log("add uren");
        klusServ.addUren(id, uren)
        .then(response => {if (response.ok) {return response.json();} else {if (response.status === 404) {error.textContent = "U bent nog geen onderdeel van deze klus, uren niet toegevoegd";} throw "error";}});
    }

    window.location.assign('/pages/tablePage.html');
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
            try {
                tableData[0].textContent = werkbon.werknemer.naam;
                tableData[1].textContent = formatTime(werkbon.uren);
            } catch (error) {
                tableData[0].textContent = werkbon;
                tableData[1].textContent = formatTime(0);
            }

    
             // add table data
            table.appendChild(rowNode);
}


// ---------- Main Program ---------- //
const materialLst = [];
const werknemerLst = [];

renderKlusForm()