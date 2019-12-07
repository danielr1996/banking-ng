import {Component, OnInit} from '@angular/core';
import {KontoService} from 'src/app/features/konto.module/services/konto.service';
import {combineLatest, Observable} from 'rxjs';
import {FormBuilder, FormControl} from '@angular/forms';
import {distinctUntilChanged, flatMap, map, tap} from 'rxjs/operators';
import {_} from 'underscore';
import {Konto} from 'src/app/features/konto.module/model/konto';
import {AccountService} from 'src/app/features/account.module/services/account.service';
import {UserQuery} from 'src/app/features/account.module/store/user.store';
import {KontoQuery, KontoStore} from 'src/app/features/konto.module/store/konto.store';

@Component({
  selector: 'app-konto-selection-inner',
  templateUrl: './konto-selection-component.component.html',
  styleUrls: ['./konto-selection-component.component.scss']
})
export class InnerKontoSelectionComponent implements OnInit {
  readonly form: FormControl = this.fb.control([null]);
  readonly isLoggedIn$: Observable<boolean> = this.userQuery.isLoggedIn$;
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

@Component({
  selector: 'app-konto-selection',
  template: '<app-konto-selection-inner *ngIf="isLoggedIn$ | async"></app-konto-selection-inner>',
})
export class OuterKontoSelectionComponent {
  readonly isLoggedIn$: Observable<boolean> = this.userQuery.isLoggedIn$;

  constructor(
    private userQuery: UserQuery,
  ) {
  }
}
