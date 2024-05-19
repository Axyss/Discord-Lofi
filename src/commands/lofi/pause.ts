import { makeEmbed } from "../../context/embed"
import { player } from "../../instances/playerInstance"
import { Command } from "../../structure/Command"

export default new Command({
  name: "pause",
  description: "Pause the current playing LoFi radio.",
  shouldHaveAQueue: true,
  sameVoiceChannel: true,
  voiceConnected: true,
  run: async ({ client, interaction }) => {
    const queue = player.getQueue(interaction.guildId as string)
    const paused: boolean = queue?.paused as boolean
    if (paused)
      return interaction.reply({
        embeds: [
          makeEmbed({
            client: client,
            _message: `The LoFi radio is already paused. If you want to resume the LoFi radio use the command **\`/resume\`**`,
            error: true,
          }),
        ],
      })
    queue?.pause()
    return interaction.reply({
      embeds: [
        makeEmbed({
          client: client,
          _message: `The LoFi radio is now paused.`,
          success: true,
        }),
      ],
    })
  },
})
