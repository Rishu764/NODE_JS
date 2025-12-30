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
    // const readStream = fs.createReadStream('sample.txt');
    // const writeStream = fs.createWriteStream('output.txt');

    // readStream.on('data',(chunk)=>{
    //   console.log(chunk)
    //   writeStream.write(chunk)
    // });

    res.end()
});

const PORT = 3000;
server.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));








// import {pipeline} from 'node:stream/promises';
// import fs from 'node:fs';
// import zlib from 'node:zlib';


// async function run(){
//     await pipeline(
//         fs.createReadStream('demo.txt'),
//         zlib.createGzip(),
//         fs.createWriteStream('demo.tar.gz')
//     );
//     console.log('Pipeline Succeeded');
// }

// run().catch(console.error);



