import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


declare var $:any

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {

  constructor(public _AuthService:AuthService ,public _Router:Router  ) { }

  ngOnInit(): void {
    $('.particle').particleground();
  }

  error:string = `` ;

  //<!=========== registerform ======== >//
  RegisterForm :FormGroup = new FormGroup
  ({
    first_name: new FormControl(null , [Validators.required,Validators.minLength(3),Validators.maxLength(8)]),
    last_name: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(8)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    age: new FormControl(null,[Validators.required,Validators.min(20),Validators.max(80)]),
    password: new FormControl(null,[Validators.required,Validators.pattern(`^[A-z][a-z0-9]{8,16}$`)])
  })


    registerFormSubmit(RegisterForm:FormGroup)
    {
      //cheak if it's valid !!
      if(RegisterForm.valid)
      {
        this._AuthService.register(RegisterForm.value).subscribe((response)=>{

          if(response.message == `success`)
          {
            //navigate to sing in
            this._Router.navigate([`singin`])
          }
          else
          {
            //message for the user!
            this.error = response.errors.email.message;
          }
        })
      }

    }

}
