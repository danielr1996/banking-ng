import {Component, OnInit} from '@angular/core';
import {KontoService} from '../konto.service';
import {combineLatest, iif, Observable, of, pipe} from 'rxjs';
import {Konto} from '../konto';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {distinctUntilChanged, flatMap, map, tap} from 'rxjs/operators';
import {AccountService} from '../../../account.module/services/account.service';
import {UserQuery, UserStore} from '../../../account.module/store/user.store';
import {KontoQuery, KontoStore} from '../../store/konto.store';
import {_} from 'underscore';

@Component({
  selector: 'app-konto-selection',
  templateUrl: './konto-selection.component.html',
  styleUrls: ['./konto-selection.component.scss']
})
export class KontoSelectionComponent implements OnInit {
  form: FormControl = this.fb.control([null]);
  readonly konten$: Observable<Konto[]> = this.userQuery.userId$.pipe(
    flatMap(currentUser => this.kontoService.getKonten(currentUser)),
  );

  constructor(
    private kontoService: KontoService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private userQuery: UserQuery,
    private kontoStore: KontoStore,
    private kontoQuery: KontoQuery) {
  }

  ngOnInit(): void {
    combineLatest(this.kontoQuery.kontos$, this.konten$).pipe(
      distinctUntilChanged(),
      tap(([selectedKontos, availableKontos]) => {
        console.log();
        let newSelection: string[];
        if (_.intersection(selectedKontos, availableKontos.map(konto => konto.id)).length === 0) {
          newSelection = availableKontos.map(konto => konto.id);
        } else {
          newSelection = selectedKontos;
        }
        this.form.setValue(JSON.stringify(newSelection));
      }),
    ).subscribe();

    this.form.valueChanges.pipe(
      distinctUntilChanged(),
      map(kontoId => JSON.parse(kontoId)),
      tap((kontos: string[]) => this.kontoStore.update(state => ({kontos}))),
    ).subscribe();
  }
}
