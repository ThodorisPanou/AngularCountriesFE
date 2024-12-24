export class GuessRequest {
  constructor(
    public SessionID: string | null,
    public Guess: string,
    public GuessCount: number
  ) { }
}
