import {Transaktionspartner} from './transaktionspartner';

export class Buchung {
  constructor(
    public id: string,
    public betrag: number,
    public verwendungszweck: string,
    public waehrung: string,
    public buchungstag: Date,
    public selfPartner: Transaktionspartner,
    public otherPartner: Transaktionspartner,
  ) {
  }
}
