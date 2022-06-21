export default class KlusService {
    constructor() {
        this.baseUrl = "https://ipass-werknemersysteem-jarno.herokuapp.com/restservices/klussen"
    }

        getKlussen() {           
            const requestOptions = {
              method: 'GET',
              mode: "same-origin",
              headers: {"Authorization": "Bearer " + window.sessionStorage.getItem("JWTtoken")}
            }
            
            return fetch(this.baseUrl, requestOptions)
        }
    }
