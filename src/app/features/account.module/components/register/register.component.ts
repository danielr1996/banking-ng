import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from 'src/app/features/account.module/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(private fb: FormBuilder, private accountService: AccountService) {
  }

  ngOnInit(): void {
  }

  register(): void {
    if (this.form.valid) {
      const username: string = this.form.get(['username']).value;
      const password: string = this.form.get(['password']).value;
      this.accountService.register(username, password).subscribe(console.log);
    }
  }
}
