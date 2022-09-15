import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BatchComponent } from './batch/batch.component';
import { CardComponent } from './card/card.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LoginComponent } from './login/login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { SignupComponent } from './signup/signup.component';
import { EmailComponent } from './verification/email/email.component';
import { PasswordComponent } from './verification/password/password.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:"home", component:BatchComponent},
  {path:"profile/:batch", component:CardComponent},
  {path:"login", component:LoginComponent},
  {path:"signup", component:SignupComponent},
  {path:"profile/view/:id", component:ViewProfileComponent},
  {path:"edit-profile", component:EditProfileComponent},
  {path:'verification-email', component:EmailComponent},
  {path:'verification-password', component:PasswordComponent},
  {path:'reset-password', component:PasswordResetComponent},
  {path:'admin', component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
