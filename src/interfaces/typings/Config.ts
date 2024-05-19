interface Emojis {
  error?: string
  success?: string
  info?: string
  disc?: string
  rules?: string
  admin?: string
  sparkle?: string
  play_pause?: string
  next?: string
  headphones?: string
  spotify?: string
  right?: string
  left?: string
  link?: string
}

interface Colors {
  error?: string
  success?: string
  info?: string
  initial?: string
}

export interface IConfig {
  emojis?: Emojis
  colors?: Colors
}
