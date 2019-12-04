import {Component} from '@angular/core';

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
export class AppComponent {
  ngOnInit(): void {
    const autobahn: any = require('autobahn');
    const connection: any = new autobahn.Connection({url: 'ws://localhost:9999', realm: 'default'})
    connection.onopen = (session: any): void => {
      function add2(args: any): any {
        return args[0] + args[1];
      }

      session.register('de.danielr1996.add2', add2);
      session.call('de.danielr1996.add2', [2, 3]).then(
         (res) => {
          console.log('Result:', res);
        }
      );
    };
    connection.open();
  }
}
