import talk from "./talk.js"

export const handler = client => async msg => {
  if (msg.author.bot) return

  if (/(D|d)iggy/.test(msg.content)) {
    const diggy = ["分かってんだろ？ﾍﾟｲｽ", "ア アラララァ ア アァ！", "笑い止まんねぇよ"]
    await client.user.setAvatar("https://raw.githubusercontent.com/izaudon/Roco/master/public/diggy.jpg")
    await msg.channel.send(random(diggy))
    await client.user.setAvatar("https://raw.githubusercontent.com/izaudon/Roco/master/public/default.jpg")
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
}