
/*
import {getAuthToken} from '@exoshtw/apple-auth-backend';
import { config } from 'dotenv';

//import { fs } from 'fs';
//import path from 'path';

const fs = require('fs');
const path = require('path');

config();

const options =  {
    clientId: process.env.APPLE_CLIENT_ID,
    teamId: process.env.APPLE_TEAM_ID,
    keyId: process.env.APPLE_KEY_ID
};

export async function loginApple(code) {

    const response = await getAuthToken(code, {...options,
        key: fs.readFileSync(path.resolve(__dirname, '../../../../AuthKey_T256F72HY4.p8')),
    });
    return response;

    //console.log(response);

    // {
    //   access_token: '...',
    //   token_type: 'Bearer',
    //   expires_in: 3600,
    //   refresh_token: '...',
    //   id_token: '{encoded_jwt_reponse}',
    //   data: { // <- decoded id_token
    //     iss: 'https://appleid.apple.com',
    //     aud: '...',
    //     exp: 1582046751,
    //     iat: 1582046151,
    //     sub: '...',
    //     at_hash: '...',
    //     email: '...',
    //     email_verified: 'true',
    //     auth_time: 1582046132
    //   }
    // }
}

*/

import appleSignin from 'apple-signin-auth';
// OR const appleSignin = require('apple-signin-auth');
// OR import { getAuthorizationUrl } from 'apple-signin-auth';
import { config } from 'dotenv';

config();
 
const options = {
  clientID: "com.paisanoscreando.boilerbackend",
  redirectUri: "https://boilerbackend.paisanos.io/auth/apple/callback",
  state: 'state',
  //responseMode: 'query',
  //response_type: 'form_post',
  scope: "email"
};

export const authorizationUrl = () => appleSignin.getAuthorizationUrl(options);

/*

export const clientSecret = appleSignin.getClientSecret({
    clientID: process.env.APPLE_CLIENT_ID,
    teamID: process.env.APPLE_TEAM_ID,
    privateKey: 'PRIVATE_KEY_STRING',
    keyIdentifier: 'XXX'
});

export const option = {
    clientID: process.env.APPLE_CLIENT_ID,
    redirectUri: 'http://localhost:3000/auth/apple/callback',
    clientSecret: clientSecret
};
*/

// doc to login apple = https://www.npmjs.com/package/apple-signin-auth