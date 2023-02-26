import { Injectable } from '@angular/core';

const TOKEN = 'd_token';
const USER = 'd_user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  
  constructor() { }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  public saveUser(user): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getUser(): any {
    return JSON.parse(localStorage.getItem(USER));
  }


  static getUserId(): string {
    const user = this.getUser();
    if ( user == null){ return ''; }
    return user.userId;
  }

  static getUserRole(): string {
    const user = this.getUser();
    if ( user == null){ return ''; }
    return user.role;
  }

  static isAdminLoggedIn(): boolean {
   
    const role: string = this.getUserRole();
    return role == '1';
  }

  static isUserLoggedIn(): boolean {
    
    const role: string = this.getUserRole();
    return role == '2';
  }

  
  static hasToken(): boolean {
    if ( this.getToken() === null){
      return false;
    }
    return true;
  }

  static signOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
