import { Command } from "../../structure/Command"
import { player } from "../../instances/playerInstance"
import { makeEmbed } from "../../context/embed"

export default new Command({
  name: "destroy",
  description: "Destroys the current LoFi radio queue.",
  shouldHaveAQueue: true,
  voiceConnected: true,
  sameVoiceChannel: true,
  run: async ({ client, interaction }) => {
    const queue = player.getQueue(interaction.guildId as string)
    player.deleteQueue(queue!)
    const embed = makeEmbed({
      client,
      _message: `The queue is now destroyed.`,
      success: true,
    })
    return interaction.reply({ embeds: [embed], ephemeral: true })
  },
})
