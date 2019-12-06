import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from 'src/app/features/account.module/services/account.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {filter, mergeMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {
  }

  login$: Subject<void> = new Subject<void>().pipe(
    filter(() => this.form.valid),
    mergeMap(() => {
       const username: string = this.form.get(['username']).value;
       const password: string = this.form.get(['password']).value;
       return this.accountService.signin(username, password);
     }),
    mergeMap(() => this.router.navigate(['/']))
  ) as Subject<any>;

  ngOnInit(): void {
    this.login$.subscribe();
  }
}
