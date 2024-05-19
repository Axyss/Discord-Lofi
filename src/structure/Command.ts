import { CommandType } from "../interfaces/typings/Command"

export class Command {
  constructor(commandOptions: CommandType) {
    Object.assign(this, commandOptions)
  }
}
