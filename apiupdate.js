import { login, update, logout } from './api.js';
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

        await update(
            key,
            nftid,
            {
                name: "Updated",
                description: "This NFT has been updated"
            }
        );

        await logout(key);

        process.exit(0);

    }
)();
