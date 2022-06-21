export default class KlusService {
    constructor() {
        this.baseUrl = "https://ipass-werknemersysteem-jarno.herokuapp.com/restservices/klussen"
    }

        getKlussen(data) {           
            const requestOptions = {
              method: 'GET',
              mode: "same-origin",
              headers: {"Authorization": "Bearer " + window.sessionStorage.getItem("JWTtoken")}
            }
            
            return fetch("https://ipass-werknemersysteem-jarno.herokuapp.com/restservices/klussen", requestOptions)
              .then(response => {if (response.ok) {return response.json();} else throw "error"})
              .then(result => console.log(result))
        }
    }
