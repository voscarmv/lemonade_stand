import { login, create, logout } from './api.js';
import dotenv from 'dotenv';

dotenv.config();
const nftid = process.argv[2];

(
    async () => {
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

        await create(
            key,
            {
                nft_id: nftid,
                name: "Newly minted",
                description: "New NFT"
            }
        );
        await logout(key);
        process.exit(0);
    }
)();

