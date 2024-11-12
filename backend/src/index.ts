import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
// global variable
let senderSocket: any = null;
let receiverSocket: any= null;

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data: any) {
    const message = JSON.parse(data);
    if(message.type = "sender"){
        senderSocket=ws;
    }
    else if (message.type ="receiver"){
        receiverSocket=ws;
    }
    else if ( message.type="create offer"){
       receiverSocket.send (JSON .stringify({type:"create offer", sdp:message.sdp}))
    }
    else if (message.type="create answer"){
        senderSocket.send (JSON .stringify({type:"createAnswer", sdp:message.sdp}))
    }
    
  });

  ws.send('something');
});