import {x} from './testfetch.js';


(
    async () => {
        const key = await  x({
            user:
            {
                email: 'admin@localhost.net',
                password: 'adminpass'
            }
        });
        console.log(key);
    }
)();
