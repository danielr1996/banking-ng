import {Buchung} from './model/buchung';

export class BuchungContainer {
  constructor(
    public buchungen: Buchung[],
    public totalPages: number,
    public totalElements: number,
  ) {
  }
}
