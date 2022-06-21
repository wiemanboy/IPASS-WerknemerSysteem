import KlusService from "../service/klusService.js";

const klusServ = new KlusService();

function renderTable() {
    renderKlussen();
}

function deleteTableData() {}

function renderKlussen() {
    klusServ.getKlussen()
    .then(response => {if (response.ok) {return response.json();} else throw "error"})
    .then(result => Object.entries(result).forEach(element => addTableRow(element)));
}

function renderWerknemers() {}

function addTableRow(klus) {
    const rowNode = document.querySelector("#tableTemplate").content.cloneNode(true);
    const tableData = rowNode.querySelectorAll("td");

    document.querySelector("tbody");

    rowNode.querySelector("tr").setAtrrribute("id", klus.id);

    tableData[0].textContent = klus.klant;
    tableData[1].textContent = klus.adres;
    tableData[2].textContent = klus.begindatum;

}

// ---------- Main Program ---------- //

renderTable()
