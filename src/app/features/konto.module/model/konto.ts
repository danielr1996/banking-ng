export class Konto {
  constructor(
    public id: string,
    public blz: string,
    public bic: string,
    public kontonummer: string,
    public tanmedia: string,
    public secmech: string,
    public password: string,
  ) {
  }
}
