import {Konto} from 'src/app/features/konto.module/model/konto';
import {Transaktionspartner} from 'src/app/features/buchungen.module/model/transaktionspartner';

export class Buchung {
  constructor(
    public id: string,
    public betrag: number,
    public verwendungszweck: string,
    public waehrung: string,
    public buchungstag: Date,
    public konto: Konto,
    public selfPartner: Transaktionspartner,
    public otherPartner: Transaktionspartner,
  ) {
  }
}
