import {Query, Store, StoreConfig} from '@datorama/akita';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Konto} from 'src/app/features/konto.module/model/konto';
import {Buchung} from 'src/app/features/buchungen.module/model/buchung';

export interface BuchungenState {
  buchungen: Buchung[];
}

export function createInitialState(): BuchungenState {
  return {
    buchungen: [],
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({name: 'buchungen'})
export class BuchungenStore extends Store<BuchungenState> {
  constructor() {
    super(createInitialState());
  }
}

@Injectable({
  providedIn: 'root'
})
export class BuchungenQuery extends Query<BuchungenState> {
  buchungen$: Observable<Buchung[]> = this.select('buchungen');

  constructor(protected store: BuchungenStore) {
    super(store);
  }
}
