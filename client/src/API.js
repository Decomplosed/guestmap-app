const API_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api/v1/messages'
    : 'production-url-here'

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

export function getLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      {lat: position.coords.latitude,
        lng: position.coords.longtitude}
    },
    () => {
      fetch('https://ipapi.co/json')
        .then((res) => res.json())
        .then((location) => {
          {
            lat: location.latitude,
            lng: location.longitude
          }
        })
    }
  )
}