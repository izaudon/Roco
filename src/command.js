import fs from "fs"

export default async msg => {
  const files = fs.readdirSync("./src/commands/").filter(file => file.endsWith(".js"))
  const commands = []
  files.forEach((element) => {
    commands.push(element.replace(".js", ""))
  })

  for (const key of commands) {
    const regex = new RegExp("!" + key)
    if (regex.test(msg.content)) {
      const path = "./commands/" + key + ".js"
      const command = await import(path)
      command.default(msg)
    }
  }
}