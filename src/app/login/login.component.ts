import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector:'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message = '';
  user: any;
  RequestResetForm: FormGroup;
  forbiddenEmails: any;
  errorMessage: string;
  successMessage: string;
  IsvalidForm = true;
  b='';

  constructor(private apiService: AuthService, private router: Router) {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }
  ngOnInit(): void {
   
    this.RequestResetForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
    });
  }


  RequestResetUser(form) {
    console.log(form)
    if (form.valid) {
      this.IsvalidForm = true;
      this.apiService.requestReset(this.RequestResetForm.value).subscribe(
        data => {
          this.RequestResetForm.reset();
          this.successMessage = "Reset password link send to email sucessfully.";
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['login']);
          }, 3001);
        },
        err => {

          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        }
      );
    } else {
      this.IsvalidForm = false;
    }
  }
  
 
 
  loginBtn(){
    console.warn(this.loginForm.value);
    console.log(this.loginForm.valid);
    if(!this.loginForm.valid){
      this.b="Wrong password or Email !";
    }
    this.message = ''
    if (this.loginForm.valid) {
      this.b="";
      this.apiService.login(this.loginForm.value).subscribe((res: any) => {
        console.log(res);
        if (res.message === 'ok') {
          this.message='ok';
          // redirection
          //console.log(res.token.jwt_decode)
          console.log( jwt_decode(res.token))
          localStorage.setItem('token', res.token);
          //partie ajoutée
          const token = localStorage.getItem('token');
          this.apiService.getu(jwt_decode(token).data._id).subscribe((res: any) => {
            console.log(res);
            this.user = res.data;
          console.log(this.user.role);
          if(this.user.role==='Etudiant'){this.router.navigate(['/home/',this.user._id]);}
          else{this.router.navigate(['/homeprof/',this.user._id]);}
        });
        //fin
        } else {
          this.message = res.message;
        }
      })
    }
  }

}
