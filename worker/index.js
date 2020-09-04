const Router = require("./router");
const Coding = require("./coding");

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false;

const TYPE_ENUM = {
  url_redirect: 1,
};
function addHttps(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = "https://" + url;
  }
  return url;
}

addEventListener("fetch", (event) => {
  try {
    event.respondWith(handleEvent(event));
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        })
      );
    }
    event.respondWith(new Response("Internal Error", { status: 500 }));
  }
});

async function handleEvent(event) {
  const request = event.request;

  const r = new Router();
  // Replace with the appropriate paths and handlers
  r.get("/encode/url-redirect", (request) =>
    encodeUrl(request, TYPE_ENUM.url_redirect)
  );
  r.get("/decode/.*", (request) => decodeUrl(request));
  r.get("/", () => new Response("Hello worker!")); // return a default message for the root route

  return await r.route(request);
}

function encodeUrl(request, type) {
  const urlObject = new URL(request.url);

  if (
    urlObject.searchParams.has("password") & urlObject.searchParams.has("url")
  ) {
    const jsonObject = {
      p: urlObject.searchParams.get("password"),
      u: urlObject.searchParams.get("url"),
      t: type,
    };
    const encodedJsonString = Coding.encode(jsonObject, SERVER_SECRET);

    return new Response(encodedJsonString);
  } else {
    return new Response("Malformed args, accepts query args: password, url", {
      status: 400,
    });
  }
}

function decodeUrl(request) {
  const urlObject = new URL(request.url);


  if (urlObject.searchParams.has("password")) {
    const password = urlObject.searchParams.get("password");    
    const encodedJsonString = decodeURI(
      urlObject.pathname.replace("/decode/", "")
    );

    const jsonObject = Coding.decode(encodedJsonString, SERVER_SECRET);
    if (jsonObject.p != password) {
      return new Response("auth error", {status:403});
    }
    const redirectUrl = addHttps(jsonObject.u)
    return Response.redirect(redirectUrl, 301);
  } else {
    return new Response("Malformed args, accepts query args: password", {
      status: 400,
    });
  }
}
