# hemli.buro.earth

something hemli ;-)


## usage

### create a password protected redirect url

in this example we want to create an encrypted url that when visited together with a correct password in *query param* it will redirect to a secret url.

we need the following query args to do so:

* url: the url of the target site we want to redirect to
* password: the password that is used to authenticate whether you are allowed to be redirected

the complete url is: `https://hemli-buro-earth.sloev.workers.dev/encode/url-redirect?password=lolcat&url=www.google.com`

by making a get request to that url you get a token back:
```
$ curl 'https://hemli-buro-earth.sloev.workers.dev/encode/url-redirect?password=lolcat&url=www.google.com' | pbcopy
३Ƽʣ໐r෨ҘΑޕн8ةݍҨ<0867>ဪഉʝએɥཫദصA੭ॸݶࠁuؼщϧǶಌผ
```

this token together with your password can be used to authenticate a redirect using the `/decode/{token}?password={password}` endpoint like so:

```
$ curl -vvv 'https://hemli-buro-earth.sloev.workers.dev/decode/३Ƽʣ໐r෨ҘΑޕн8ةݍҨ<0867>ဪഉʝએɥཫദصA੭ॸݶࠁuؼщϧǶಌผ?password=lolcat'
*   Trying 104.31.82.148...
* TCP_NODELAY set
* Connected to hemli-buro-earth.sloev.workers.dev (104.31.82.148) port 443 (#0)
* ALPN, offering h2
* ALPN, offering http/1.1
* successfully set certificate verify locations:
*   CAfile: /etc/ssl/cert.pem
  CApath: none
* TLSv1.2 (OUT), TLS handshake, Client hello (1):
* TLSv1.2 (IN), TLS handshake, Server hello (2):
* TLSv1.2 (IN), TLS handshake, Certificate (11):
* TLSv1.2 (IN), TLS handshake, Server key exchange (12):
* TLSv1.2 (IN), TLS handshake, Server finished (14):
* TLSv1.2 (OUT), TLS handshake, Client key exchange (16):
* TLSv1.2 (OUT), TLS change cipher, Change cipher spec (1):
* TLSv1.2 (OUT), TLS handshake, Finished (20):
* TLSv1.2 (IN), TLS change cipher, Change cipher spec (1):
* TLSv1.2 (IN), TLS handshake, Finished (20):
* SSL connection using TLSv1.2 / ECDHE-ECDSA-CHACHA20-POLY1305
* ALPN, server accepted to use h2
* Server certificate:
*  subject: C=US; ST=CA; L=San Francisco; O=Cloudflare, Inc.; CN=sni.cloudflaressl.com
*  start date: Aug 18 00:00:00 2020 GMT
*  expire date: Aug 18 12:00:00 2021 GMT
*  subjectAltName: host "hemli-buro-earth.sloev.workers.dev" matched cert's "*.sloev.workers.dev"
*  issuer: C=US; O=Cloudflare, Inc.; CN=Cloudflare Inc ECC CA-3
*  SSL certificate verify ok.
* Using HTTP2, server supports multi-use
* Connection state changed (HTTP/2 confirmed)
* Copying HTTP/2 data in stream buffer to connection buffer after upgrade: len=0
* Using Stream ID: 1 (easy handle 0x7fdc0b007400)
> GET /decode/३Ƽʣ໐r෨ҘΑޕн8ةݍҨࡧဪഉʝએɥཫദصA੭ॸݶࠁuؼщϧǶಌผ?password=lolcat HTTP/2
> Host: hemli-buro-earth.sloev.workers.dev
> User-Agent: curl/7.64.1
> Accept: */*
>
* Connection state changed (MAX_CONCURRENT_STREAMS == 256)!
< HTTP/2 301
< date: Fri, 04 Sep 2020 15:03:31 GMT
< content-length: 0
< set-cookie: __cfduid=bkbkbkbkjk; expires=Sun, 04-Oct-20 15:03:31 GMT; path=/; domain=.sloev.workers.dev; HttpOnly; SameSite=Lax
< location: https://www.google.com
< cf-request-id: adf
< expect-ct: max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"
< server: cloudflare
< cf-ray: 5cd899070805736f-CPH
<
* Connection #0 to host hemli-buro-earth.sloev.workers.dev left intact
* Closing connection 0
```

as you can see the redirect went through!


## Development

1. put an `CF_ACCOUNT_ID=YOUR ACCOUNT ID FROM CLOUDFLARE` in a `.env` file
2. run `make preview`