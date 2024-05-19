import { makeEmbed } from "../../context/embed"
import { player } from "../../instances/playerInstance"
import { Command } from "../../structure/Command"
import { getVoiceConnection, joinVoiceChannel } from "@discordjs/voice"
export default new Command({
  name: "connect",
  description: "Connects to your voice channel.",
  sameVoiceChannel: true,
  voiceConnected: true,
  run: async ({ client, interaction }) => {
    const connection = getVoiceConnection(interaction.guildId as string)
    if (connection)
      return interaction.reply({
        embeds: [
          makeEmbed({
            client: client,
            _message: `The bot is already in your voice channel. If you want the bot to leave your voice channel, use the command \`/disconnect\``,
            error: true,
          }),
        ],
        ephemeral: true,
      })
    joinVoiceChannel({
      adapterCreator: interaction.guild?.voiceAdapterCreator!,
      channelId: interaction.member.voice.channelId as string,
      guildId: interaction.guildId as string,
      selfDeaf: true,
    })
    return interaction.reply({
      embeds: [
        makeEmbed({
          client: client,
          _message: `Connected to ${interaction.member.voice.channel}`,
          success: true,
        }),
      ],
      ephemeral: true,
    })
  },
})
