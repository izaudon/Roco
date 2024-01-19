import { Client, GatewayIntentBits } from "discord.js"
import { config } from "dotenv"
import { handler } from "./handler.js"
import { vcHandler } from "./vc.js"

config()

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.MessageContent,
  ],
})

client.on("ready", () => console.log("ready!"))
client.on("messageCreate", handler(client))
client.on("voiceStateUpdate", vcHandler(client))

client.login(process.env.TOKEN)