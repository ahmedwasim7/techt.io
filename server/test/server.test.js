const { describe, before, it } = require('mocha')
require('dotenv').config()
const request = require('supertest')
const app = require('../app')
const { expect } = require('chai')

describe('Chat routes', () => {
  let authToken = '' // will store a JWT token for authentication

  before(async () => {
    // Log in as a user and get a JWT token for authentication
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'test@example.com', password: 'password' })
    authToken = res.body.token
  })

  describe('GET /api/chat', () => {
    it('should return a list of chat rooms the user is not in', async () => {
      const res = await request(app)
        .get('/api/chat')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
      expect(res.body).to.be.an('array')
    })

    it('should return 401 if user is not authenticated', async () => {
      await request(app).get('/api/chat').expect(401)
    })
  })

  describe('GET /myrooms', () => {
    it('should return a list of chat rooms the user is in', async () => {
      const res = await request(app)
        .get('/api/chat/myrooms')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
      expect(res.body).to.be.an('array')
    })

    it('should return 401 if user is not authenticated', async () => {
      await request(app).get('/api/chat/myrooms').expect(401)
    })
  })

  describe('POST /', () => {
    it('should create a new chat room', async () => {
      const res = await request(app)
        .post('/api/chat')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Test room' })
        .expect(201)
      expect(res.body).to.have.property('name', 'Test room')
    })

    it('should return 401 if user is not authenticated', async () => {
      await request(app).post('/api/chat').send({ name: 'Test room' }).expect(401)
    })
  })

  describe('POST /join', () => {
    let roomId = '' // will store the ID of a chat room

    before(async () => {
      // Create a chat room to join
      const res = await request(app)
        .post('/api/chat')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Test room' })
      roomId = res.body._id
    })

    it('should add the user to a chat room', async () => {
      const res = await request(app)
        .post('/api/chat/join')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ room_id: roomId })
        .expect(201)
    })
  })

  after(() => {
    process.exit()
  })
})
