export class Konto {
  constructor(
    public id: string,
    public blz: string,
    public kontonummer: string,
    public bankaccount: string,
    public tanmedia: string,
    public secmech: string,
    public password: string,
    public active: boolean,
  ) {
  }
}
