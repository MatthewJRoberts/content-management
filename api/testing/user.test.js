const request = require('supertest');
const expect = require('expect');
const { app } = require('./../server/server');

const { User } = require('./../server/models/user');

const { users, populateUsers } = require('./seeding/users');

beforeEach(populateUsers);

describe('TESTING User API', () => {
    
// GET ALL USERS

    describe('GET /users', () => {
        it('should get all users', done => {
            request(app)
                .get('/users')
                .expect(200)
                .expect(res => {
                    expect(res.body.length).toEqual(2)
                })
                .end(done);
        });
    });

// GET USER BY ID

    describe('GET /users/:id', () => {
        it('should get a single user by id', done => {
            request(app)
                .get(`/users/${ users[0]._id }`)
                .expect(200)
                .expect(res => {
                    expect(res.body._id.toString()).toEqual(users[0]._id.toString());
                })
                .end(done);
        });
    });

// GET CURRENT USER

    describe('GET /users/profile/me', () => {
        it('should get user if authenticated', done => {
            request(app)
                .post('/users/profile/me')
                .set('token', users[0].token)
                .expect(200)
                .expect(res => {
                    expect(res.body._id.toString()).toEqual(users[0]._id.toString());
                })
                .end(done);
        });

        it('should return 401 not authenticated', done => {
            request(app)
                .post('/users/profile/me')
                .expect(401)
                .expect(res => {
                    expect(res.body).toEqual({})
                })
                .end(done);
        });
    });

// POST USER

    describe('POST /users', () => {
        it('should create a new user', done => {
            request(app)
                .post('/users')
                .send({ 
                    "password" : "password123321",
                    "site": {
                        "name": 'Site Sample',
                        "desc": 'lorem...'
                    }
                })
                .expect(200)
                .expect(res => {
                    expect(res.body._id).toBeTruthy();
                })
                .end(err => {
                    if(err) {
                        return done(err);
                    }
                    done();
                });
        });

        it('should return invalidation errors', done => {
            request(app)
                .post('/users')
                .send({
                    email: 'once',
                    password: '123'
                })
                .expect(400)
                .end(done);
        });
        
    });

});