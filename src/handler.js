import { randomArray } from "./lib.js"
import talk from "./talk.js"
import { diggyWebhook } from "./webhook.js"
import command from "./command.js"

export const handler = client => async msg => {
  if (msg.author.bot) return

  if (/(D|d)iggy/.test(msg.content)) {
    diggyWebhook(msg)
  }

  if (msg.content.startsWith("!")) {
    command(msg)
  }

  let commentFlag = 0
  if (/伴田|路子|みちこ|コロちゃん/.test(msg.content)) {
    const rocoIsRoco = ["ロコはロコです！", "ロコはロコです～！", "ロコはロコですー！", "ロコのファーストネームは、ロコなんですってば～！"]
    msg.channel.send(randomArray(rocoIsRoco))
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
        currentAnswer = randomArray(talk.answer[key])
        break
      } else {
        currentAnswer = talk.answer[key]
        break
      }
    }
  }

  if (currentAnswer === undefined) {
    currentAnswer = randomArray(talk.reply)
  }
  if (commentFlag === 0) {
    msg.channel.send(currentAnswer)
  }

}