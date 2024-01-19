import { ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js"
import talk from "./talk.js"

export const handler = client => async msg => {
  if (msg.author.bot) return

  if (/(D|d)iggy/.test(msg.content)) {
    const diggy = ["分かってんだろ？ﾍﾟｲｽ", "ア アラララァ ア アァ！", "笑い止まんねぇよ"]
    const sendText = random(diggy)
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

  if (/^(?=.*アイドル)(?=.*ランダム).*$/.test(msg.content)) {
    randomIdol(msg)
  }

  let commentFlag = 0
  if (/伴田|路子|みちこ|コロちゃん/.test(msg.content)) {
    const rocoIsRoco = ["ロコはロコです！", "ロコはロコです～！", "ロコはロコですー！", "ロコのファーストネームは、ロコなんですってば～！"]
    msg.channel.send(random(rocoIsRoco))
    commentFlag = 1
  }

  if (!/ロコ/.test(msg.content)) return

  const funcs = Object.keys(talk.command)
  for (const key of funcs) {
    const regex = new RegExp(key)
    if (regex.test(msg.content)) {
      await talk.command[key](msg)
      commentFlag = 1
    }
  }

  const words = Object.keys(talk.answer)
  let currentAnswer
  for (const key of words) {
    const regex = new RegExp(key)
    if (regex.test(msg.content)) {
      if (Array.isArray(talk.answer[key])) {
        currentAnswer = random(talk.answer[key])
        break
      } else {
        currentAnswer = talk.answer[key]
        break
      }
    }
  }

  if (currentAnswer === undefined) {
    currentAnswer = random(talk.reply)
  }
  if (commentFlag === 0) {
    msg.channel.send(currentAnswer)
  }

  function random(array) {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
  }

  async function randomIdol(msg) {
    const allButton = new ButtonBuilder()
      .setCustomId("randomMillionAll")
      .setStyle(ButtonStyle.Primary)
      .setLabel("765PRO (52人)")
    const ASButton = new ButtonBuilder()
      .setCustomId("randomAllStars")
      .setStyle(ButtonStyle.Danger)
      .setLabel("ALLSTARS (13人)")
    const mlButton = new ButtonBuilder()
      .setCustomId("randomMillionStars")
      .setStyle(ButtonStyle.Success)
      .setLabel("MILLIONSTARS (39人)")
    await msg.channel.send({
      content: "どのチームからチョイスしますか？",
      components: [
        new ActionRowBuilder()
          .addComponents(allButton, ASButton, mlButton)
      ]
    })
  }

}