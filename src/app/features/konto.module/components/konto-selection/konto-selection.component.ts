import {Component, OnInit} from '@angular/core';
import {KontoService} from '../konto.service';
import {Observable, pipe} from 'rxjs';
import {Konto} from '../konto';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {flatMap, tap} from 'rxjs/operators';
import {AccountService} from '../../../account.module/account.service';

@Component({
  selector: 'app-konto-selection',
  templateUrl: './konto-selection.component.html',
  styleUrls: ['./konto-selection.component.scss']
})
export class KontoSelectionComponent implements OnInit {
  form: FormControl = this.fb.control(this.kontoService.currentKonto);
  readonly konten$: Observable<Konto[]> = this.accountService.currentUser$.pipe(flatMap(currentUser => this.kontoService.getKonten(currentUser)));

  constructor(private kontoService: KontoService, private fb: FormBuilder, private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      tap((kontoId: string) => this.kontoService.currentKonto = kontoId),
    ).subscribe();
  }
}
