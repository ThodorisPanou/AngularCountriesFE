export class StartGameSettings {

  public accessToken: string;
  public Difficulty: string;

  constructor(Difficulty: string, SessionID: string)
  {
    this.Difficulty = Difficulty;
    this.accessToken = SessionID;
  }
}
