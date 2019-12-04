import {Component, OnInit} from '@angular/core';
import {RefreshService} from '../../services/refresh.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.scss']
})
export class RefreshComponent implements OnInit {
  private rpcId: string = uuid.v4();

  constructor(private refreshService: RefreshService) {
  }

  ngOnInit(): void {

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
      console.log(NEED_PT_TANMEDIA)
      console.log(NEED_PT_SECMECH)
      console.log(NEED_PT_TAN)
      session.register(NEED_PT_TAN, getTan);
      session.register(NEED_PT_TANMEDIA, getTanMedia);
      session.register(NEED_PT_SECMECH, getTanMech);
    };
    connection.open();
  }

  refresh(): void {
    this.refreshService.refresh(this.rpcId).subscribe();
  }
}
