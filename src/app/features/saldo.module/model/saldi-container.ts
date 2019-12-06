import {Saldo} from 'src/app/features/saldo.module/model/saldo';

export class SaldiContainer {
  constructor(
    public saldi: Saldo[],
    public totalPages: number,
    public totalElements: number,
  ) {
  }
}
