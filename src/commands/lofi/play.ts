import { Command } from "../../structure/Command"
import { player } from "../../instances/playerInstance"
import { useYouTube } from "../../core/useYoutube"
import * as Constants from "../../constants/index"
import {
  ApplicationCommandOptionType,
  type VoiceBasedChannel,
} from "discord.js"
import { makeEmbed } from "../../context/embed"

export default new Command({
  name: "play",
  description: "Plays some LoFi music for you.",
  alreadyHaveAQueue: true,
  voiceConnected: true,
  sameVoiceChannel: true,
  options: [
    {
      name: "station",
      description: "Select the most suitable station for yourself.",
      type: ApplicationCommandOptionType.String,
      choices: [...Constants.Stations],
    },
  ],
  run: async ({ client, interaction }) => {
    await interaction.deferReply()
    const voiceConnection = interaction.member.voice
      .channel as VoiceBasedChannel
    const station = interaction.options
      .get("station")
      ?.value?.toString() as string
    const id = await useYouTube(`${station} ${Constants.QUERY}`, {
      continuation: Math.random() < 0.5,
    })
    const baseURI = `${Constants.YOUTUBE_BASE_URL}?list=${id}`
    interaction.followUp({
      embeds: [
        makeEmbed({
          client,
          _message: `Playing LoFi music with the station of **${
            station.charAt(0).toUpperCase() + station.slice(1).toLowerCase()
          }**.`,
          success: true,
        }),
      ],
    })
    return await player.play(voiceConnection, baseURI, {
      metadata: {
        interaction,
      },
      member: interaction.member,
    })
  },
})
