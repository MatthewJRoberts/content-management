const request = require('supertest');
const expect = require('expect');
const { app } = require('./../server/server');

const { token, pages, populatePages } = require('./seeding/pages');

beforeEach(populatePages);

describe('TESTING Pages API', () => {

// RETREIVE ALL PAGES

    describe('GET /pages', () => {
        it('should get all pages', done => {
            request(app)
                .get('/pages')
                .expect(200)
                .expect(res => {
                    expect(res.body.length).toEqual(pages.length)
                    expect(res.body[0].name).toEqual(pages[0].name);
                })
                .end(done);
        });
    });

// RETREIVE A SINGLE PAGE

    describe('GET /pages/:id', () => {
        it('should get a single page', done => {
            request(app)
                .get(`/pages/${ pages[0]._id }`)
                .expect(200)
                .expect(res => {
                    expect(res.body.name).toEqual(pages[0].name)
                })
                .end(done);
        });
    });

// RETREIVE ALL PAGES WITH SITE ID

    describe('GET /pages/site/:id', () => {
        it('should get all pages with a site id', done => {
            request(app)
                .get(`/pages/site/${ pages[0].siteid }`)
                .expect(200)
                .expect(res => {
                    expect(res.body.length).toEqual(2)
                })
                .end(done);
        });
    });

// CREATE A NEW PAGE

    describe('POST /pages', () => {
        it('should post a new page', done => {
            request(app)
                .post('/pages')
                .set('x-auth', token)
                .send({
                    "name": 'SamplePage',
                    "posts": []
                })
                .expect(200)
                .expect(res => {
                    expect(res.body.name).toEqual('SamplePage')
                })
                .end(done);
        });

        it('should fail to post due to authorization', done => {
            request(app)
                .post('/pages')
                .send({
                    "name": 'SamplePage',
                    "posts": []
                })
                .expect(401)
                .end(done);
        });
    });

// UPDATE A PAGE

    describe('POST /pages/:id', () => {
        it('should update a page', done => {
            request(app)
                .put(`/pages/${ pages[0]._id }`)
                .set('x-auth', token)
                .send({
                    "name": "Sample Page UPDATED"
                })
                .expect(200)
                .expect(res => {
                    expect(res.body.name).toEqual('Sample Page UPDATED')
                })
                .end(done);
        });

        it('should fail to update due to authorization', done => {
            request(app)
                .put(`/pages/${ pages[0]._id }`)
                .send({
                    "name": "Sample Page UPDATED"
                })
                .expect(401)
                .end(done);
        });
    });

// DELETE A PAGE 

    describe('DELETE /pages/:id', () => {
        it('should delete a page', done => {
            request(app)
                .delete(`/pages/${ pages[0]._id }`)
                .set('x-auth', token)
                .expect(200)
                .expect(res => {
                    expect(res.body._id).toEqual(pages[0]._id.toHexString())
                })
                .end(done);
        });

        it('should fail to delete due to authorization', done => {
            request(app)
                .delete(`/pages/${ pages[0]._id }`)
                .expect(401)
                .end(done);
        });
    });

});
