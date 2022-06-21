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
    const rowNode = document.querySelector("#tableTemplate").content.cloneNode(true);
    const tableData = rowNode.querySelectorAll("td");

    const table = document.querySelector("tbody");
    rowNode.querySelector('tr').setAttribute('id', klus.id);

    if (klus.id % 2 == 0) {rowNode.querySelector('tr').setAttribute('class', "even");}

    tableData[0].textContent = klus.klant;
    tableData[1].textContent = klus.adres;
    tableData[2].textContent = klus.begindatum;

    table.appendChild(rowNode);

    console.log(table);
}

// ---------- Main Program ---------- //

renderTable()
