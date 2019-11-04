import {Query, Store, StoreConfig} from '@datorama/akita';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

interface UserState {
  token: string;
}

function createInitialState(): UserState {
  return {
    token: '',
    ...JSON.parse(localStorage.getItem('state.user'))
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({name: 'user'})
export class UserStore extends Store<UserState> {
  constructor() {
    super(createInitialState());
  }

  akitaPreUpdate(_: Readonly<UserState>, nextState: Readonly<UserState>): UserState {
    localStorage.setItem('state.user', JSON.stringify(nextState));
    return nextState;
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserQuery extends Query<UserState> {
  isLoggedIn$: Observable<boolean> = this.select(state => !!state.token);
  userId$: Observable<string> = this.select(({token}) => this.parseJwt(token).sub);

  constructor(protected store: UserStore) {
    super(store);
  }

  private parseJwt(token: string): { sub: string } {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return {sub: null};
    }
  }
}
