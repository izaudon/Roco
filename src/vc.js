export const vcHandler = client => async (oldState, newState) => {
  const kikisen = await client.channels.cache.find(ch => ch.name === "聞き専")
  if (!kikisen) return
  if (newState.channel && !oldState.channel) {
    kikisen.send(
      `\`${newState.member.displayName}\`さんが` +
      `**${newState.channel.name}**にコネクトしました！`)
  } else if (!newState.channel && oldState.channel) {
    kikisen.send(
      `\`${oldState.member.displayName}\`さんが` +
      `**${oldState.channel.name}**からディスコネクトしました`)
  }
}