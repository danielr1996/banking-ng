import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import {UserQuery, UserStore} from '../../store/user.store';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private userStore: UserStore, private userQuery: UserQuery, private router: Router) {
  }

  public signout(): void {
    this.userStore.update(state => ({token: null}));
    this.router.navigate(['/', 'account', 'login']);
  }
}
