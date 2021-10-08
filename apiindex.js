import { login, index, logout } from './api.js';
import dotenv from 'dotenv';

dotenv.config();

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

        const list = await index(key);
        console.log(list);

        logout(key);


    }
)();
