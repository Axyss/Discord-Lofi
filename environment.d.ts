declare global {
  namespace NodeJS {
    interface ProcessEnv {
      token: string
      guildId?: string
      connectionURI: string
      environment?: "dev" | "prod" | "debug"
    }
  }
}

export {}
