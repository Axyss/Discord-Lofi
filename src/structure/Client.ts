import {
  Client as AppClient,
  ApplicationCommandDataResolvable,
  ClientEvents,
  Collection,
} from "discord.js"
import glob from "glob"
import { promisify } from "util"
import { ClientIntents } from "../constants/index"
import type { Event } from "./Events"
import type { CommandType } from "../interfaces/typings/Command"
import type { RegisterCommandsOptions } from "../interfaces/typings/Client"
import { Logger } from "../utils/Logger"
import mongoose from "mongoose"

import chalk from "chalk"

const globPromise = promisify(glob)

export default class Client extends AppClient {
  public logger = new Logger({ prefix: "CLIENT" })
  commands: Collection<string, CommandType> = new Collection()
  constructor() {
    super({ ...ClientIntents })
  }
  async importFile(filePath: string) {
    return (await import(filePath))?.default
  }

  async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
    if (guildId) {
      this.guilds.cache.get(guildId)?.commands.set(commands)
      this.logger.info(chalk.cyan.bold(`Registering commands to ${guildId}`))
      this.logger.success(
        chalk.green(
          `✅ Successfully registered / commands for the guild: ${chalk.gray(
            this.guilds.cache.get(guildId)?.name
          )}`
        )
      )
    } else {
      this.application?.commands.set(commands)
      this.logger.info(chalk.cyan.bold("Registering global commands"))
      this.logger.success(`✅ Successfully registered / commands globally`)
    }
  }

  setupPlayer() {
    require("../player/index")
  }

  init() {
    this.logger.info(chalk.cyan.bold("Registering Modules"))
    this.registerModules()
    this.connectDatabase()
    this.login(process.env.token).then(() => {
      this.logger.success(
        `Logged in as ${chalk.reset.white.bold(
          this.user!.username
        )}${chalk.reset.gray("#")}${chalk.reset.gray.bold(
          this.user!.discriminator
        )}!`
      )
    })
  }
  async connectDatabase() {
    if (!process.env.connectionURI)
      return this.logger.error({
        message: "No Mongoose uri specified.",
        name: "MongoDB not connected.",
      })
    try {
      await mongoose.connect(process.env.connectionURI as string)
      return this.logger.success(`✅ Successfully connected MongoDB`)
    } catch (e) {
      this.logger.error({
        message: "No Mongoose uri specified.",
        name: "MongoDB not connected.",
      })
    }
  }
  async registerModules() {
    const slashCommands: ApplicationCommandDataResolvable[] = []
    const commandFiles = await globPromise(
      `${__dirname}/../commands/*/*{.ts,.js}`
    )
    commandFiles.forEach(async (filePath) => {
      const command: CommandType = await this.importFile(filePath)
      if (!command.name) return
      this.commands.set(command.name, command)
      slashCommands.push(command)
    })

    this.on("ready", () => {
      this.registerCommands({
        commands: slashCommands,
        guildId: process.env.guildId,
      })
    })

    const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`)
    eventFiles.forEach(async (filePath) => {
      const event: Event<keyof ClientEvents> = await this.importFile(filePath)
      this.on(event.event, event.run)
    })
  }
}
