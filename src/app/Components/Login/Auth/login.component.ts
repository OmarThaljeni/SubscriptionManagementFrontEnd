import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/AuthService/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
  }
  loggerForm(form:any){
    console.log(form);
    
  }
  login(credentials: any) {
    this.loginService.login(credentials).subscribe(
      (response: any) => {
        const token = response;
        const link = ['SubscriptionManagement/home'];
        localStorage.setItem('token', token);
        this.router.navigate(link);
      },
      error => {
        console.log(error);
      }
    );
  }



}
