export default class AuthenticationService {
    constructor() {
        this.baseUrl = "https://ipass-werknemersysteem-jarno.herokuapp.com/restservices/authenticate"
    }

    login(data) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "name": "admin",
          "password": "ADD-"
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        return fetch("https://ipass-werknemersysteem-jarno.herokuapp.com/restservices/authenticate", requestOptions)
          .then(response => response.text())
          .then(result => window.sessionStorage.setItem("myJWT", result.JWT))
          .catch(error => console.log('error', error));
    }
}