import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

export const login = async (data) => {
  try {
    // const jsonData = data;
    console.log(data)
    const getLogin = await fetch(`${process.env.RAPIURL}/login`,
    {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data)
    }
);

    console.log("fetching");
    const loginJWT = getLogin.headers.get('authorization');
    console.log(getLogin);
    if (loginJWT === null) {
      console.log(`Login failed`);
      process.exit(1);
    }
    if (getLogin.status !== 200) {
      console.log(`Status ${getLogin.status}`);
      process.exit(2);
    }
    return loginJWT;
  } catch (e) {
    console.log(e);
    process.exit(3);
  };
};

export const create = async (key, data) => {
  try {
    const jsonData = data;
    const getAppointment = await fetch(
      `${process.env.RAPIURL}/nfts`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: key,
        },
        body: JSON.stringify(jsonData),
      },
    );
    if (getAppointment.status !== 201) {
      console.log(getAppointment);
      process.exit(4);
    }
    console.log("created.");
    return true;
  } catch (e) {
    console.log(e);
    process.exit(5);
  }
};

export const index = async (key) => {
  try {
    console.log(`${process.env.RAPIURL}/nfts`);
    const getJson = await fetch(
      `${process.env.RAPIURL}/nfts`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: key,
        }
      }
    );
    console.log('even before');
    if (getJson.status !== 200) {
      console.log(getJson.statusText);
      process.exit(4);
    }
    console.log("before");
    const output = await getJson.json();
    console.log('output');
    console.log("after");
    console.log(await JSON.stringify(output));
    return output;
  } catch (e) {
    console.log(e);
    process.exit(5);
  }
};

export const update = async (key, nftid, data) => {
  try {
    const jsonData = data;
    console.log(JSON.stringify(jsonData));
    const getAppointment = await fetch(
      `${process.env.RAPIURL}/nfts/${nftid}`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          Authorization: key,
        },
        body: JSON.stringify(jsonData),
      },
    );
    if (getAppointment.status !== 200) {
      console.log(getAppointment.statusText);
      process.exit(6);
    }
    console.log("updated.");
    return true;
  } catch (e) {
    console.log(e);
    process.exit(7);
  }
};

export const logout = async (key) => {
  try {
    const getLogout = await fetch(
      `${process.env.RAPIURL}/logout`,
      {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          Authorization: key,
        },
      },
    );
    if (getLogout.status !== 200) {
      console.log(getLogout.statusText);
      process.exit(8)
    }
    console.log("Logged out!");
    return true;
  } catch (e) {
    console.log(e);
    process.exit(9);
  }
};
