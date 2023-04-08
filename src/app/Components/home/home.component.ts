import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/AuthService/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public sidebarShow: boolean = true;
  isCollapsed = true;

  constructor(private loginService : LoginService, private router: Router) { }

  ngOnInit(): void {
  }

logout() {
  this.loginService.logout();
  const link = ['SubscriptionManagement/login'];
  this.router.navigate(link)

}

}
