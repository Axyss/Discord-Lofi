import { Config } from "../config/config"
import { getInteractionFromSong } from "../helper/getInteractionFromSong"
import { player } from "../instances/playerInstance"
import { EmbedBuilder, ColorResolvable } from "discord.js"

player.on("playSong", async (queue, song) => {
  console.log(song)
})
