import { CommandInteractionOptionResolver } from "discord.js"
import { client } from "../index"
import { Event } from "../structure/Events"
import { ExtendedInteraction } from "../interfaces/typings/Command"
import { makeEmbed } from "../context/embed"
import { player } from "../instances/playerInstance"
export default new Event("interactionCreate", async (interaction) => {
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
