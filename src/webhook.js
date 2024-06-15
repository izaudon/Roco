import { randomArray } from "./lib.js"
import talk from "./talk.js"

export const diggyWebhook = async msg => {
  const sendText = randomArray(talk.diggy)
  const username = "Diggy'MO"
  const avatarURL = "https://raw.githubusercontent.com/izaudon/Roco/master/public/diggy.jpg"
  const webhook = await (async () => {
    for (const [ , webhook ] of (await msg.channel.fetchWebhooks())) {
      if (webhook.name === "diggy") return webhook
    }
  })() || await msg.channel.createWebhook({name: "diggy"})
  await webhook.send({
    content: sendText,
    username: username,
    avatarURL: avatarURL,
  })
}