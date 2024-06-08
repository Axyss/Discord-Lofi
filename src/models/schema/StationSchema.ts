import { Schema, model } from "mongoose"
import type { StationTypes } from "../../interfaces/typings/Schema"

const StationSchema = new Schema<StationTypes>({
  id: String,
  createdAt: Date,
  description: String,
  name: String,
  owner: String,
  songs: [""],
})

export default model("station-schema", StationSchema)
