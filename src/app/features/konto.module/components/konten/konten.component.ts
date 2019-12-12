import {Component, OnInit} from '@angular/core';
import {KontoQuery, KontoStore} from 'src/app/features/konto.module/store/konto.store';
import {Observable, Subject} from 'rxjs';
import {Konto} from 'src/app/features/konto.module/model/konto';
import {UserQuery} from 'src/app/features/account.module/store/user.store';
import {mergeMap, tap} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-konten',
  templateUrl: './konten.component.html',
  styleUrls: ['./konten.component.scss']
})
export class KontenComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    blz: this.fb.control([null]),
    kontonummer: this.fb.control([null]),
    password: this.fb.control([null]),
    bankaccount: this.fb.control([null]),
    tanmedia: this.fb.control([null]),
    secmech: this.fb.control([null]),
  });
  public konten$: Observable<Konto[]> = this.kontoQuery.konten$;

  public create$$: Subject<void> = new Subject<void>().pipe(
    mergeMap(() => this.kontoStore.add(this.form.value)),
  ) as Subject<any>;

  public delete$$: Subject<string> = new Subject<string>().pipe(
    mergeMap((kontoId) => this.kontoStore.delete(kontoId)),
  ) as Subject<any>;

  constructor(private fb: FormBuilder, private kontoQuery: KontoQuery, private userQuery: UserQuery, private kontoStore: KontoStore) {
  }

  ngOnInit(): void {
    this.create$$.subscribe();
    this.delete$$.subscribe();
  }
}
