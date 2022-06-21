import KlusService from "../service/klusService.js";

const klusServ = new KlusService();

function renderTable() {
    renderKlussen();
}

function deleteTableData() {}

function renderKlussen() {
    klusServ.getKlussen()
    .then(response => {if (response.ok) {return response.json();} else throw "error"})
    .then((data) => {
        Object.entries(data).forEach((element) => addTableRow(element[1]));
      });
}

function renderWerknemers() {}

function addTableRow(klus) {
    // get template data
    const rowNode = document.querySelector("#tableTemplate").content.cloneNode(true);
    const tableData = rowNode.querySelectorAll("td");

    // get table
    const table = document.querySelector("tbody");

    // set id
    rowNode.querySelector('tr').setAttribute('id', klus.id);
    if (klus.id % 2 == 0) {rowNode.querySelector('tr').setAttribute('class', "even");}

    const begindatum = "" + klus.begindatum;

    // set table data
    tableData[0].textContent = klus.klant;
    tableData[1].textContent = klus.adres;
    tableData[2].textContent = begindatum;

    // add table data
    table.appendChild(rowNode);
}

// ---------- Main Program ---------- //

renderTable()
