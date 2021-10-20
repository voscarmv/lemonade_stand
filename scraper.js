import fetch from 'node-fetch';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
const urlmumbai = `https://api-testnet.polygonscan.com/api?module=logs&action=getLogs&fromBlock=0&toBlock=200000000&sort=asc&address=${process.env.CONTRACT}&apikey=${process.env.APIKEY}`;
const urlmain = `https://api.polygonscan.com/api?module=logs&action=getLogs&fromBlock=0&toBlock=200000000&sort=asc&address=${process.env.CONTRACT}&apikey=${process.env.APIKEY}`;
let url;
process.env.NETWORK == 'live' || process.env.NETWORK == 'mainnet' ? url = urlmain : url = urlmumbai;
console.log(url);

(
    async () => {
        const response = await fetch(url);
        const body = await response.json();
        console.log(body.result);
        const requests = body.result.filter(transaction => {
            if(transaction.hasOwnProperty('topics')){
                if(transaction.topics.length < 4){
                    return false;
                }
                const a1 = process.env.OWNER;
                const a2 = '0x0000000000000000000000000000000000000000000000000000000000000000';
                if(transaction.topics[1] == a1 && transaction.topics[2] != a2) {
                    return true;
                }
            }
            return false;
        });
        let queue = {};
        requests.forEach(
            r => {
                queue[r.transactionHash] = parseInt(r.topics[3], 16);
            }
        );
        console.log(queue);
        // console.log(util.inspect(body.result, {showHidden: true, depth: null, colors: true}));
        fs.writeFile('./queue.js', `export default ${JSON.stringify(queue)}`, function (err) {
            if (err) return console.log(err);
        });
   }
)();