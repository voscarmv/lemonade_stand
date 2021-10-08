import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

export const x = async (data) => {
    console.log(data);
    const r = await fetch(`${process.env.RAPIURL}/login`,
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        }
    );
    console.log(r.statusText)
    return r.headers.get('authorization');
}
