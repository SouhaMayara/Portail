import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message = '';
  constructor(private apiService: AuthService, private router: Router) {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }
  ngOnInit(): void {
  }

  loginBtn(){
    console.warn(this.loginForm.value);
    console.log(this.loginForm.valid);
    
    this.message = ''
    if (this.loginForm.valid) {
      this.apiService.login(this.loginForm.value).subscribe((res: any) => {
        console.log(res);
        if (res.message === 'ok') {
          // redirection
          //console.log(res.token.jwt_decode)
          console.log( jwt_decode(res.token))
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);

        } else {
          this.message = res.message;
        }
      })
    }
  }

}
