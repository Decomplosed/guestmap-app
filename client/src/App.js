import React, { Component } from 'react'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import {
  Card,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap'
import userIconUrl from './user_location.svg'
import messageIconUrl from './message_location.svg'

import MessageCard from './MessageCard'
import { getMessages, getLocation, sendMessage } from './API'

import './App.css'

const userIcon = L.icon({
  iconUrl: userIconUrl,
  iconSize: [50, 82],
  iconAnchor: [25, 82],
  popupAnchor: [0, -70],
})

const messageIcon = L.icon({
  iconUrl: messageIconUrl,
  iconSize: [50, 82],
})

class App extends Component {
  state = {
    location: {
      lat: 51.505,
      lng: -0.09,
    },
    zoom: 2,
    haveUserLocation: false,
    userMessage: {
      name: '',
      message: '',
    },
    sendingMessage: false,
    sentMessage: false,
    messages: [],
  }

  componentDidMount() {
    getMessages().then((messages) => {
      this.setState({ messages })
    })

    getLocation().then((location) => {
      this.setState({
        location,
        haveUserLocation: true,
        zoom: 10,
      })
    })
  }

  formIsValid = () => {
    let { name, message } = this.state.userMessage
    name = name.trim()
    message = message.trim()

    const validMessage =
      name.length > 0 &&
      name.length <= 500 &&
      message.length > 0 &&
      message.length < 500

    return validMessage && this.state.haveUserLocation ? true : false
  }

  formSubmitted = (event) => {
    event.preventDefault()

    if (this.formIsValid()) {
      this.setState({ sendingMessage: true })

      const message = {
        name: this.state.userMessage.name,
        message: this.state.userMessage.message,
        latitude: this.state.location.lat,
        longitude: this.state.location.lng,
      }

      sendMessage(message).then((result) => {
        setTimeout(() => {
          this.setState({ sendingMessage: false, sentMessage: true })
        }, 3000)
      })
    }
  }

  changeInputValue = (event) => {
    const { name, value } = event.target
    this.setState((prevState) => ({
      userMessage: {
        ...prevState.userMessage,
        [name]: value,
      },
    }))
  }

  render() {
    const position = [this.state.location.lat, this.state.location.lng]
    return (
      <div className='map'>
        <Map className='map' center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors and Chat location by Iconika from the Noun Project'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {this.state.haveUserLocation ? (
            <Marker position={position} icon={userIcon} />
          ) : null}
          {this.state.messages.map((message) => (
            <Marker
              key={message._id}
              position={[message.latitude, message.longitude]}
              icon={messageIcon}
            >
              <Popup>
                <p>
                  <em>{message.name}</em>: {message.message}
                </p>
                {message.otherMessages
                  ? message.otherMessages.map((message) => (
                      <p key={message._id}>
                        <em>{message.name}</em>: {message.message}
                      </p>
                    ))
                  : ''}
              </Popup>
            </Marker>
          ))}
        </Map>
        <MessageCard
          sendingMessage={this.state.sendingMessage}
          sentMessage={this.state.sentMessage}
          haveUserLocation={this.state.haveUserLocation}
          formSubmitted={this.formSubmitted}
          changeInputValue={this.changeInputValue}
        />
      </div>
    )
  }
}

export default App
