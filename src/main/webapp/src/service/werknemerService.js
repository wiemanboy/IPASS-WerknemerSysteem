export default class WerknemerService {
    constructor() {
        this.baseUrl = "https://ipass-werknemersysteem-jarno.herokuapp.com/restservices/werknemers"
    }

    getWerknemers() {           
        const requestOptions = {
          method: 'GET',
          mode: "same-origin",
          headers: {"Authorization": "Bearer " + window.sessionStorage.getItem("JWTtoken")}
        }
        
        return fetch(this.baseUrl, requestOptions)
    }
}