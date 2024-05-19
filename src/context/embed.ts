import { Client, ColorResolvable, EmbedBuilder } from "discord.js"
import { Config } from "../config/config"
interface Options {
  client?: Client
  _message?: string
  error?: boolean
  success?: boolean
  info?: boolean
}

export function makeEmbed(options: Options) {
  return new EmbedBuilder()
    .setColor(
      options.success
        ? (Config.colors?.success as ColorResolvable)
        : options.info
        ? (Config.colors?.info as ColorResolvable)
        : (Config.colors?.error as ColorResolvable)
    )
    .setDescription(
      `${
        options.success
          ? Config.emojis?.success
          : options.info
          ? Config.emojis?.info
          : Config.emojis?.error
      }・${options._message}`
    )
    .setTimestamp()
    .setAuthor({
      name: options?.client?.user?.displayName!,
      iconURL: options?.client?.user?.displayAvatarURL(),
      url: options?.client?.user?.displayAvatarURL(),
    })
}
