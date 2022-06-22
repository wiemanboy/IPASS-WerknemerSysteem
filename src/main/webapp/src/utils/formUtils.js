function getIdFromUrl() {
    let id;
  
    // get parameters from url
    const urlParams = new URL(document.location).searchParams;
  
    // set id
    id = urlParams.get('id');
  
    return id
}

export {
    getIdFromUrl,
  };