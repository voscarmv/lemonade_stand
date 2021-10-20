import fetch from 'node-fetch';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
console.log(`https://api-testnet.polygonscan.io/api?module=logs&action=getLogs&address=${process.env.CONTRACT}&startblock=0&endblock=200&sort=asc&apikey=${process.env.APIKEY}`);

(
    async () => {
        'https://api-testnet.polygonscan.com/api?module=logs&action=getLogs&fromBlock=0&toBlock=200000000&address=0xbfF247714114B99FcD518F57cD71c39c75d86511&apikey=3GDYP85JP5FK6KVP3GPSS4I9A7UF2GY2ES' == `https://api-testnet.polygonscan.com/api?module=logs&action=getLogs&fromBlock=0&toBlock=200000000&address=${process.env.CONTRACT}&apikey=${process.env.APIKEY}` ? console.log("YES") : console.log("NO");
        const response = await fetch(`https://api-testnet.polygonscan.com/api?module=logs&action=getLogs&fromBlock=0&toBlock=200000000&sort=asc&address=${process.env.CONTRACT}&apikey=${process.env.APIKEY}`);
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