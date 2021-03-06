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

    const responseObj = {
      ...requestObj,
      _id: '5f0c350fa148c772221963d9',
      date: '2020-07-13T10:18:55.355Z',
    }

    request(app)
      .post('/api/v1/messages')
      .send(requestObj)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(res => {
        res.body._id = '5f0c350fa148c772221963d9',
        res.body.date = '2020-07-13T10:18:55.355Z'
      })
      .expect(200, responseObj, done)
  })

  it('can signup with international name', (done) => {
    const requestObj = {
      name: 'Ÿööhöö',
      message: 'Super App!',
      latitude: 54.3854637,
      longitude: 18.590565,
    }

    const responseObj = {
      ...requestObj,
      _id: '5f0c350fa148c772221963d9',
      date: '2020-07-13T10:18:55.355Z',
    }

    request(app)
      .post('/api/v1/messages')
      .send(requestObj)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(res => {
        res.body._id = '5f0c350fa148c772221963d9',
        res.body.date = '2020-07-13T10:18:55.355Z'
      })
      .expect(200, responseObj, done)
  })
})
