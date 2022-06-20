export default class AuthenticationService {
    constructor() {
        this.baseUrl = "https://ipass-werknemersysteem-jarno.herokuapp.com/restservices/authenticate"
    }

    login(data) {
        console.log(data);
        return fetch(this.baseUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.status);
            }
          })
          .then((json) => {
            window.sessionStorage.setItem("JWTtoken", json.JWT);
            console.log(json);
        });
        }
}