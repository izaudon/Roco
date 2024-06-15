import fs from "fs"
import { EmbedBuilder } from "discord.js"

export const man = {
  description: "コマンドの詳細を表示します。",
  option: "<コマンド名>"
}

export default async msg => {
  const commandName = msg.content.replace("!manual", "").trim()
  const files = fs.readdirSync("./src/commands/").filter(file => file.endsWith(".js"))
  const commands = []
  files.forEach((element) => {
    commands.push(element.replace(".js", ""))
  })

  if (!commandName) {
    return msg.channel.send("コマンド名を入力してください。")
  } else if (!commands.includes(commandName)) {
    return msg.channel.send("そのようなコマンドは存在しません。")
  }

  const path = "./" + commandName + ".js"
  const command = await import(path)
  const embed = new EmbedBuilder()
    .setColor(0xfff03c)
    .setTitle(commandName)
    .setDescription(command.man.description)
    .addFields(
      { name: "使い方", value: `!${commandName} ${command.man.option}` },
    )
  msg.channel.send({ embeds: [embed] })
}