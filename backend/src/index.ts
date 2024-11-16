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
    else if ( message.type="createoffer"){
       receiverSocket.send (JSON .stringify({type:"createoffer", sdp:message.sdp}))
    }
    else if (message.type="createanswer"){
        senderSocket.send (JSON .stringify({type:"createanswer", sdp:message.sdp}))
    }
    else if (message.type === 'iceCandidate') {
      if (ws === senderSocket) {
        receiverSocket?.send(JSON.stringify({ type: 'iceCandidate', candidate: message.candidate }));
      } else if (ws === receiverSocket) {
        senderSocket?.send(JSON.stringify({ type: 'iceCandidate', candidate: message.candidate }));
      }
    }
    
  });

  ws.send('something');
});