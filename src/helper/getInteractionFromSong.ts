import { Song } from "distube"
import { ExtendedInteraction } from "../interfaces/typings/Command"

export function getInteractionFromSong<T extends Song<unknown>>(
  song: T
): ExtendedInteraction {
  const metadata = song.metadata as any
  const interaction = metadata.interaction as ExtendedInteraction
  return interaction
}
