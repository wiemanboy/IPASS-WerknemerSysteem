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

    getWerknemer(name) {
        const requestOptions = {
            method: 'GET',
            mode: "same-origin",
            headers: {"Authorization": "Bearer " + window.sessionStorage.getItem("JWTtoken")}
          }
          
          return fetch(this.baseUrl + "/" + name, requestOptions)
    }

    getSelf() {
        const requestOptions = {
            method: 'GET',
            mode: "same-origin",
            headers: {"Authorization": "Bearer " + window.sessionStorage.getItem("JWTtoken")}
          }
          
          return fetch(this.baseUrl + "/self", requestOptions)
    }

    createWerknemer(data) {               
        const requestOptions = {
          method: 'POST',
          mode: "same-origin",
          headers: {"Authorization": "Bearer " + window.sessionStorage.getItem("JWTtoken"), 'Content-Type': 'application/json;charset=utf-8',},
          body: JSON.stringify(data),
        };
        
        return fetch(this.baseUrl + "/createwerknemer", requestOptions)
    }

    updateWerknemer(data) {               
        const requestOptions = {
          method: 'PUT',
          mode: "same-origin",
          headers: {"Authorization": "Bearer " + window.sessionStorage.getItem("JWTtoken"), 'Content-Type': 'application/json;charset=utf-8',},
          body: JSON.stringify(data),
        };
        
        return fetch(this.baseUrl + "/updatewerknemer", requestOptions)
    }

    updatePassword(data) {               
        const requestOptions = {
          method: 'PUT',
          mode: "same-origin",
          headers: {"Authorization": "Bearer " + window.sessionStorage.getItem("JWTtoken"), 'Content-Type': 'application/json;charset=utf-8',},
          body: JSON.stringify(data),
        };
        
        return fetch(this.baseUrl + "/updatepassword", requestOptions)
    }

    deleteWerknemer(data) {               
        const requestOptions = {
          method: 'DELETE',
          mode: "same-origin",
          headers: {"Authorization": "Bearer " + window.sessionStorage.getItem("JWTtoken"), 'Content-Type': 'application/json;charset=utf-8',},
          body: JSON.stringify(data),
        };
        
        return fetch(this.baseUrl + "/updatepassword", requestOptions)
    }
  }
