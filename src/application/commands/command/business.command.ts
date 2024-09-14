export class CreateBusinessCommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
  ) {}
}
