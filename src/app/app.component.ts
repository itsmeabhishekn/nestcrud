import { Component } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reactiveForms';
  loginForm = new FormGroup({
    user: new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required,Validators.minLength(5)]),
  }
  )

  LoginUser(){
    console.warn(this.loginForm.value);
  }

get user()
{
  return this.loginForm.get('user');
}

get password()
{
  return this.loginForm.get('password');
}


}
