import { Command } from "../../structure/Command"
import {
  AttachmentBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js"
import { profileImage } from "discord-arts"
import _package from "../../../package.json"
import { Config } from "../../config/config"
const version = _package.dependencies["discord.js"]

export default new Command({
  name: "info",
  description: "Briefly tells about the bot.",

  run: async ({ client, interaction }) => {
    await interaction.deferReply()

    const user = client.users.cache.get(process.env.userId as string)
    const Owner = {
      username: user?.username,
      displayName: user?.displayName,
      icon: user?.displayAvatarURL(),
    }
    const Description = `**${
      client.user?.displayName
    }** is a Discord Bot that allows you to play LoFi music. This bot is Initially created by **${
      Owner.displayName
    }/${
      Owner.username
    }**.\n\n The is made in **__NodeJS__** by using the library **discord.js**v${version.replace(
      "^",
      ""
    )}. The core music source is **[Youtube Music](https://youtube.com)**, for the player library the bot uses **[DisTube](http://distube.js.org)**.`
    const buffer = await profileImage(client?.user?.id as string, {
      customBackground:
        "https://mrwallpaper.com/images/high/lofi-ramen-shop-pinterest-aesthetic-jtrot34t70ghmbgw.jpg",
    })
    const attachment = new AttachmentBuilder(buffer, { name: "card.png" })
    const embed = new EmbedBuilder()
      .setAuthor({
        name: client.user?.displayName as string,
        iconURL: client.user?.displayAvatarURL(),
        url: client.user?.displayAvatarURL(),
      })
      .setColor(Config.colors?.initial as any)
      .setImage(`attachment://card.png`)
      .setDescription(Description)
    const row = new ActionRowBuilder<ButtonBuilder>().setComponents(
      new ButtonBuilder()
        .setLabel("Invite")
        .setStyle(ButtonStyle.Link)
        .setEmoji(Config.emojis?.link as string)
        .setURL(process.env.inviteURL as string)
    )
    return interaction.followUp({
      files: [attachment],
      embeds: [embed],
      components: [row],
    })
  },
})
