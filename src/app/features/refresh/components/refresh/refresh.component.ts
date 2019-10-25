import {Component, OnInit} from '@angular/core';
import {RefreshService} from '../../services/refresh.service';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.scss']
})
export class RefreshComponent implements OnInit {

  constructor(private refreshService: RefreshService) {
  }

  ngOnInit(): void {
  }

  refresh(): void {
    this.refreshService.refresh().subscribe();
  }
}
