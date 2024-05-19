import { makeEmbed } from "../../context/embed"
import { player } from "../../instances/playerInstance"
import { Command } from "../../structure/Command"

export default new Command({
  name: "resume",
  description: "Resume the current paused LoFi radio.",
  shouldHaveAQueue: true,
  sameVoiceChannel: true,
  voiceConnected: true,
  run: async ({ client, interaction }) => {
    const queue = player.getQueue(interaction.guildId as string)
    const playing: boolean = queue?.playing as boolean
    if (playing)
      return interaction.reply({
        embeds: [
          makeEmbed({
            client: client,
            _message: `The LoFi radio is not paused. If you want to pause the LoFi radio use the command **\`/pause\`**`,
            error: true,
          }),
        ],
      })
    queue?.resume()
    return interaction.reply({
      embeds: [
        makeEmbed({
          client: client,
          _message: `The LoFi radio is now resumed.`,
          success: true,
        }),
      ],
    })
  },
})
