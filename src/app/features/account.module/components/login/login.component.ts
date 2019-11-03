import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from 'src/app/features/account.module/account.service';
import {Router} from "@angular/router";

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

  ngOnInit(): void {
  }

  login(): void {
    if (this.form.valid) {
      const username: string = this.form.get(['username']).value;
      const password: string = this.form.get(['password']).value;
      this.accountService.signin(username, password).subscribe(() => this.router.navigate(['/']));
    }
  }
}
