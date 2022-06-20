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
          .then(response => {if (response.ok) {return response.json()} else return "wrong username or password"})
          .then(result => window.sessionStorage.setItem("JWTtoken", result.JWT))
          .catch(error => console.log('error', error));
    }
}