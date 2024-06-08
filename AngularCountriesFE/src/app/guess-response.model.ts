export class GuessResponse {
  constructor(
    public sessionID: string,
    public success: boolean,
    public guessCount: number,
    public name: string,
    public nameResponse: boolean,
    public region: string,
    public regionResponse: boolean,
    public population: number,
    public populationResponse: number,
    public area: number,
    public areaResponse: number,
    public continent: string,
    public continentResponse: boolean
  ) { }
}
