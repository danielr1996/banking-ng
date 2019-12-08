import {Component, OnInit} from '@angular/core';
import * as uuid from 'uuid';
import {RefreshService} from 'src/app/features/refresh/services/refresh.service';
import {UserQuery} from 'src/app/features/account.module/store/user.store';
import {Observable, of, Subject} from 'rxjs';
import {mergeMap, take, tap} from 'rxjs/operators';

// FIXME
(window as any).global = window;
(window as any).process = window;
(window as any).Buffer = window;
(window as any).process.browser = true;
(window as any).process.version = '';
(window as any).process.versions = {node: false};

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.scss']
})
export class RefreshComponent implements OnInit {
  private rpcId: string = uuid.v4();
  private user$: Observable<string> = this.userQuery.userId$.pipe(take(1));

  constructor(private refreshService: RefreshService, private userQuery: UserQuery) {
  }

  public refresh$: Subject<void> = new Subject<void>().pipe(
    mergeMap(() => this.user$),
    tap((userId) => this.refreshService.refresh$.next({userId, rpcId: this.rpcId})),
  ) as Subject<any>;

  ngOnInit(): void {
    this.refresh$.subscribe();

    // FIXME
    const autobahn: any = require('autobahn');
    const connection: any = new autobahn.Connection({url: 'ws://127.0.0.1:9090/wamp', realm: 'default'});
    connection.onopen = (session: any): void => {
      function getTan(): any {
        const tan: any = prompt('Bitte gebe deine Tan ein');
        return tan;
      }

      function getTanMedia(): any {
        const tan: any = prompt('Bitte gebe dein TanMedium ein');
        return tan;
      }

      function getTanMech(): any {
        const tan: any = prompt('Bitte gebe deinen Sicherheitsmechanismus ein');
        return tan;
      }

      const NEED_PT_TAN: string = `de.danielr1996.NEED_PT_TAN.${this.rpcId}`;
      const NEED_PT_TANMEDIA: string = `de.danielr1996.NEED_PT_TANMEDIA.${this.rpcId}`;
      const NEED_PT_SECMECH: string = `de.danielr1996.NEED_PT_SECMECH.${this.rpcId}`;
      session.register(NEED_PT_TAN, getTan);
      session.register(NEED_PT_TANMEDIA, getTanMedia);
      session.register(NEED_PT_SECMECH, getTanMech);
    };
    connection.open();
  }
}
