import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';

declare var $:any
@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss']
})
export class SinginComponent implements OnInit {

  constructor(public AuthService:AuthService , public _Router:Router) { }


  ngOnInit(): void {
    $('.particle').particleground();
  }
  error:string = ``
  UserToken:string =``
  singinForm:FormGroup = new FormGroup(
    {
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.required,Validators.pattern(`^[A-z][a-z0-9]{8,16}$`)])
    })

    singinFormSubmit(singinForm:FormGroup)
    {
      if(singinForm.valid)
      {
        this.AuthService.singin(singinForm.value).subscribe((response)=>{
          if(response.message == `success`)
        {

          //save the User Token
          this.UserToken = response.token
          localStorage.setItem("UserToken",this.UserToken)
          //calling the Decode Method
          this.AuthService.DecodeUserToken()

          //navigate to Home
          this._Router.navigate(['home'])
        }
        else
        {
          //message for the user!
          this.error = response.message;
        }
      })
      }


    }

}
