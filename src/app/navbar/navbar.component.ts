import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { ServiceService } from '../Service/service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  disabled: boolean = false;
  sidebarVisible: boolean = false;

  ngOnInit(): void {
    this.traerdatos();
  }

  traerdatos() {}

  login() {}

  logOut() {
    window.location.reload();
  }
}
