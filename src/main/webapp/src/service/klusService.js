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

        getKlus(id) {
            const requestOptions = {
                method: 'GET',
                mode: "same-origin",
                headers: {"Authorization": "Bearer " + window.sessionStorage.getItem("JWTtoken")}
              }
              
              return fetch(`${this.baseUrl}/klus${id}` , requestOptions)
        }

        createKlus(data) {               
            const requestOptions = {
              method: 'POST',
              mode: "same-origin",
              headers: {"Authorization": "Bearer " + window.sessionStorage.getItem("JWTtoken"), 'Content-Type': 'application/json;charset=utf-8',},
              body: JSON.stringify(data),
            };
            
            return fetch(`${this.baseUrl}/createklus`, requestOptions)
        }

        addWerknemer(id, data) {               
            const requestOptions = {
              method: 'POST',
              mode: "same-origin",
              headers: {"Authorization": "Bearer " + window.sessionStorage.getItem("JWTtoken"), 'Content-Type': 'application/json;charset=utf-8',},
              body: JSON.stringify(data),
            };
            
            return fetch(`${this.baseUrl}/klus${id}/addwerknemer` , requestOptions)
        }

        addMateriaal(id, data) {               
            const requestOptions = {
              method: 'POST',
              mode: "same-origin",
              headers: {"Authorization": "Bearer " + window.sessionStorage.getItem("JWTtoken"), 'Content-Type': 'application/json;charset=utf-8',},
              body: JSON.stringify(data),
            };
            
            return fetch(`${this.baseUrl}/klus${id}/addmateriaal` , requestOptions)
        }

        addUren(id, data) {               
            const requestOptions = {
              method: 'POST',
              mode: "same-origin",
              headers: {"Authorization": "Bearer " + window.sessionStorage.getItem("JWTtoken"), 'Content-Type': 'application/json;charset=utf-8',},
              body: JSON.stringify(data),
            };
            
            return fetch(`${this.baseUrl}/klus${id}/adduren` , requestOptions)
        }
    }
    
