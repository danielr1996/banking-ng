import {Component, OnInit} from '@angular/core';
import {KontoQuery} from 'src/app/features/konto.module/store/konto.store';
import {Observable, Subject} from 'rxjs';
import {Konto} from 'src/app/features/konto.module/model/konto';
import {KontoService} from 'src/app/features/konto.module/services/konto.service';
import {UserQuery} from 'src/app/features/account.module/store/user.store';
import {mergeMap, tap} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {v4 as uuid} from 'uuid';

@Component({
  selector: 'app-konten',
  templateUrl: './konten.component.html',
  styleUrls: ['./konten.component.scss']
})
export class KontenComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    blz: this.fb.control([null]),
    kontonummer: this.fb.control([null]),
    password: this.fb.control([null])
  });
  public konten$: Observable<Konto[]> = this.kontoQuery.konten$;

  public create$: Subject<void> = new Subject<void>().pipe(
    mergeMap(userId => this.kontoService.createKonto(this.form.value)),
  ) as Subject<any>;


  constructor(private fb: FormBuilder, private kontoQuery: KontoQuery, private userQuery: UserQuery, private kontoService: KontoService) {
  }

  ngOnInit(): void {
    this.create$.subscribe();
  }
}
