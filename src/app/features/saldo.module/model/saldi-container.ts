import {Saldo} from './saldo';

export class SaldiContainer {
  constructor(
    public saldi: Saldo[],
    public totalPages: number,
    public totalElements: number,
  ) {
  }
}
