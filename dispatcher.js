import { execSync } from 'child_process';
import queue from './queue.js';
import served from './served.js';

for (const txId in queue) {
    if(!served[txId]){
        console.log(`serving ${txId}`);
        const tokenId = queue[txId];
        const output = execSync(`./deployer.sh ${txId} ${tokenId}`);
        console.log(output.toString());
    } else {
        console.log(`${txId} served`);
    }
}
