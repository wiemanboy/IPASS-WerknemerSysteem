import KlusService from "../service/klusService.js";

const klusServ = new KlusService();

function renderTable() {
    console.log(renderKlussen());
}

function deleteTableData() {}

function renderKlussen() {
    klusServ.getKlussen()
    .then(response => {if (response.ok) {return response.json();} else throw "error"})
    .then(result => console.log(result));
}

function renderWerknemers() {}

// ---------- Main Program ---------- //

renderTable()
