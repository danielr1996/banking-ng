import {Component, OnInit} from '@angular/core';

(window as any).global = window;
(window as any).process = window;
(window as any).Buffer = window;
(window as any).process.browser = true;
(window as any).process.version = '';
(window as any).process.versions = {node: false};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    // const tanDialog: any = document.getElementById('tanDialog');
    // const btnSubmit: any = document.getElementById('btnSubmit');
    // btnSubmit.addEventListener('click', () => tanDialog.close('return value'))
    const autobahn: any = require('autobahn');
    const connection: any = new autobahn.Connection({url: 'ws://127.0.0.1:9090/wamp', realm: 'default'});


    connection.onopen = (session: any): void => {
      function add2(args: any): any {
        // tanDialog.showModal();
        // console.log(tanDialog.returnValue);
        const tan: any = prompt('Bitte gebe deinen Pin Ein');
        console.log(tan);
        return tan;
      }

      session.register('de.danielr1996.add2', add2);
    };
    connection.open();
  }
}
