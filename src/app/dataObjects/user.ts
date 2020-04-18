export class User {
    hasTodos: boolean;
    constructor(public name: string, public id: number, public email: string,
                public street: string, public city: string, public zipCode: string) {}
    isMatchToSearch(searchText: string) {
      if (this.email.includes(searchText)) {
        return true;
      }
      if (this.name.includes(searchText)) {
        return true;
      }
      return false;
    }
  }
