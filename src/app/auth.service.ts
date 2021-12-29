import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private _HttpClient:HttpClient , public _Router:Router){

    if(localStorage.getItem("UserToken") !=null)
    {
      this.DecodeUserToken()
    }

  }

    /////////get the token and decode
  token = new BehaviorSubject(null); //User Token
  username:any
  DecodeUserToken()
  {
    let DecodedUser = JSON.stringify(localStorage.getItem("UserToken"))// loclstorage
    this.token.next(jwtDecode(DecodedUser))
    this.username = this.token.value
  }
    ////////////////////////////////////////////////
  register(data:object):Observable<any>
  {
    return this._HttpClient.post(`https://routeegypt.herokuapp.com/signup`,data)
  }

  singin(data:object):Observable<any>
  {
    return this._HttpClient.post(`https://routeegypt.herokuapp.com/signin`,data)
  }

  addnote(data:object):Observable<any>
  {
    return this._HttpClient.post(`https://routeegypt.herokuapp.com/addNote`,data)
  }

  getUserNotes(data:object):Observable<any>
  {
    return this._HttpClient.post(`https://routeegypt.herokuapp.com/getUserNotes`,data)
  }

  upadteNotes(data:object):Observable<any>
  {
    return this._HttpClient.put(`https://routeegypt.herokuapp.com/updateNote`,data)
  }

  deleteNotes(data:object):Observable<any>
  {
    return this._HttpClient.delete(`https://routeegypt.herokuapp.com/deleteNote`,data)
  }

  logout()
  {
    localStorage.removeItem("UserToken");
    this.token.next(null);
    this._Router.navigate([`singin`]);
  }
}
