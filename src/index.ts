require("dotenv").config()

import Client from "./structure/Client"

export const client = new Client()

client.init()
client.setupPlayer()
