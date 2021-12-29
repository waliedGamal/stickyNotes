import { SingupGuard } from './singup.guard';
import { NavGuard } from './nav.guard';
import { AuthGuard } from './auth.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { SinginComponent } from './singin/singin.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingupComponent } from './singup/singup.component';

const routes: Routes = [
  {path:``,redirectTo:`singin`,pathMatch:"full"},
  {path:`home`,canActivate:[AuthGuard ],component:HomeComponent},
  {path:`singin`,canActivate:[NavGuard],component:SinginComponent},
  {path:'singup',canActivate:[SingupGuard],component:SingupComponent},
  {path:`**`,component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:true}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
