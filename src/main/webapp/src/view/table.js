import KlusService from "../service/klusService.js";
import WerknemerService from "../service/werknemerService.js"

const klusServ = new KlusService();
const werknemerServ = new WerknemerService();

function renderTable() {
    renderKlussen();
    renderWerknemers();
}

function deleteTableData() {}

function renderKlussen() {
    // get klussen
    klusServ.getKlussen()
    .then(response => {if (response.ok) {return response.json();} else throw "error"})
    .then((data) => {
        Object.entries(data).forEach((element) => addKlussen(element[1]));
      });
}

function addKlussen(klus) {
    // get template data
    const rowNode = document.querySelector("#tableTemplate").content.cloneNode(true);
    const tableData = rowNode.querySelectorAll("td");

    // get table
    const table = document.querySelector("tbody");

    // set id
    rowNode.querySelector('tr').setAttribute('id', klus.id);
    if (klus.id % 2 == 0) {rowNode.querySelector('tr').setAttribute('class', "even");}

    console.log(klus.begindatum);
    const begindatum = "" + klus.begindatum;

    // set table data
    tableData[0].textContent = klus.klant;
    tableData[1].textContent = klus.adres;
    tableData[2].textContent = begindatum;

    // add table data
    table.appendChild(rowNode);
}

function renderWerknemers() {
        // get werknemers
        werknemerServ.getWerknemers()
        .then(response => {if (response.ok) {return response.json();} else throw "error"})
        .then((data) => {
            Object.entries(data).forEach((element) => addWerknemers(element[1]));
          });
}

var werknemerEven = true;

function addWerknemers(werknemer) {
        // get template data    
        const rowNode = document.querySelector("#tableTemplate").content.cloneNode(true);
        const tableData = rowNode.querySelectorAll("td");
    
        // get table
        const table = document.querySelector("tbody");
    
        // set id
        rowNode.querySelector('tr').setAttribute('id', werknemer.naam);

        if (werknemerEven === true) {
            rowNode.querySelector('tr').setAttribute('class', "even");
            werknemerEven = false;
        }
        else {werknemerEven = true};
        
        // set table data
        tableData[0].textContent = werknemer.naam;
        tableData[1].textContent = "€" + werknemer.uurloon + " / uur";
        tableData[2].textContent = "role: " + werknemer.role;
    
        // add table data
        table.appendChild(rowNode);
    }


// ---------- Main Program ---------- //

renderTable()
