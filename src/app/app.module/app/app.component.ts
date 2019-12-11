import {Component} from '@angular/core';
import {UserQuery} from 'src/app/features/account.module/store/user.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public userQuery: UserQuery) {
  }
}
