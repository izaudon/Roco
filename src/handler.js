import talk from "./talk.js"

export const handler = async msg => {
  if (msg.author.bot) return
  if (!/ロコ/.test(msg.content)) return

  const funcs = Object.keys(talk.command)
  let funcFlag = 0
  for (const key of funcs) {
    const regex = new RegExp(key)
    if (regex.test(msg.content)) {
      await talk.command[key](msg)
      funcFlag = 1
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
  if (funcFlag === 0) {
    msg.channel.send(currentAnswer)
  }

  function random(array) {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
  }
}