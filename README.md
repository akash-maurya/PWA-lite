## PWA LITE
PWA LITE is a PWA version of food ordering app. PWA is web Application which can be installed to user devices, which gives native app like experince with vast reachablity to all types of users with different types of devices. The only necessity for pwa is to have a browser as it is web app.

This [PWA](https://developers.google.com/web/updates/2015/12/getting-started-pwa) project is built using [Next.js](https://nextjs.org/) for frontend and [Node.js](https://nodejs.org) for backend. Deployed on Vercel. This repo is only for frontend, you can find backend [here](https://github.com/akash-maurya/pwa-Backend).

1. [PWA LITE demo](#PWA LITE demo)
1. [Features](#Features)
   1. [`Installation`](#Installation)
   1. [`Login Page`](#LoginPage)
   1. [`Home Page`](#HomePage)
   1. [`Profile Page`](#ProfilePage)
   1. [`Cart`](#Cart)
1. [`Start with Code`](#Getting Started)
1. [`References`](#References)

## PWA LITE demo
This the [demo](https://licious-lite-ncvl.vercel.app/) of working pwa-lite. pwa is frontend deployed on [vercel](https://vercel.com/) and backend on [heroku](https://www.heroku.com/). this app has all features of PWA.i.e, Installable, Responsive, Offline caching, Background Sync.
## Features

# Installation
On your visit to our page you will get a popup saying "Add to Homescreen". this will install app into your device. Or you can head over to options on website and click "Add to Homescreen" option.

# Login Page
On first visit to app you will be asked to login/sign-up. you can login using mobile number and otp authentication.Your Login details will be persisted and otp is not required for further use.

# Home Page
On home page you can find the items available at the moment for serving. select the "add to cart" to add it to your cart. if an item is added to cart, a pop-up is displayed on bottom of page, shows no.of items in your cart. At the bottom of home page you can find contact deatils of company.

# Profile Page
In profile page you should fill or update your personal details and address. Address is an essential for delivering your order. Details can also be updated offline using service worker.

# Cart
you can headover to cart. check the items and proceed to checkout your order. Order is placed if and only if address is available in your details.
If order is accepted, you can see a success page.

## Getting Started
clone the repo and run "npm install" in terminal.
```bash
npm install
```

After installing required pakages run "npm run dev" to start server on dev environment.

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. We use service workers so, Clear site data in 3000 port if there are any service workers installed. you can clear site data using dev tools in chrome.


## References

To learn more follow these resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features.
- [PWA](https://web.dev/progressive-web-apps/) - Deepdive about Progressive Web Apps.
- [Service Worker](https://developers.google.com/web/ilt/pwa/introduction-to-service-worker) - A Javascript file takesup on tasks like caching, background-sync.



