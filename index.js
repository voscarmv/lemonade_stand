import fetch from 'node-fetch';
import dotenv from 'dotenv';
import util from 'util';

dotenv.config();
console.log(`https://api-rinkeby.etherscan.io/api?module=logs&action=getLogs&address=${process.env.CONTRACT}&startblock=0&endblock=200&sort=asc&apikey=${process.env.APIKEY}`);

(
    async () => {
        const response = await fetch(`https://api-rinkeby.etherscan.io/api?module=logs&action=getLogs&address=${process.env.CONTRACT}&startblock=0&endblock=200&sort=asc&apikey=${process.env.APIKEY}`);
        const body = await response.json();
        // console.log(body.result);
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
                                
            }
        );
        console.log(requests);
        // console.log(util.inspect(body.result, {showHidden: true, depth: null, colors: true}));
        // fs.writeFile('../tables.json', JSON.stringify(body), function (err) {
        //     if (err) return console.log(err);
        // });

   }
)();