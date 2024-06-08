import {
  ApplicationCommandOptionType,
  CommandInteractionOptionResolver,
  VoiceBasedChannel,
} from "discord.js"
import { Command } from "../../structure/Command"
import { StationSchema as Schema, StationSchema } from "../../models"
import { makeEmbed } from "../../context/embed"
import Youtube from "youtube-sr"
import { player } from "../../instances/playerInstance"

export default new Command({
  name: "station",
  description: "A station sub command",
  options: [
    {
      name: "create",
      description: "Creats a custom Radio station.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "name",
          description: "Name your station",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
        {
          name: "description",
          description: "Specify a descripiton for your playlist",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
      ],
    },

    {
      name: "play",
      description: "Play your own custom radio station.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "name",
          description: "Specify a custom station name",
          type: ApplicationCommandOptionType.String,
          required: true,
          autocomplete: true,
        },
      ],
    },

    {
      name: "songs",
      description: "A subcommand group",
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: [
        {
          name: "add",
          description: "Add songs to your custom radio station.",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "station",
              description: "Specify a station name",
              type: ApplicationCommandOptionType.String,
              autocomplete: true,
            },

            {
              name: "url",
              description: "Specify a YT url",
              type: ApplicationCommandOptionType.String,
              required: false,
            },
          ],
        },
      ],
    },
  ],
  run: async ({ client, interaction }) => {
    const _ = interaction.options as CommandInteractionOptionResolver
    const subcommand = _.getSubcommand()

    if (subcommand === "create") {
      const name = interaction.options.get("name")?.value as string
      const description =
        interaction.options.get("description")?.value?.toString() ||
        (undefined as string | undefined)
      new Schema({
        id: interaction.member.user.id,
        createdAt: new Date(),
        description: description,
        name: name,
        owner: interaction.member.user.username,
        songs: [],
      }).save()

      return interaction.reply({
        embeds: [
          makeEmbed({
            _message: `The station **${name}** has been created. In order to add songs, use the command \`/station songs add\``,
            success: true,
            client: client,
          }),
        ],
        ephemeral: true,
      })
    } else if (subcommand === "add") {
      const name = interaction.options.get("station")?.value as string
      const url = interaction.options.get("url")?.value as string

      const userSchema = await Schema.findOne({
        id: interaction.member.user.id,
        name: name,
      })

      const video = await Youtube.getVideo(url)
      const embed = makeEmbed({
        _message: `Added the following song: **${video.title}** to the station **${userSchema?.name}**`,
        client,
        success: true,
      })

      await Schema.findOneAndUpdate(
        { id: interaction.member.user.id, name },
        {
          songs: [...userSchema?.songs!, video.url],
        }
      )
      return interaction.reply({ embeds: [embed], ephemeral: true })
    } else if (subcommand === "play") {
      const name = interaction.options.get("name")?.value as string
      await interaction.deferReply()
      const voiceConnection = interaction.member.voice
        .channel as VoiceBasedChannel

      const userSchema = await StationSchema.findOne({
        id: interaction.member.user.id,
        name: name.toString(),
      })

      const playlist = await player.createCustomPlaylist(userSchema?.songs!, {
        properties: {
          name: name,
        },
        metadata: {
          interaction,
        },
      })

      await player.play(voiceConnection, playlist, {
        metadata: {
          interaction,
        },
        member: interaction.member,
      })
      return interaction.followUp({
        embeds: [
          makeEmbed({
            _message: `Now playing **${name}**`,
            client,
            success: true,
          }),
        ],
      })
    }
  },
})
