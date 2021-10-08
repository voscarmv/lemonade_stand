import dotenv from 'dotenv';
import pinataSDK from '@pinata/sdk';
import { login, update, logout } from './api.js';
dotenv.config();
// Use pinata to upload sound, and update api entry for nft.

const filename = process.argv[2];
console.log(filename);
filename == "null" ? process.exit(1) : console.log(filename);

const nftid = process.argv[3];
// try {
// Upload pinata...
// Update API...

(
    async () => {

        try {
            const pinata = pinataSDK(process.env.PINATAAPI, process.env.PINATASECRETAPI);
            const sourcePath = `${filename}`;
            console.log("options");
            const options = {
                pinataMetadata: {
                    name: 'My Awesome Website',
                    keyvalues: {
                        customKey: 'customValue',
                        customKey2: 'customValue2'
                    }
                },
                pinataOptions: {
                    cidVersion: 0
                }
            };
            console.log("pinata");
            const result = await pinata.pinFromFS(sourcePath, options);
            console.log("what");
            console.log(`https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`);
            console.log("nada");

            // Response:
            //   {
            //     IpfsHash: 'QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j',
            //     PinSize: 20,
            //     Timestamp: '2021-10-01T02:13:46.057Z'
            //   }

            const key = await login(
                {
                    user:
                    {
                        email: process.env.RAPIUSER,
                        password: process.env.RAPIPASS,
                    }
                }
            );

            console.log(key);

            await update(
                key,
                nftid,
                {
                    name: "Updated",
                    description: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
                }
            );

            await logout(key);

            process.exit(0);
        } catch (e) {
            process.exit(9);
        }

    }
)();

// } catch(e) {
//  process.exit(2);
// }




// Hosted in: https://gateway.pinata.cloud/ipfs/QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j
