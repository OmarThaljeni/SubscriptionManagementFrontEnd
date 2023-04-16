import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/AuthService/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private loginService: LoginService, private router: Router, private formBuilder: FormBuilder) {}
  
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);

  ngOnInit(): void {    
  }

  loginForm = this.formBuilder.group(
    {
      email : this.email,
      password: this.password,
    }
  );

  login(credentials: any) {
    this.loginService.login(credentials).subscribe(
      (response: any) => {
        const token = response.token;
        const user_id = response.id;
        const id_roles = response.roles[0].id;
        const link = ['SubscriptionManagement/cni-presentation'];
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', user_id);
        localStorage.setItem('id_roles', id_roles);
        this.router.navigate(link);
      },
      error => {
        console.log(error);
      }
    );
  }







}
