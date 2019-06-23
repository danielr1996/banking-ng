import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-buchungen',
  templateUrl: './buchungen.component.html',
  styleUrls: ['./buchungen.component.scss']
})
export class BuchungenComponent implements OnInit {
  constructor(private apollo: Apollo) {
  }
  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            buchungen{
              verwendungszweck
              betrag
            }
          }
        `,
      })
      .valueChanges.subscribe(result => {
      console.log(result);
    });
  }
}
