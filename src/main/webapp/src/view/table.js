import KlusService from "../service/klusService.js";
import WerknemerService from "../service/werknemerService.js"

const klusServ = new KlusService();
const werknemerServ = new WerknemerService();

function renderTablePage() {
    // start with klussen table
    renderKlussen();

    // add eventlistner for switching between klussen and werknemers table
    document.querySelector("#renderKlussenBtn").addEventListener("click", renderKlussen);
    document.querySelector("#renderWerknemersBtn").addEventListener("click", renderWerknemers);
}

function deleteTableData() {
    const table = document.querySelector("tbody");
    const tableRow = table.querySelectorAll("tr");

    table.innerHTML = "";
}

function renderKlussen() {
    // edit header
    document.querySelector("#tablePageHead").textContent = "klussen";

    // remove event listners
    tableData[0].removeEventListener("click", function(){});
    tableData[1].removeEventListener("click", function(){});
    tableData[2].removeEventListener("click", function(){});


    // empty table
    deleteTableData();

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

    // set table data
    tableData[0].textContent = klus.klant;
    tableData[1].textContent = klus.adres;
    tableData[2].textContent = klus.beginDatum;

    //add eventlistners
    tableData[0].addEventListener("click", function(){showKlus(klus.id)});
    tableData[1].addEventListener("click", function(){showKlus(klus.id)});
    tableData[2].addEventListener("click", function(){showKlus(klus.id)});

    // add table data
    table.appendChild(rowNode);
}

function renderWerknemers() {
    // edit header
    document.querySelector("#tablePageHead").textContent = "werknemers";

    // empty table
    deleteTableData();

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
        tableData[1].textContent = "€ " + werknemer.uurloon + " / uur";
        tableData[2].textContent = "role: " + werknemer.role;

        //add eventlistners
        tableData[0].addEventListener("click", function(){showWerknemer(werknemer.naam)});
        tableData[1].addEventListener("click", function(){showWerknemer(werknemer.naam)});
        tableData[2].addEventListener("click", function(){showWerknemer(werknemer.naam)});

        // add table data
        table.appendChild(rowNode);
    }

    function showWerknemer(name) {
        window.location.assign("./pages/werknemerPage.html?id=" + name);
    }

    function showKlus(id) {
        window.location.assign("./pages/klusPage.html?id=" + id);
    }


// ---------- Main Program ---------- //

renderTablePage()
