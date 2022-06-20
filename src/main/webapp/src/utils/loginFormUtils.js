function convertFormDataToJSON(formdata) {
    const jsonObject = {};
    // eslint-disable-next-line no-return-assign
    formdata.forEach((value, key) => jsonObject[key] = value);
    // assign values

    jsonObject.name = String(formdata.get("name"));
    jsonObject.password = String(jsonObject.password);
  
    return jsonObject;
  }

  export {
    convertFormDataToJSON,
  };