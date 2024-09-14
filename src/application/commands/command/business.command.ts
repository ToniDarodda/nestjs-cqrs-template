export class CreateBusinessCommand {
  constructor(
    readonly name: string,
    readonly email: string,
  ) {}
}
