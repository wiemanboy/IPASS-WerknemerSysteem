export default class AuthenticationService {
    constructor() {
        this.baseUrl = "https://ipass-werknemersysteem-jarno.herokuapp.com/restservices/authenticate"
    }

    login(data) {               
        const requestOptions = {
          method: 'POST',
          mode: "same-origin",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(data),
          redirect: 'follow'
        };
        
        return fetch("https://ipass-werknemersysteem-jarno.herokuapp.com/restservices/authenticate", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
    }
}