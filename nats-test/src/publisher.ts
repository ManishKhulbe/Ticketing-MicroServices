import nats from 'node-nats-streaming'

const stan= nats.connect('ticketing', 'abc',{
    url:'http://localhost:4222'
})

stan.on('connect',()=>{
    console.log('Publisher connected to NATS')

    const data= JSON.stringify({
        id:'234',
        title:'conser',
        price:33
    })

    stan.publish('ticket:created', data,()=>{
        console.log('event published')
    })
})