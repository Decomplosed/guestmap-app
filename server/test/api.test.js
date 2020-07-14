const request = require('supertest')

const app = require('../src/app')

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        200,
        {
          message: 'API - 👋🌎🌍🌏',
        },
        done
      )
  })
})

describe('GET /api/v1/messages', () => {
  it('responds with inserted message', (done) => {
    const requestObj = {
      name: 'Bart',
      message: 'Super App!',
      latitude: 54.3854637,
      longitude: 18.590565,
    }

    request(app)
      .post('/api/v1/messages')
      .send(result)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, result, done)
  })
})
