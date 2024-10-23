import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Login, ResLogin } from '../interfaces/login';
import { Register } from '../interfaces/register';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataAuthService {

  constructor() { }

  usuario:Usuario | undefined;

  async login(loginData:Login){

    const res = await fetch(environment.API_URL+'login',{
      method: 'POST',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(loginData)
    })
    if(res.status !== 200) return;
    const resJson:ResLogin = await res.json();
    if(!resJson.token) return;
    localStorage.setItem("authToken",resJson.token);
    this.usuario = {
      username: loginData.username,
      token: resJson.token,
      esAdmin: true
    }
    return resJson;
    
  }

  async register(registerData: Register) {
    const res = await fetch(environment.API_URL+'register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerData)
    });

    if (res.status !== 201) return;
    return res;
  }
}
