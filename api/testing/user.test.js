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
                    expect(res.body.email).toEqual('mail@mail.com')
                })
                .end(done);
        });
    });

// GET CURRENT USER

    describe('GET /users/profile/me', () => {
        it('should get user if authenticated', done => {
            request(app)
                .get('/users/profile/me')
                .set('x-auth', users[0].tokens[0].token)
                .expect(200)
                .expect(res => {
                    expect(res.body._id).toBe(users[0]._id.toHexString());
                    expect(res.body.email).toBe(users[0].email);
                })
                .end(done);
        });

        it('should return 401 not authenticated', done => {
            request(app)
                .get('/users/profile/me')
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
                    "email" : "mail3@mail.com",
                    "password" : "password123321",
                    "site": {
                        "name": 'Site Sample',
                        "desc": 'lorem...'
                    }
                })
                .expect(200)
                .expect((res) => {
                    expect(res.headers['x-auth']).toBeTruthy();
                })
                .end(err => {
                    if(err) {
                        return done(err);
                    }

                    User.findOne({email: 'mail3@mail.com'}).then(user => {
                        expect(user).toBeTruthy();
                        done();
                    });
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

        it('should not create user if email is in use', done => {
            request(app)
                .post('/users')
                .send({
                    email: users[0].email,
                    password: '123321321'
                })
                .expect(400)
                .end(done);
        });
    });

});