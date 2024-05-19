import { makeEmbed } from "../../context/embed"
import { player } from "../../instances/playerInstance"
import { Command } from "../../structure/Command"
import { getVoiceConnection } from "@discordjs/voice"
export default new Command({
  name: "disconnect",
  description: "Disconnects from your voice channel.",
  sameVoiceChannel: true,
  voiceConnected: true,
  run: async ({ client, interaction }) => {
    const connection = getVoiceConnection(interaction.guildId as string)
    if (!connection)
      return interaction.reply({
        embeds: [
          makeEmbed({
            client: client,
            _message: `The bot is not in your voice channel. If you want the bot to join your voice channel, use the command \`/connect\``,
            error: true,
          }),
        ],
        ephemeral: true,
      })
    connection.destroy()
    return interaction.reply({
      embeds: [
        makeEmbed({
          client: client,
          _message: `Disconnected from ${interaction.member.voice.channel}`,
          success: true,
        }),
      ],
      ephemeral: true,
    })
  },
})
