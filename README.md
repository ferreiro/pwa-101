# Progressive Web Applications (PWAs) 101

Welcome to a simple React application with Progressive Web Apps functionalities.

## Features

* ✅ Offline mode: It works even when you don't have internet connection.
* ✅ Add to favorite: Follow your favorite artists from the agenda.
* ✅ Local notifications: Subscribe to your favorite events, and you will be notified.

## Setup your SSL certificate

To run some PWA features we need to have a secure server.
In order to do that, just simply run:

1. $ yarn setup

```
openssl req -x509 -out ./certificates/localhost.cert -keyout ./certificates/localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

```
## How to install and develop locally?

1. Clone this repo locally: `$ git clone https://github.com/ferreiro/facebook-hackathon.git`
2. Go to the project folder and run `yarn install`
3. yarn dev => This will create two servers, one of the backend server and the other one a dev server for the react application.

* For more info check: https://timonweb.com/posts/running-expressjs-server-over-https/
* Also check: https://letsencrypt.org/docs/certificates-for-localhost/


### Hot reload

In development, all your frontend assets and app will be automatically rebuild! Also, it will automatically reload the browser! Yay.

*Note* If you do changes to the backend, you will need to manually refresh the website. Sorry guys, didn't have time to do this (and it's really late now)! haha.


## Contribute

💬 [Create a new Pull Request](https://github.com/ferreiro/pwa-101/pulls)

## Contact

If you have some doubts or want to stay in touch I'll be happy to help you out or collaborate on new projects. You can reach me here:

* **Website:** [Jorge Ferreiro](http://www.ferreiro.me)
* **Contact:** [Contact form and email](http://www.ferreiro.me/contact)

Also you can find me on:

* Twitter: [https://www.twitter.com/jgferreiro](https://www.twitter.com/jgferreiro)
* Linkedin: [https://www.linkedin.com/in/jgferreiro/](https://www.linkedin.com/in/jgferreiro/)
* Instagram: [https://www.instagram.com/jgferreiro/](https://www.instagram.com/jgferreiro/)
