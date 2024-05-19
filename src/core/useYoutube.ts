import { Innertube, YTNodes } from "youtubei.js"
import { shuffleArray } from "../helper/shuffle"
type Options = {
  continuation?: boolean
}
export async function useYouTube(query: string, options?: Options) {
  const QUERY: string = query.toString()

  const youtube = await Innertube.create()
  const videos = await youtube.music.search(QUERY, {
    type: "playlist",
  })
  if (options?.continuation) {
    const continuationData = (
      await videos.getContinuation()
    ).contents?.contents?.as(YTNodes.MusicResponsiveListItem)
    const shuffled = shuffleArray(continuationData!)
    const randomizePlaylistID = shuffled[
      Math.floor(Math.random() * shuffled.length)
    ].id?.replace("VL", "")
    return randomizePlaylistID
  } else {
    const content = videos.results
    const shuffled = shuffleArray(content!)
    const randomizePlaylistID = shuffled[
      Math.floor(Math.random() * shuffled.length)
    ].id?.replace("VL", "")
    return randomizePlaylistID
  }
}
