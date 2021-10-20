// var refreshing;
// navigator.serviceWorker.addEventListener("controllerchange", function () {
//   if (refreshing) return;
//   refreshing = true;
//   window.location.reload();
// });
importScripts('idb.js');
importScripts('utility.js');


self.addEventListener("install", function (event) {
  console.log("[Service Worker] Installing Service Worker ...", event);
  self.skipWaiting();
});




self.addEventListener("activate", function (event) {
  console.log("[Service Worker] Activating Service Worker ....", event);
  return self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      } else {
        return fetch(event.request).then(function (res) {
          return caches.open("dynamic").then(function (cache) {
            // console.log(event.request.url);
            if (
              event.request.url !==
                "http://localhost:5000/api/update/getdetails" ||
              event.request.url !==
                "http://localhost:3000/checkout"
            ) {
              cache.put(event.request.url, res.clone());
            }
             return res;
          });
        });
      }
    })
  );
});

self.addEventListener("sync", function (event) {
  console.log("  [Service Worker] Background Syncing  :)" + event);

  if (event.tag === "sync-new-profile") {
    console.log("syncing new profile");

    event.waitUntil(
      readallData("profile").then(function (data) {
        for (var dt of data) {
          const data = {
            "firstname": dt.firstname,
            "lastname": dt.lastname,
            "address": dt.address,
          };
          console.log(data);
          const hitUrl = "http://localhost:5000/api/update/updateDetails";
          // const authToken = cookies.get("authToken");
          const header = {
            "Content-Type": "application/json",
            "authToken": dt.authToken,
          };

          if (dt.authToken) {
            fetch(hitUrl, {
              method: "PUT",
              headers: header,
              body: JSON.stringify(data),
            })
            .then((res) => {
                console.log("res data" + res.json());
                
                  deleteItem("profile", dt.authToken);
                
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
