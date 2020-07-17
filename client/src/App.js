import React, { Component } from 'react'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Joi from 'joi'
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
import iconUrl from './user_location.svg'

import './App.css'

const userIcon = L.icon({
  iconUrl,
  iconSize: [50, 82],
  iconAnchor: [25, 82],
  popupAnchor: [0, -82],
})

const schema = Joi.object().keys({
  name: Joi.string().min(1).max(100).required(),
  message: Joi.string().min(1).max(500).required(),
})

const API_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api/v1/messages'
    : 'production-url-here'

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
    fetch(API_URL)
      .then((res) => res.json())
      .then((messages) => {
        this.setState({ messages })
      })

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          haveUserLocation: true,
          zoom: 10,
        })
      },
      () => {
        fetch('https://ipapi.co/json')
          .then((res) => res.json())
          .then((location) => {
            this.setState({
              location: {
                lat: location.latitude,
                lng: location.longitude,
              },
              haveUserLocation: true,
              zoom: 10,
            })
          })
      }
    )
  }

  formIsValid = () => {
    const userMessage = {
      name: this.state.userMessage.name,
      message: this.state.userMessage.message,
    }
    const result = Joi.validate(userMessage, schema)

    return !result.error && this.state.haveUserLocation ? true : false
  }

  formSubmitted = (event) => {
    event.preventDefault()

    if (this.formIsValid()) {
      this.setState({ sendingMessage: true })
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.userMessage.name,
          message: this.state.userMessage.message,
          latitude: this.state.location.lat,
          longitude: this.state.location.lng,
        }),
      }).then((message) => {
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
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {this.state.haveUserLocation ? (
            <Marker position={position} icon={myIcon} />
          ) : null}
          {this.state.messages.map((message) => (
            <Marker
              position={[message.latitude, message.longitude]}
              icon={myIcon}
            >
              <Popup>
                <em>
                  {message.name} says {message.message}
                </em>
              </Popup>
            </Marker>
          ))}
        </Map>
        <Card body className='messageForm'>
          <CardTitle>Message App!</CardTitle>
          <CardText>Say hi to other developers all around the world!</CardText>
          <CardText>Leave a message with your location!</CardText>
          {!this.state.sendingMessage &&
          !this.state.sentMessage &&
          this.state.haveUserLocation ? (
            <Form onSubmit={this.formSubmitted}>
              <FormGroup>
                <Label for='name'>Name</Label>
                <Input
                  onChange={this.changeInputValue}
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Name...'
                />
              </FormGroup>
              <FormGroup>
                <Label for='message'>Message</Label>
                <Input
                  onChange={this.changeInputValue}
                  type='textarea'
                  name='message'
                  id='message'
                  placeholder='Message...'
                />
              </FormGroup>
              <Button type='submit' color='info' disabled={!this.formIsValid()}>
                Send
              </Button>
            </Form>
          ) : this.state.sendingMessage || !this.state.haveUserLocation ? (
            <img
              alt='Loading...alert-danger'
              src='https://vibranttheme.com/theme/brownie/assets/animated-icons/animat-compass.gif'
            />
          ) : (
            <CardText>Thanks for submitting!</CardText>
          )}
        </Card>
      </div>
    )
  }
}

export default App
