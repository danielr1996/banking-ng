import {Query, Store, StoreConfig} from '@datorama/akita';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Saldo} from 'src/app/features/saldo.module/model/saldo';

export interface SaldoState {
  saldi: Saldo[];
  saldo: Saldo;
}

export function createInitialState(): SaldoState {
  return {
    saldi: [],
    saldo: new Saldo()
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({name: 'saldi'})
export class SaldoStore extends Store<SaldoState> {
  constructor() {
    super(createInitialState());
  }
}

@Injectable({
  providedIn: 'root'
})
export class SaldoQuery extends Query<SaldoState> {
  saldi$: Observable<Saldo[]> = this.select('saldi');
  saldo$: Observable<Saldo> = this.select('saldo');

  constructor(protected store: SaldoStore) {
    super(store);
  }
}
