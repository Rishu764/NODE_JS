# STREAM

 Stream is an abstract interface for woking with data in node js.

 *Instead of reading a 2 gb file into memory all at once (which would crash your app), you stream it peice by peice(chunks).*

 ## The Four Fundamental Types

 Writable - Streams to which data can be written *fs.createWriteStream().*
 
 Readable - Streams from which data can be read *fs.createReadStream()*

 Duplex - Streams that are both Readable and Writeable *TCP Socket.*

 Transform - A type of Duplex stream that modifies data as it is written/read *zlib.createGzip().*


 ## Core Concepts

 EventEmmiter - All Streams are instance of EventEmmiter.They communicate state changes *(like "data is ready" or "I'm finished" via events)*

 Object Mode - Normally, Streams deal with *buffer* or *string*. However, you can set *{objectMode: true}* to make a stream handle any Javascript value *(except null)*.

Buffering & Backpressure: Every stream has an internal buffer. The size limit is called the *highWaterMark*. If a source is faster than the destination, the buffer fills up. This create "backpressure", telling source to slow down so you don't run out of RAM.

## The Streams Promises API.

Since Node.js v15, we have a way to use streams with async/await.
Instead of just *require('node:stream')*, you can use *require('node:stream/promises')*.


```js
import {pipeline} from 'node:stream/promises';
import fs from 'node:fs';
import zlib from 'node:zlib';

async function run(){
    await pipeline(
        fs.createReadStream('demo.txt'),
        zlib.createGzip(),
        fs.createWriteStream('demo.tar.gz')
    );
    console.log('Pipeline Succeeded');
}

run().catch(console.error);
```

## Example how can we work with stream in file system.

```js
import http from "http";
import fs from "node:fs";

const server = http.createServer((req, res)=>{
    if(req.url != '/') res.end();
    
    // download big file (Bad way)
    // const file = fs.readFileSync("sample.txt");
    // res.end(file);

    // Downloading big file using good way (Streams)
    // const readableStream = fs.createReadStream("sample.txt");
    // readableStream -> writableStream (Pipe)
    // NOTE - req is a readablestream and res is a writable stream.
    // readableStream.pipe(res);

    // Copy big file using bad way
    // const file = fs.readFileSync('sample.txt');
    // fs.writeFileSync('output.txt', file);
    // res.end();

    // copy big file good way
    const readStream = fs.createReadStream('sample.txt');
    const writeStream = fs.createWriteStream('output.txt');

    readStream.on('data',(chunk)=>{
      console.log(chunk)
      writeStream.write(chunk)
    });

    res.end()
});

const PORT = 3000;
server.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));
