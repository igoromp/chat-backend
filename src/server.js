import 'dotenv/config'
import app from './app';
import socketIo  from   'socket.io';

const server = app.listen(process.env.APP_PORT_LISTEN, ()=>console.log('Server is running'));
const websocket = socketIo(server);

const users = {
    'USER_1':{
        user:'Igor Oliveira',
        age:29,
        contacts:[
            'Bill Gates',
            'Steve Jobs',
            'Jeff Benzos'
        ]
    }
}

websocket.on('connection', (socket)=>{
    console.log('new user Connected ... LISTEN EVENTS');

    socket.on("disconnect", ()=>{
        console.log("Disconnected")
    })

    socket.on('EVENTS', (socket)=>{
        console.log(socket.user)
        websocket.sockets.emit(socket.telefone, users[socket.user])
    })
}) 


