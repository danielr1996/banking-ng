import {Buchung} from 'src/app/features/buchungen.module/model/buchung';

export class BuchungContainer {
  constructor(
    public buchungen: Buchung[],
    public totalPages: number,
    public totalElements: number,
  ) {
  }
}
