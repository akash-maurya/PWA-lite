self.addEventListener('install', function(event){

   console.log('[Service worker] installing  service worker...' ,event);
  
   
});

self.addEventListener('activate', function(event){
   console.log('[Service Worker] Activating Service Worker ...' , event);
   return self.clients.claim();
})



self.addEventListener('fetch', function(event){
  event.respondWith(
    caches.match(event.request)
    .then(function(response){
      if(response){
        return response ;
      }
      else{
        return fetch(event.request)
               .then(function(res){
                return caches.open('dynamic')
                 .then(function(cache){
                   cache.put(event.request.url, res.clone())
                   .catch(err=>{
                     console.log(err);
                   });
                   return res;
                 })
                 .catch((err)=>{
                  caches.match(event.request)
                  .then(function(respons){
                    if(response){
                      return response;
                    }
                  })
              })
          });
      }
    })
    .catch(err =>{
      console.log(err);
    })
  );
});