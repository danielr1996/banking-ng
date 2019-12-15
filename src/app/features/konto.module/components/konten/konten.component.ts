import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {KontoQuery, KontoStore} from 'src/app/features/konto.module/store/konto.store';
import {Observable, Subject} from 'rxjs';
import {Konto} from 'src/app/features/konto.module/model/konto';
import {UserQuery} from 'src/app/features/account.module/store/user.store';
import {filter, map, mergeMap, startWith, tap} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {recommended} from 'src/app/app.module/validators/recommended.validator';
import {required} from 'src/app/app.module/validators/required.validator';
import {FormUtils} from 'src/app/app.module/validators/form.util';

@Component({
  selector: 'app-konten',
  templateUrl: './konten.component.html',
  styleUrls: ['./konten.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KontenComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    blz: this.fb.control(null, [required()]),
    bankaccount: this.fb.control(null, [required()]),
    kontonummer: this.fb.control(null, [required()]),
    password: this.fb.control(null, [required()]),
    tanmedia: this.fb.control(null, [recommended()]),
    secmech: this.fb.control(null, [recommended()]),
  });

  public konten$: Observable<Konto[]> = this.kontoQuery.konten$;

  public create$$: Subject<void> = new Subject<void>().pipe(
    tap(() => this.form.markAllAsTouched()),
    filter(() => !FormUtils.formGroupHasValidation(this.form, 'error')),
    mergeMap(() => this.kontoStore.add(this.form.value)),
    tap(() => this.form.reset()),
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

  public formControlHasValidation(formControlPath: string[], validation: string): Observable<boolean> {
    return this.form.get(formControlPath).touched && this.form.get(formControlPath).valueChanges.pipe(
      startWith(''),
      map(() => FormUtils.formControlhasValidation(this.form.get(formControlPath) as FormControl, validation)));
  }
}
