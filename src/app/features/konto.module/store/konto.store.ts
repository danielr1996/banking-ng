import {Query, Store, StoreConfig} from '@datorama/akita';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

export interface KontoState {
  kontos: string[];
}

export function createInitialState(): KontoState {
  return {
    kontos: [],
    ...JSON.parse(localStorage.getItem('state.konto'))
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({name: 'konto'})
export class KontoStore extends Store<KontoState> {
  constructor() {
    super(createInitialState());
  }

  akitaPreUpdate(_: Readonly<KontoState>, nextState: Readonly<KontoState>): KontoState {
    localStorage.setItem('state.konto', JSON.stringify(nextState));
    return nextState;
  }
}

@Injectable({
  providedIn: 'root'
})
export class KontoQuery extends Query<KontoState> {
  kontos$: Observable<string[]> = this.select('kontos');

  constructor(protected store: KontoStore) {
    super(store);
  }
}
