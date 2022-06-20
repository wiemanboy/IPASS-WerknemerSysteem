export default class AuthenticationService {
    constructor() {
        this.baseUrl = "https://ipass-werknemersysteem-jarno.herokuapp.com/restservices/authenticate"
    }

    login(data) {
        return fetch(`${this.base_url}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.status);
            }
            console.log(response);
            return response;
          });
        }
}