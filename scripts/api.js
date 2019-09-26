export default class Api {
    constructor(info) {
      this.baseUrl = info.baseUrl;
      this.headers = info.headers;
    }
  
    checkResultJson(result) {
      if(result.ok) {
        return result.json();
      }
      return Promise.reject(result.status);
    }
  
    getUserInfo() {
      return fetch(`${this.baseUrl}/users/me`, {method: "GET", headers: this.headers})
      .then((result) => this.checkResultJson(result));
    }
  
    getInitialCards() {
      return fetch(`${this.baseUrl}/cards`, {method: "GET", headers: this.headers})
      .then((result) => this.checkResultJson(result))
    }
  
    addUserInfo(editName, editJob) {
      return fetch(`${this.baseUrl}/users/me`, {method: "PATCH", headers: this.headers, body: JSON.stringify({
        name: `${editName}`,
        about: `${editJob}`
      })
    })
      .then((result) => this.checkResultJson(result))
    }
  }