import {Readable} from "stream";

const readableStream = new Readable({
    read() {}
});

readableStream.on('data',(chunk)=>{
    console.log(chunk);
});

readableStream.push('Hello there');