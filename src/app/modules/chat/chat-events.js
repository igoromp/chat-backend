import crypto from 'crypto';

const CONTACTS = {
    'igor.oliveira.m@gmail.com':[
        {name:'Emanuelle Izidia', email:'manu@gmail.com'}
    ],
    'manu@gmail.com':[
        {name:'Igor Oliveira', email:'igor.oliveira.m@gmail.com'}
    ],
}

export default class ChatEvents {

    constructor( io ){
        this.websocket = io;
        this.users =[];
        this.inicialize();

    }

    inicialize(){
        this.websocket
        .of('/chat')
        .on('connection', socket => {
            socket.emit('connected', 'you are connected...');
            socket.on('disconnect', () => {
                console.log('user disconnected...')
            });
            
            socket.on('register',this.register(socket));
            
        })
    }

    register(socket) {

        socket.on('private_message',(privateMessage)=>{
            const {ofEmail, ofUser, toUser, message} = privateMessage;
            if (this.users[toUser]){
                const {socket, token } = this.users[toUser];
                socket.emit(token,{ message,user:ofUser, receivedEmail:ofEmail });
            }
        })

        return (args) => {
            const { email } = args;
            const hash = crypto.createHash('md5').update(email+(new Date()).toString()).digest('hex');
            const token = crypto.createHmac('sha256', email)
            .update(hash)
            .digest('hex');

            const userContacts = CONTACTS[email]
            this.users[email]= {socket,token};
            socket.emit('register_chat', {token, contacts:userContacts})
        }
    }

    
};