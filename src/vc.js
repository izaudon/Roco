export const vcHandler = client => async (oldState, newState) => {
  const kikisenCh = async st => {
    const guildId = await st.guild.id
    const guild = client.guilds.cache.get(guildId)
    const kikisen = guild.channels.cache.find(ch => ch.name === "聞き専")
    return kikisen
  }

  if (newState.channel && !oldState.channel) {
    const kikisen = await kikisenCh(newState)

    if (!kikisen) return

    kikisen.send(
      `\`${newState.member.displayName}\`さんが` +
      `**${newState.channel.name}**にコネクトしました！`)
  } else if (!newState.channel && oldState.channel) {
    const kikisen = await kikisenCh(oldState)

    if (!kikisen) return

    kikisen.send(
      `\`${oldState.member.displayName}\`さんが` +
      `**${oldState.channel.name}**からディスコネクトしました`)
  }

}