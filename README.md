# PWA 101

## Setup your SSL certificate.

To run some PWA features we need to have a secure server.
In order to do that, just simply run:

1. $ yarn setup

```
openssl req -x509 -out ./certificates/localhost.cert -keyout ./certificates/localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

```

For more info check: https://timonweb.com/posts/running-expressjs-server-over-https/
Also check: https://letsencrypt.org/docs/certificates-for-localhost/

## How to install and develop locally?

1. Clone this repo locally: `$ git clone https://github.com/ferreiro/facebook-hackathon.git`
2. Go to the project folder and run `yarn install`
3. yarn dev => This will create two servers, one of the backend server and the other one a dev server for the react application.

### Hot reload

In development, all your frontend assets and app will be automatically rebuild! Also, it will automatically reload the browser! Yay.

*Note* If you do changes to the backend, you will need to manually refresh the website. Sorry guys, didn't have time to do this (and it's really late now)! haha.
