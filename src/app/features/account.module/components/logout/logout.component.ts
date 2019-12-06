import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserQuery, UserStore} from 'src/app/features/account.module/store/user.store';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private userStore: UserStore, public userQuery: UserQuery, private router: Router) {
  }

  public signout(): void {
    this.userStore.update(state => ({token: null}));
    this.router.navigate(['/', 'account', 'login']);
  }
}
