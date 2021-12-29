import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public _AuthService:AuthService , public _Router:Router) { }
  islogin : boolean= false

  username:any

  ngOnInit(): void {

    this._AuthService.token.subscribe(()=>{
      if(this._AuthService.token.getValue() != null)
      {
        this.islogin = false
      }
      else
      {
        this.islogin = true
      }
    })
    
  this.username = this._AuthService.username
    this._AuthService.DecodeUserToken()

  }
  logout()
  {
    this._AuthService.logout()
  }

}
