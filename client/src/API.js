export function getMessages() {
  return fetch(API_URL)
    .then((res) => res.json())
    .then((messages) => {
      const haveSeenLocation = {}
      return messages.reduce((all, message) => {
        const key = `${message.latitude}${messages.longitude}`
        if (haveSeenLocation[key]) {
          haveSeenLocation[key].otherMessages =
            haveSeenLocation[key].otherMessages || []
          haveSeenLocation[key].otherMessages.push(message)
        } else {
          haveSeenLocation[key] = message
          all.push(message)
        }
        return all
      }, [])
    })
}
