import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private accountService: AccountService, private router: Router) {
  }

  public signout() {
    this.accountService.signout();
    this.router.navigate(['/', 'account', 'login']);
  }
}
