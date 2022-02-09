const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const Notes = require('../models/notes.models');

chai.should();
chai.use(chaiHttp);

// Only tests for notes.routes.js without middleware (checked with secret token) 
describe('App API', () => {

    /**
     * Test the GET route 
     */
    describe('GET /api/notes/', () => {
        it("I should GET all the notes", (done) => {
            chai.request(server)
                .get('/api/notes/')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                });
        });
    });

    describe('GET /api/notes/', () => {
        it("I should NOT GET all the notes", (done) => {
            chai.request(server)
                .get('/api/notessss/')
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });
    });

    /**
     * Test the POST route 
     */

    describe('POST /api/notes/create', () => {
        it('It should POST a notes', (done) => {
            const notes = {
                text: "text",
                time: "time",
            }
            chai.request(server)
                .post('/api/notes/create')
                .send(notes)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('text').eq('text');
                    response.body.should.have.property('time').eq('time');
                done();
                });
        });
    }); 

    describe('POST /api/notes/create', () => {
        it('It should NOT POST a notes', (done) => {
            const notes = {
                text: "Date time with Olha",
            }
            chai.request(server)
                .post('/api/notes/create')
                .send(notes)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq('Bad Request');
                done();
                });
        });
    }); 

    /**
     * Test the PUT route 
     */

    describe('PUT /api/notes/edit/:id', () => {
        it('It should UPDATE a notes', (done) => {
            const id = '6202a953ee34a13b6301576e';
            const notes = {
                text: "text-text",
                time: "time-time",
            }
            chai.request(server)
                .put('/api/notes/edit/:id' + id)
                .send(notes)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('text').eq('text-text');
                    response.body.should.have.property('time').eq('time-time');
                done();
                });
        });
    });    

    describe('PUT /api/notes/edit/:id', () => {
        it('It should NOT UPDATE a notes', (done) => {
            const notes = {
                text: "text-text",
                time: "time-time",
            }
            chai.request(server)
                .put('/api/notes/edit/:id')
                .send(notes)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq('Bad Request');
                done();
                });
        });
    });    

    /**
     * Test the DELETE route 
     */

    describe('DELETE /api/notes/delete/:id', () => {
        it('It should DELETE a notes given the id', (done) => {
            const id = '6202a953ee34a13b6301576e';
                chai.request(server)
                    .delete('/api/notes/delete/' + id)
                    .end((err, response) => {
                        response.should.have.status(200);
                    done();    
                    });
        });
    }); 

    describe('DELETE /api/notes/delete/:id', () => {
        it('It should NOT DELETE a notes given the id', (done) => {
            const id = '111111';
                chai.request(server)
                    .delete('/api/notes/delete/' + id)
                    .end((err, response) => {
                        response.should.have.status(404);
                        response.text.should.be.eq('The task with the provided ID does not exits.')
                    done();    
                    });
        });
    });  

});