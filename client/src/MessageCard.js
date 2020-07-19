import React from 'react'

export default (props) => {
  return (
    <Card body className='messageForm'>
      <CardTitle>Message App!</CardTitle>
      <CardText>Say hi to other developers all around the world!</CardText>
      <CardText>Leave a message with your location!</CardText>
      {!props.sendingMessage && !props.sentMessage && props.haveUserLocation ? (
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
      ) : props.sendingMessage || !props.haveUserLocation ? (
        <img
          alt='Loading...alert-danger'
          src='https://vibranttheme.com/theme/brownie/assets/animated-icons/animat-compass.gif'
        />
      ) : (
        <CardText>Thanks for submitting!</CardText>
      )}
    </Card>
  )
}
