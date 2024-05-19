import { makeEmbed } from "../../context/embed"
import { player } from "../../instances/playerInstance"
import { Command } from "../../structure/Command"
import { EmbedBuilder } from "discord.js"
import * as Constants from "../../constants/index"
import { Config } from "../../config/config"

export default new Command({
  name: "current",
  description: "Shows the information about the current playing LoFi song.",
  shouldHaveAQueue: true,
  sameVoiceChannel: true,
  voiceConnected: true,
  run: async ({ client, interaction }) => {
    const queue = player.getQueue(interaction.guildId as string)
    const current = queue?.songs[0]
    const embed = new EmbedBuilder()
      .setAuthor({
        name: client.user?.displayName as string,
        iconURL: client.user?.displayAvatarURL(),
        url: client.user?.displayAvatarURL(),
      })
      .setDescription(
        `${Config.emojis?.disc}・[${current?.name}](${current?.url})`
      )
      .setThumbnail(current?.thumbnail as string)
      .setFooter({
        text: `Requested by ${current?.member?.displayName}`,
        iconURL: current?.user?.displayAvatarURL(),
      })
      .setTimestamp()
      .setColor(Config.colors?.initial as any)

    return interaction.reply({ embeds: [embed] })
  },
})
