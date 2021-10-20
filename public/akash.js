/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
importScripts("idb.js");
importScripts("utility.js");

if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./sw.js",['./workbox-1ffba242'], (function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  importScripts();
  self.skipWaiting();
  workbox.clientsClaim();
  workbox.registerRoute("/", new workbox.NetworkFirst({
    "cacheName": "start-url",
    plugins: [{
      cacheWillUpdate: async ({
        request,
        response,
        event,
        state
      }) => {
        if (response && response.type === 'opaqueredirect') {
          return new Response(response.body, {
            status: 200,
            statusText: 'OK',
            headers: response.headers
          });
        }

        return response;
      }
    }]
  }), 'GET');
  workbox.registerRoute(/.*/i, new workbox.NetworkOnly({
    "cacheName": "dev",
    plugins: []
  }), 'GET');

}));
//# sourceMappingURL=sw.js.map


self.addEventListener("sync", function (event) {
  // console.log("ye apni file hai")
  event.preventDefault();
  console.log("------------- [Service Worker] Background Syncing  :)" + event);

  if (event.tag === "sync-new-profile") {
    console.log("syncing new profile");

    event.waitUntil(
      readallData("profile").then(function (data) {
        for (var dt of data) {
          const data = {
            firstname: dt.firstname,
            lastname: dt.lastname,
            address: dt.address,
            authToken: dt.authToken,
          };
          console.log(data);
          const hitUrl = "http://localhost:5000/api/update/updateDetails";
          // const authToken = cookies.get("authToken");
          const header = {
            "Content-Type": "application/json",
            authToken: authToken,
          };

          if (dt.authToken) {
            axios
              .put(hitUrl, data, {
                headers: header,
              })
              .then((response) => {
                console.log(response.data);
                if (response.data.data.success === true) {
                  deleteItem("profile", dt.authToken);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      })
    );
  }
});



///////////

self.addEventListener("sync", function (event) {
  // console.log("ye apni file hai")
  // event.preventDefault();
  console.log("------------- [Service Worker] Background Syncing  :)" + event);

  if (event.tag === "sync-new-profile") {
    console.log("syncing new profile");

    event.waitUntil(
      readallData("profile").then(function (data) {
        for (var dt of data) {
          const data = {
            firstname: dt.firstname,
            lastname: dt.lastname,
            address: dt.address,
          };
          console.log(data);
          const hitUrl = "http://localhost:5000/api/update/updateDetails";
          // const authToken = cookies.get("authToken");
          const header = {
            "Content-Type": "application/json",
            authToken: dt.authToken,
          };

          if (dt.authToken) {
            fetch(hitUrl, {
              method: "PUT",
              headers: header,
              body: JSON.stringify(data),
            })
              .then((res) => {
                console.log("res data" + res.json());
                if (res.success === true) {
                  deleteItem("profile", dt.authToken);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      })
    );
  }
});
