function getNameFromUrl() {
    let id;
  
    // get parameters from url
    const urlParams = new URL(document.location).searchParams;
  
    // set id
    id = urlParams.get('naam');
  
    return id
}

function convertWerknemerDataToJSON(name, uurloon, admin) {
    // make jsonObject
    const jsonObject = {"naam": "","uurloon": 0.0, "role": ""};

    // conver adminrecht to role
    let role = "user"
    if (admin) {role = "admin";}

    // assign values
    jsonObject.naam = String(name);
    jsonObject.uurloon = Number(uurloon);
    jsonObject.role = String(role);

    return jsonObject;
  }

  function checkPassword(password, confirmPassword) {
    // check password
    if (password !== confirmPassword){return false}

    // make jsonObject
    const jsonObject = {"password": ""};
    jsonObject.password = String(password);

    return jsonObject;
  }

  function deleteWerknemerJson(name){
        // make jsonObject
        const jsonObject = {"naam": ""};
        jsonObject.naam = String(name);
    
        return jsonObject;
  }

export {
    getNameFromUrl,
    convertWerknemerDataToJSON,
    checkPassword,
    deleteWerknemerJson
  };