import { Event } from "../structure/Events"
import { ActivityType } from "discord.js"

export default new Event("ready", (client) => {
  client.user.setActivity({
    name: "LoFi music, use /play to play something ✨",
    type: ActivityType.Streaming,
    url: "https://chillhop.com/live/lofihiphop/",
  })
})
