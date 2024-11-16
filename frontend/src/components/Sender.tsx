import { useEffect, useState } from "react"

export function Sender(){
const [socket , SetSocket]=useState<WebSocket|null>(null)
    useEffect(()=>{
  const socket = new WebSocket('ws://localhost:8080');
  socket.onopen =()=>{
socket.send(JSON.stringify({type:'sender'}))
  }
  SetSocket(socket);

    },[]);


     async function startsendingvideo(){
        if(!socket)return
          //create offer 
          const pc = new RTCPeerConnection();

          pc.onnegotiationneeded= async()=>{
            const offer = await pc.createOffer()   //sdp
            await pc.setLocalDescription(offer);
            socket?.send(JSON.stringify({type:'createoffer', sdp:pc.localDescription}))
          }
         

          pc.onicecandidate=(event)=>{
console.log(event);
if(event.candidate){
    socket?.send(JSON.stringify({type:'iceCandidate', candidate: event.candidate}));
}
          }


          socket.onmessage=(event)=>{
            const data = JSON.parse(event.data);
            if(data.type==="createanswer"){
                pc.setRemoteDescription(data.sdp);
            }
            else if(data.type ==='iceCandidate'){
                pc.addIceCandidate(data.candidate);
            }

          }
          const stream = await navigator.mediaDevices.getUserMedia({video:true, audio:false})
          pc.addTrack(stream.getVideoTracks()[0]); 
          const video = document.createElement('video');
        document.body.appendChild(video);
            video.srcObject = stream;
            video.play();

    }

   

    return<div>

    Sender
    <button onClick={startsendingvideo}> Start</button>
    </div>
}