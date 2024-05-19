import { makeEmbed } from "../../context/embed"
import { player } from "../../instances/playerInstance"
import { Command } from "../../structure/Command"
import { ApplicationCommandOptionType } from "discord.js"

export default new Command({
  name: "volume",
  description: "Change the LoFi radio volume.",
  shouldHaveAQueue: true,
  sameVoiceChannel: true,
  voiceConnected: true,
  options: [
    {
      name: "percentage",
      description: "Specify the volume percentage (%)",
      type: ApplicationCommandOptionType.Integer,
      required: false,
    },
  ],
  run: async ({ client, interaction }) => {
    const percentage = interaction.options.get("percentage")?.value as number
    if (!percentage)
      return interaction.reply({
        embeds: [
          makeEmbed({
            client: client,
            _message: `You must need to specify a volume percentage. Example \`/volume 30\``,
            error: true,
          }),
        ],
      })
    const queue = player.getQueue(interaction.guildId as string)
    queue?.setVolume(percentage)
    return interaction.reply({
      embeds: [
        makeEmbed({
          client: client,
          _message: `The LoFi radio volume has been set to **${percentage}**%`,
          success: true,
        }),
      ],
    })
  },
})
