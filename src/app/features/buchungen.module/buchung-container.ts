import {Buchung} from './buchung';

export class BuchungContainer {
  constructor(
    public buchungen: Buchung[],
    public totalPages: number,
    public totalElements: number,
  ) {
  }
}
