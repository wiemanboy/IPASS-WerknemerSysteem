function getIdFromUrl() {
    let id;
  
    // get parameters from url
    const urlParams = new URL(document.location).searchParams;
  
    // set id
    id = urlParams.get('id');
  
    return id
}

function convertUrenMinutenToDouble(uren, minuten) {
    const urenDouble = Number(uren) + Number(minuten/60)
    return urenDouble
}

function formatDate(date) {
    //const day = date.slice(0,2)
    //const month = date.slice(3,5);
    //const year = date.slice(6,10);;

    //const formattedDate = `${year}-${month}-${day}`;

    console.log(date);
    return date
}

function createKlusJson(klant, adres, begindatum) {
    // make jsonObject
    const jsonObject = {"klant": "", "adres": "", "begindatum": ""};

    // format date
    const year = begindatum.slice(0,4)
    const month = begindatum.slice(5,7);
    const day = begindatum.slice(8,10);;

    const formattedBegindatum = `${day}/${month}/${year}`;
    
    // assign values
    jsonObject.klant = String(klant);
    jsonObject.adres = String(adres);
    jsonObject.begindatum = String(formattedBegindatum);
    
    return jsonObject;
}

function addWerknemerJson(name){
        // make jsonObject
        const jsonObject = {};
        jsonObject.naam = String(name);
    
        return jsonObject;
}

function addMaterialJson(material){
    // make jsonObject
    const jsonObject = {"materiaal": ""};
    jsonObject.materiaal = String(material);

    return jsonObject;
}

export {
    getIdFromUrl,
    convertUrenMinutenToDouble,
    formatDate,
    createKlusJson,
    addWerknemerJson,
    addMaterialJson
}