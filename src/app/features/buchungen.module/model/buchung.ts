import {Transaktionspartner} from './transaktionspartner';
import {Konto} from 'src/app/features/konto.module/components/konto';

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
