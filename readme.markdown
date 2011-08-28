Tracking Proxy is a service that lets you track the sites that a user navigates through, by passing all the requests through a service and transforming the responses to keep the user on that service.

This is a market research/study tool.  Don't use it to do bad things.

# js wrapper usage

There is a wrapper (`public/tproxy.js`) which should give a simple way to access the proxy.

Currently depends on the jQuery library.

### .init(serverURL)

This is how you create a link the the proxy, returns a link to that proxy (though TProxy will also act as this object too)

    TProxy.init('http://theTrackingProxyserver');

### .start(targetURL)

This gives a url which the user can visit to the tracking.  The url returned might end up directing the user to a warning page,  so this should be used rather than guessing the url from the endpoint.

    var url = TProxy.start('http://example/page.html');
    $('a.start').attr('href',url);

### .fetchURLS(callback)

Retrieves a list of the urls that a user has visited.

    TProxy.fetchURLS(function(url_list){
      console.log("Urls visited:", url_list);
    });

