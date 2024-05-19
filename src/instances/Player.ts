import { DisTube } from "distube"
import { client } from ".."

export default class Player extends DisTube {
  constructor() {
    super(client, {
      directLink: true,
    })
  }
}
