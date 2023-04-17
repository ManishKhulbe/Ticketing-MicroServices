import { Password } from './../../services/password';
import request from 'supertest'
import {app} from '../../app'

it('should fails when a email that does not exits is supplied', async ()=>{
    await request(app)
    .post('/api/users/signin')
    .send({
        email:"test@test.com",
        password:"password"
    })
    .expect(400)
})

it('should fails when an incorrect password is supplied', async ()=>{
    await request(app)
    .post('/api/users/signup')
    .send({
        email:'test@test.com',
        password:'password'
    })
    .expect(201)

    await request(app)
    .post('/api/users/signin')
    .send({
        email:'test@test.com',
        password:'asdfdgghhh'
    })
    .expect(400)
})

it('should respond with a cookie when given valid credentials', async ()=>{
    await request(app)
    .post('/api/users/signup')
    .send({
        email:'test@test.com',
        password:'password'
    })
    .expect(201)

   const response =  await request(app)
    .post('/api/users/signin')
    .send({
        email:'test@test.com',
        password:'password'
    })
    .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined();
})