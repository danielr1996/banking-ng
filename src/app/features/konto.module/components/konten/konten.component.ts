import {Component, OnInit} from '@angular/core';
import {KontoQuery} from 'src/app/features/konto.module/store/konto.store';
import {Observable, Subject} from 'rxjs';
import {Konto} from 'src/app/features/konto.module/model/konto';
import {KontoService} from 'src/app/features/konto.module/services/konto.service';
import {UserQuery} from 'src/app/features/account.module/store/user.store';
import {mergeMap} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-konten',
  templateUrl: './konten.component.html',
  styleUrls: ['./konten.component.scss']
})
export class KontenComponent {
  // public konten$: Observable<Konto[]> = this.kontoQuery.konten$;
  public konten$: Observable<Konto[]> = this.userQuery.userId$.pipe(mergeMap(userId => this.kontoService.getKonten(userId)));
  public create$: Subject<void> = new Subject<void>().pipe(
    // this.kontoService.createKonto()
  ) as Subject<any>;
  public form: FormGroup = this.fb.group({
    blz: this.fb.control([null]),
    kontonummer: this.fb.control([null]),
  });

  constructor(private fb: FormBuilder, private kontoQuery: KontoQuery, private userQuery: UserQuery, private kontoService: KontoService) {
  }
}
