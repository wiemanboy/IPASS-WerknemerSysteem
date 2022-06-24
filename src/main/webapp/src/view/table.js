import KlusService from "../service/klusService.js";
import WerknemerService from "../service/werknemerService.js";

const klusServ = new KlusService();
const werknemerServ = new WerknemerService();

function renderTablePage() {
    // start with klussen table
    renderKlussen();

    werknemerServ.getSelf()
    .then(response => {if (response.ok) {return response.json();} else throw "Error"})
    .then((data) => { if (data.role === "admin") {
        document.querySelector("#renderWerknemersBtn").addEventListener("click", renderWerknemers);
    }
    else {document.querySelector("#renderWerknemersBtn").style.display = "none";}
    });

    // add eventlistner for switching between klussen and werknemers table
    document.querySelector("#renderKlussenBtn").addEventListener("click", renderKlussen);
}

function deleteTableData() {
    const table = document.querySelector("tbody");
    const tableData = document.querySelectorAll("td");

    // remove event listners
    tableData.forEach((element) => element.removeEventListener("click", function(){}));

    // remove table data
    table.innerHTML = "";
}

function renderAddWerknemerBtn() {
    window.location.assign("/pages/werknemerPage.html?");
}

function renderAddKlusBtn() {
    window.location.assign("/pages/klusPage.html?");
}

function renderKlussen() {
    // edit header
    document.querySelector("#tablePageHead").textContent = "klussen";

    // empty table
    deleteTableData();

    // add ecentlistner for add button
    document.querySelector("#addButton").addEventListener("click", renderAddKlusBtn)

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

    // add ecentlistner for add button
    document.querySelector("#addButton").addEventListener("click", renderAddWerknemerBtn)

    // get werknemers
    werknemerServ.getWerknemers()
    .then(response => {if (response.ok) {return response.json();} else throw "error"})
    .then((data) => {
        Object.entries(data).forEach((element) => addWerknemers(element[1]));
      });
}

function addWerknemers(werknemer) {
        // get template data    
        const rowNode = document.querySelector("#tableTemplate").content.cloneNode(true);
        const tableData = rowNode.querySelectorAll("td");
    
        // get table
        const table = document.querySelector("tbody");
    
        // set id
        rowNode.querySelector('tr').setAttribute('id', werknemer.naam);

        // 
        const rows = table.querySelectorAll("tr");
        if (rows.length % 2 === 0) {
            rowNode.querySelector('tr').setAttribute('class', "even");
        }
        
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
        window.location.assign("/pages/werknemerPage.html?naam=" + name);
    }

    function showKlus(id) {
        window.location.assign("/pages/klusPage.html?id=" + id);
    }


// ---------- Main Program ---------- //

renderTablePage()