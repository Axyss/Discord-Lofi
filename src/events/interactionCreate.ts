import { CommandInteractionOptionResolver } from "discord.js"
import { client } from "../index"
import { Event } from "../structure/Events"
import { ExtendedInteraction } from "../interfaces/typings/Command"
import { makeEmbed } from "../context/embed"
import { player } from "../instances/playerInstance"
import { StationSchema } from "../models"
export default new Event("interactionCreate", async (interaction) => {
  if (interaction.isAutocomplete()) {
    const userInput = interaction.options.getFocused().toString()
    const getFullInput = interaction.options.getFocused(true)
    const subcommand = interaction.options.getSubcommand()
    if (subcommand === "add") {
      const text =
        getFullInput.name === "station"
          ? getFullInput.value
          : interaction.options.getString("station")
      const fetchUserSchema = await StationSchema.find({})
      const userNames = fetchUserSchema.filter(
        (user) => user.id === interaction.member?.user.id
      )

      if (!text) {
        return interaction.respond(
          userNames.map((choice) => ({ name: choice.name, value: choice.name }))
        )
      } else {
        const filtered = userNames.filter((x) =>
          x.name.toLowerCase().includes(text.toLowerCase())
        )
        await interaction
          .respond(
            filtered
              .map((choice) => ({
                name: choice.name,
                value: choice.name,
              }))
              .slice(0, 25)
          )
          .catch((err) => {
            console.log(err.message)
          })
      }
    } else if (subcommand === "play") {
      const text =
        getFullInput.name === "name"
          ? getFullInput.value
          : interaction.options.getString("name")
      const fetchUserSchema = await StationSchema.find({})
      const userNames = fetchUserSchema.filter(
        (user) => user.id === interaction.member?.user.id
      )

      if (!text) {
        return interaction.respond(
          userNames.map((choice) => ({ name: choice.name, value: choice.name }))
        )
      } else {
        const filtered = userNames.filter((x) =>
          x.name.toLowerCase().includes(text.toLowerCase())
        )
        await interaction
          .respond(
            filtered
              .map((choice) => ({
                name: choice.name,
                value: choice.name,
              }))
              .slice(0, 25)
          )
          .catch((err) => {
            console.log(err.message)
          })
      }
    }
  }

  // Chat Input Commands
  if (interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName)
    const _guild = client.guilds.fetch(interaction?.guildId as string)
    const _id = interaction.member?.user.id as string
    const member = (await _guild).members.cache.get(_id)!
    const { channel } = member.voice
    if (!command)
      return interaction.followUp("You have used a non existent command")

    if (command.voiceConnected) {
      if (!member?.voice.channel)
        return interaction.reply({
          embeds: [
            makeEmbed({
              _message: `${member} you should be in a voice channel, in order to execute this command.`,
              error: true,
              client: client,
            }),
          ],
          ephemeral: true,
        })
    }

    if (command.shouldHaveAQueue) {
      const queue = player.getQueue(interaction.guildId as string)
      if (!queue)
        return interaction.reply({
          embeds: [
            makeEmbed({
              _message: `There is no LoFi queue presented. In order to start, you must use the command **\`/play\`**.`,
              client: client,
            }),
          ],
          ephemeral: true,
        })
    }

    if (command.alreadyHaveAQueue) {
      const queue = player.getQueue(interaction.guildId as string)
      if (queue)
        return interaction.reply({
          embeds: [
            makeEmbed({
              _message: `There is already a LoFi queue. In order to start fresh, you must destroy the current playing LoFi queue.\n\n You can always use the command **\`/destory\`** in order to destroy the queue.`,
              client: client,
            }),
          ],
          ephemeral: true,
        })
    }
    if (command.sameVoiceChannel) {
      if (
        channel?.guild.members.me?.voice.channel &&
        channel.guild?.members?.me?.voice.channel.id != channel.id
      )
        return interaction.reply({
          embeds: [
            makeEmbed({
              _message: `As of now, I am already connected to: ${channel.guild.members?.me.voice.channel}.`,
              client: client,
            }),
          ],
          ephemeral: true,
        })
    }

    command.run({
      args: interaction.options as CommandInteractionOptionResolver,
      client,
      interaction: interaction as ExtendedInteraction,
    })
  }
})
