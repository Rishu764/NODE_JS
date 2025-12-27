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