package gatling_viade_es1c

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class sharefriend1user extends Simulation {

	val httpProtocol = http
		.baseUrl("http://localhost:3000")
		.inferHtmlResources(BlackList(""".*\.js""", """.*\.css""", """.*\.ico""", """.*\.jpg""", """.*\.jpeg"""), WhiteList())
		.acceptHeader("*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0")

	val headers_0 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Accept-Encoding" -> "gzip, deflate",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_1 = Map(
		"Accept-Encoding" -> "gzip, deflate",
		"X-Requested-With" -> "XMLHttpRequest")

	val headers_3 = Map("Accept-Encoding" -> "gzip, deflate")

	val headers_5 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_6 = Map(
		"Accept-Encoding" -> "gzip, deflate",
		"Origin" -> "http://localhost:3000")

	val headers_8 = Map("Origin" -> "https://solid.github.io")

	val headers_10 = Map(
		"Origin" -> "https://solid.github.io",
		"content-type" -> "application/json")

	val headers_12 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Origin" -> "https://solid.community",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_13 = Map(
		"Accept" -> "image/webp,*/*",
		"Accept-Encoding" -> "gzip, deflate")

	val headers_19 = Map(
		"Accept" -> "application/n-quads,application/trig;q=0.95,application/ld+json;q=0.9,application/n-triples;q=0.8,text/turtle;q=0.5,*/*;q=0.1",
		"Origin" -> "http://localhost:3000")

	val headers_20 = Map(
		"Accept" -> "text/turtle",
		"Origin" -> "http://localhost:3000")

	val headers_23 = Map("Origin" -> "http://localhost:3000")

	val headers_24 = Map(
		"Access-Control-Request-Headers" -> "content-type,link,slug",
		"Access-Control-Request-Method" -> "PUT",
		"Origin" -> "http://localhost:3000")

	val headers_25 = Map(
		"Content-Type" -> "text/turtle",
		"Origin" -> "http://localhost:3000",
		"link" -> """<http://www.w3.org/ns/ldp#Resource>; rel="type"""",
		"slug" -> "rutaDePrueba3.json")

	val headers_26 = Map(
		"Access-Control-Request-Headers" -> "authorization,content-type,link,slug",
		"Access-Control-Request-Method" -> "PUT",
		"Origin" -> "http://localhost:3000")

	val headers_27 = Map(
		"Content-Type" -> "text/turtle",
		"Origin" -> "http://localhost:3000",
		"authorization" -> "Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJjMTU3ZGFlZjQ5MTk3NzhiNzYyMGM2ZTJhODMxNDc3OSIsImF1ZCI6Imh0dHBzOi8vdW8yNjUzNzkuc29saWQuY29tbXVuaXR5IiwiZXhwIjoxNTg4MzM2NTg0LCJpYXQiOjE1ODgzMzI5ODQsImlkX3Rva2VuIjoiZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNkltMDJhR1JyU25SNVFVcE5JbjAuZXlKcGMzTWlPaUpvZEhSd2N6b3ZMM052Ykdsa0xtTnZiVzExYm1sMGVTSXNJbk4xWWlJNkltaDBkSEJ6T2k4dmRXOHlOalV6TnprdWMyOXNhV1F1WTI5dGJYVnVhWFI1TDNCeWIyWnBiR1V2WTJGeVpDTnRaU0lzSW1GMVpDSTZJbU14TlRka1lXVm1ORGt4T1RjM09HSTNOakl3WXpabE1tRTRNekUwTnpjNUlpd2laWGh3SWpveE5UZzVOVFF5TlRVNUxDSnBZWFFpT2pFMU9EZ3pNekk1TlRrc0ltcDBhU0k2SWpKalpUUmlOV0ZsWVRZd05tRmpNR1FpTENKdWIyNWpaU0k2SW1RM1FtaG1aRXBxY0VNNGFtazVRbnBYZGpWME5uRTRXWEJrU0RoQk1VbFFlWFpLT0dwYWNFNU9aWGNpTENKaGVuQWlPaUpqTVRVM1pHRmxaalE1TVRrM056aGlOell5TUdNMlpUSmhPRE14TkRjM09TSXNJbU51WmlJNmV5SnFkMnNpT25zaVlXeG5Jam9pVWxNeU5UWWlMQ0psSWpvaVFWRkJRaUlzSW1WNGRDSTZkSEoxWlN3aWEyVjVYMjl3Y3lJNld5SjJaWEpwWm5raVhTd2lhM1I1SWpvaVVsTkJJaXdpYmlJNkltNVlhbUU1V1c5WU5uUjJObVYxTWpJeE5UbFRlWFZrVDJFd2FUQkpUVzFKYkdaNVpuaEJSbFJ6VEhFNU1EQXpaazVTUkRGaE1YbE9OVlJXV1VKUE9YUlRkbXhMU0ZWMFFrOXVVakJLZFZaTWMwTkZNbGh2WlZvdGRqWXdla1F3UldoR1RVbGtXWFp2UVhOSU5tWkZjSEZoTVV3M1FteDBSbkJ4V0hWNFUxTTNVV2hVYnkxeVVFTmlYMk00ZVRGVk0yRk5aVUV0UWpOdE9WQTBUVnBzYTFwbGQwSlFhMVI0VldsaGQydFNOMTk2TkVSdlJHNXVXREU0UlZacFJ6bHBkVk53UWtkVVQyUnhNRmM0VnpWRGRFWm9UbU5xV1haWk5tZFdkVjkzZGxWeVJ6TkdNbTlyWkhoNWIydGpaRmRYYTNsMVRuVjBTVlF6YWt4WVZsZEdZamQyTTFOeFNsaG5NREZGVDNKbWNVSlhhM1JMY0hkeFkyeFZSMlJpVVZKa1kyNXRZamhIWlVKamRWbFljV2xLY1dWaWRESnZMV0pKT0Zvd05UZHRjM0pzT1RWT01qWlpMVGQxWTJGaVdHZDZjRkZyY2xCWmR5SjlmU3dpWVhSZmFHRnphQ0k2SW05d2RVSkdhR0ZqVlVSeVZIWkNTRkZ0V2xwMGMzY2lmUS53WlFrS3RnQm9PTzN0TXQ3eVJoNWJHR2twSHJFMm4yV0xlN0M5dDc0SUItcmJiZkRLamkwSGs0TjZYekRiZWxCQThhSWpsaXVaU2s0d0RPekd0LUUxYU83NkNDR245TFRPVk9IWjZwSElmZE12ZWxjZTVHX1I0QkR1dlZCSlBmUzlYb0c3MmlvbHJ2TGJTRXNnZWtWUmc2UUh4ZlFOMXpycks2ZzgzQjBfbFBxUnY5MEdZWDFyS0VyZTJrV1k0cUw3Zmsxay1KeDFiNFBfU0FoX1FKQmt2azNHSWVsYmJZbEw2cU5ZSUNwamNKQnZqOEVTbTdsSTNYd1Z4c2VKMGc0ZkVXdVNTYmo2ZDUzZUxtc1FjRGdfOTV1b0I3TlRQbUlUUE9jZE5KUjlsa3JJTDhqOWNrZy1XYUpmUlNZNUpWMEFTMEV5QTV3Y2dIRC1ROUp3cm16ZVEiLCJ0b2tlbl90eXBlIjoicG9wIn0.NFkp5EF-ov3P6yDUAi4cjo9AQbtRJZ_UPLHSW5v9jg88GKKmYDx2SfAs5HwxbnjUrlWHgO8Z1ikkCJiGnfMddUrj0nL3JWE19YFHxVTUAhGoYB0jRsoTatJQ7yUZRTspz35fn5qYjH7XT2Nhn2Pid2N80dE7MCN9_dr87whZ8jdlSiHwQddtPCLCMKuDgl4Hc9ttjIma2bumxgoa5HsMvTrvJZOnCl4JLytdLj8AF9N7LYH4kaQsGcXkhx4ob7GowIXOFbRIdX8NIQ2EQavEouk7QSEMwOpHsIcfqtb44b39HfQamGw2p2DASuMUyUfveIJcAHlXupj8b5aDVNgbjA",
		"link" -> """<http://www.w3.org/ns/ldp#Resource>; rel="type"""",
		"slug" -> "rutaDePrueba3.json")

	val headers_31 = Map(
		"If-None-Match" -> """W/"2-nOO9QiTIwXgNtWtBJezz8kv3SLc"""",
		"Origin" -> "http://localhost:3000")

	val headers_32 = Map(
		"Access-Control-Request-Headers" -> "content-type,link,slug",
		"Access-Control-Request-Method" -> "POST",
		"Origin" -> "http://localhost:3000")

	val headers_33 = Map(
		"Content-Type" -> "application/json",
		"Origin" -> "http://localhost:3000",
		"link" -> """<http://www.w3.org/ns/ldp#Resource>; rel="type"""",
		"slug" -> "rutaDePrueba3")

	val headers_34 = Map(
		"Origin" -> "http://localhost:3000",
		"authorization" -> "Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJjMTU3ZGFlZjQ5MTk3NzhiNzYyMGM2ZTJhODMxNDc3OSIsImF1ZCI6Imh0dHBzOi8vdW8yNjUzNzkuc29saWQuY29tbXVuaXR5IiwiZXhwIjoxNTg4MzM2NTg2LCJpYXQiOjE1ODgzMzI5ODYsImlkX3Rva2VuIjoiZXlKaGJHY2lPaUpTVXpJMU5pSXNJbXRwWkNJNkltMDJhR1JyU25SNVFVcE5JbjAuZXlKcGMzTWlPaUpvZEhSd2N6b3ZMM052Ykdsa0xtTnZiVzExYm1sMGVTSXNJbk4xWWlJNkltaDBkSEJ6T2k4dmRXOHlOalV6TnprdWMyOXNhV1F1WTI5dGJYVnVhWFI1TDNCeWIyWnBiR1V2WTJGeVpDTnRaU0lzSW1GMVpDSTZJbU14TlRka1lXVm1ORGt4T1RjM09HSTNOakl3WXpabE1tRTRNekUwTnpjNUlpd2laWGh3SWpveE5UZzVOVFF5TlRVNUxDSnBZWFFpT2pFMU9EZ3pNekk1TlRrc0ltcDBhU0k2SWpKalpUUmlOV0ZsWVRZd05tRmpNR1FpTENKdWIyNWpaU0k2SW1RM1FtaG1aRXBxY0VNNGFtazVRbnBYZGpWME5uRTRXWEJrU0RoQk1VbFFlWFpLT0dwYWNFNU9aWGNpTENKaGVuQWlPaUpqTVRVM1pHRmxaalE1TVRrM056aGlOell5TUdNMlpUSmhPRE14TkRjM09TSXNJbU51WmlJNmV5SnFkMnNpT25zaVlXeG5Jam9pVWxNeU5UWWlMQ0psSWpvaVFWRkJRaUlzSW1WNGRDSTZkSEoxWlN3aWEyVjVYMjl3Y3lJNld5SjJaWEpwWm5raVhTd2lhM1I1SWpvaVVsTkJJaXdpYmlJNkltNVlhbUU1V1c5WU5uUjJObVYxTWpJeE5UbFRlWFZrVDJFd2FUQkpUVzFKYkdaNVpuaEJSbFJ6VEhFNU1EQXpaazVTUkRGaE1YbE9OVlJXV1VKUE9YUlRkbXhMU0ZWMFFrOXVVakJLZFZaTWMwTkZNbGh2WlZvdGRqWXdla1F3UldoR1RVbGtXWFp2UVhOSU5tWkZjSEZoTVV3M1FteDBSbkJ4V0hWNFUxTTNVV2hVYnkxeVVFTmlYMk00ZVRGVk0yRk5aVUV0UWpOdE9WQTBUVnBzYTFwbGQwSlFhMVI0VldsaGQydFNOMTk2TkVSdlJHNXVXREU0UlZacFJ6bHBkVk53UWtkVVQyUnhNRmM0VnpWRGRFWm9UbU5xV1haWk5tZFdkVjkzZGxWeVJ6TkdNbTlyWkhoNWIydGpaRmRYYTNsMVRuVjBTVlF6YWt4WVZsZEdZamQyTTFOeFNsaG5NREZGVDNKbWNVSlhhM1JMY0hkeFkyeFZSMlJpVVZKa1kyNXRZamhIWlVKamRWbFljV2xLY1dWaWRESnZMV0pKT0Zvd05UZHRjM0pzT1RWT01qWlpMVGQxWTJGaVdHZDZjRkZyY2xCWmR5SjlmU3dpWVhSZmFHRnphQ0k2SW05d2RVSkdhR0ZqVlVSeVZIWkNTRkZ0V2xwMGMzY2lmUS53WlFrS3RnQm9PTzN0TXQ3eVJoNWJHR2twSHJFMm4yV0xlN0M5dDc0SUItcmJiZkRLamkwSGs0TjZYekRiZWxCQThhSWpsaXVaU2s0d0RPekd0LUUxYU83NkNDR245TFRPVk9IWjZwSElmZE12ZWxjZTVHX1I0QkR1dlZCSlBmUzlYb0c3MmlvbHJ2TGJTRXNnZWtWUmc2UUh4ZlFOMXpycks2ZzgzQjBfbFBxUnY5MEdZWDFyS0VyZTJrV1k0cUw3Zmsxay1KeDFiNFBfU0FoX1FKQmt2azNHSWVsYmJZbEw2cU5ZSUNwamNKQnZqOEVTbTdsSTNYd1Z4c2VKMGc0ZkVXdVNTYmo2ZDUzZUxtc1FjRGdfOTV1b0I3TlRQbUlUUE9jZE5KUjlsa3JJTDhqOWNrZy1XYUpmUlNZNUpWMEFTMEV5QTV3Y2dIRC1ROUp3cm16ZVEiLCJ0b2tlbl90eXBlIjoicG9wIn0.OO-IeMRvwuOQAr7BclMz6FhuKED-fVbKZ_rZRLb8ZexnuCq8FukyZe5kvVBdNYgXk-fs3LW10hSJ8F0WO7Ez-n8uDw4t_aNXF_MuOkCtWrHzFuUg1ywwUTCwQ9LxVVJ4tC_j4Os9agaaJJv8KiXhbanJIEIgKgra6ZIwF_xJeL9Wf6Q0g9AhKZdV6_OQDLPDH8qLnAFJaBtyQwn6looB1kykoV74Zh1mbtp9nDb4VwruODxGtyqClah1WGBRmBlxlsMpFHdynF6E4Jb9sb_3zxEOKqtnwssbG5nkmDoFgNQMClBW-c1XHjuh0yt8otdMyqQt4H0Vy3rJtskO60IKaA")

	val headers_35 = Map(
		"Accept" -> "application/font-woff2;q=1.0,application/font-woff;q=0.9,*/*;q=0.8",
		"Accept-Encoding" -> "identity")

	val headers_37 = Map(
		"Access-Control-Request-Headers" -> "content-type,slug",
		"Access-Control-Request-Method" -> "POST",
		"Origin" -> "http://localhost:3000")

	val headers_38 = Map(
		"Content-Type" -> "text/turtle",
		"Origin" -> "http://localhost:3000",
		"slug" -> "1588332986586")

    val uri1 = "https://uo265308.solid.community"
    val uri3 = "https://uo265379.solid.community"
    val uri4 = "https://solid.community"
    val uri5 = "https://solid.github.io/solid-auth-client/dist/popup.html"

	val scn = scenario("sharefriend1user")
		.exec(http("request_0")
			.get("/")
			.headers(headers_0))
		.pause(3)
		.exec(http("request_1")
			.get("/locales/en/translation.json")
			.headers(headers_1)
			.resources(http("request_2")
			.get("/locales/es/translation.json")
			.headers(headers_1),
            http("request_3")
			.get("/sockjs-node/info?t=1588332943740")
			.headers(headers_3),
            http("request_4")
			.get("/sockjs-node/iframe.html")
			.headers(headers_0),
            http("request_5")
			.get(uri5)
			.headers(headers_5),
            http("request_6")
			.post("/sockjs-node/233/urqpoxvh/xhr?t=1588332946122")
			.headers(headers_6),
            http("request_7")
			.post("/sockjs-node/233/urqpoxvh/xhr?t=1588332946133")
			.headers(headers_6),
            http("request_8")
			.get(uri4 + "/.well-known/openid-configuration")
			.headers(headers_8),
            http("request_9")
			.get(uri4 + "/jwks")
			.headers(headers_8),
            http("request_10")
			.post(uri4 + "/register")
			.headers(headers_10)
			.body(RawFileBody("gatling_viade_es1c/sharefriend1user/0010_request.json")),
            http("request_11")
			.get(uri4 + "/authorize?scope=openid&client_id=c157daef4919778b7620c6e2a8314779&response_type=id_token%20token&request=eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwczovL3NvbGlkLmdpdGh1Yi5pby9zb2xpZC1hdXRoLWNsaWVudC9kaXN0L3BvcHVwLmh0bWwiLCJkaXNwbGF5IjoicGFnZSIsIm5vbmNlIjoiZDdCaGZkSmpwQzhqaTlCeld2NXQ2cThZcGRIOEExSVB5dko4alpwTk5ldyIsImtleSI6eyJhbGciOiJSUzI1NiIsImUiOiJBUUFCIiwiZXh0Ijp0cnVlLCJrZXlfb3BzIjpbInZlcmlmeSJdLCJrdHkiOiJSU0EiLCJuIjoiblhqYTlZb1g2dHY2ZXUyMjE1OVN5dWRPYTBpMElNbUlsZnlmeEFGVHNMcTkwMDNmTlJEMWExeU41VFZZQk85dFN2bEtIVXRCT25SMEp1VkxzQ0UyWG9lWi12NjB6RDBFaEZNSWRZdm9Bc0g2ZkVwcWExTDdCbHRGcHFYdXhTUzdRaFRvLXJQQ2JfYzh5MVUzYU1lQS1CM205UDRNWmxrWmV3QlBrVHhVaWF3a1I3X3o0RG9Ebm5YMThFVmlHOWl1U3BCR1RPZHEwVzhXNUN0RmhOY2pZdlk2Z1Z1X3d2VXJHM0Yyb2tkeHlva2NkV1dreXVOdXRJVDNqTFhWV0ZiN3YzU3FKWGcwMUVPcmZxQldrdEtwd3FjbFVHZGJRUmRjbm1iOEdlQmN1WVhxaUpxZWJ0Mm8tYkk4WjA1N21zcmw5NU4yNlktN3VjYWJYZ3pwUWtyUFl3In19.&state=Q0YJrlNQeaefG3i3wwqOquajrQNdHYfSi3cUAb6zg8s")
			.headers(headers_5)))
		.pause(11)
		.exec(http("request_12")
			.post(uri4 + "/login/password")
			.headers(headers_12)
			.formParam("username", "UO265379")
			.formParam("password", "Viade_es1c")
			.formParam("response_type", "id_token token")
			.formParam("display", "")
			.formParam("scope", "openid")
			.formParam("client_id", "c157daef4919778b7620c6e2a8314779")
			.formParam("redirect_uri", "https://solid.github.io/solid-auth-client/dist/popup.html")
			.formParam("state", "Q0YJrlNQeaefG3i3wwqOquajrQNdHYfSi3cUAb6zg8s")
			.formParam("nonce", "")
			.formParam("request", "eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwczovL3NvbGlkLmdpdGh1Yi5pby9zb2xpZC1hdXRoLWNsaWVudC9kaXN0L3BvcHVwLmh0bWwiLCJkaXNwbGF5IjoicGFnZSIsIm5vbmNlIjoiZDdCaGZkSmpwQzhqaTlCeld2NXQ2cThZcGRIOEExSVB5dko4alpwTk5ldyIsImtleSI6eyJhbGciOiJSUzI1NiIsImUiOiJBUUFCIiwiZXh0Ijp0cnVlLCJrZXlfb3BzIjpbInZlcmlmeSJdLCJrdHkiOiJSU0EiLCJuIjoiblhqYTlZb1g2dHY2ZXUyMjE1OVN5dWRPYTBpMElNbUlsZnlmeEFGVHNMcTkwMDNmTlJEMWExeU41VFZZQk85dFN2bEtIVXRCT25SMEp1VkxzQ0UyWG9lWi12NjB6RDBFaEZNSWRZdm9Bc0g2ZkVwcWExTDdCbHRGcHFYdXhTUzdRaFRvLXJQQ2JfYzh5MVUzYU1lQS1CM205UDRNWmxrWmV3QlBrVHhVaWF3a1I3X3o0RG9Ebm5YMThFVmlHOWl1U3BCR1RPZHEwVzhXNUN0RmhOY2pZdlk2Z1Z1X3d2VXJHM0Yyb2tkeHlva2NkV1dreXVOdXRJVDNqTFhWV0ZiN3YzU3FKWGcwMUVPcmZxQldrdEtwd3FjbFVHZGJRUmRjbm1iOEdlQmN1WVhxaUpxZWJ0Mm8tYkk4WjA1N21zcmw5NU4yNlktN3VjYWJYZ3pwUWtyUFl3In19.")
			.resources(http("request_13")
			.get("/img/icon/share-files.svg")
			.headers(headers_13),
            http("request_14")
			.get("/img/icon/maps-icon.png")
			.headers(headers_13),
            http("request_15")
			.get("/img/icon/friends-icon.png")
			.headers(headers_13),
            http("request_16")
			.get("/img/icon/upload-icon.png")
			.headers(headers_13),
            http("request_17")
			.get("/img/icon/notification-icon.svg")
			.headers(headers_13),
            http("request_18")
			.get("/img/icon/download-icon.svg")
			.headers(headers_13),
            http("request_19")
			.get(uri3 + "/profile/card")
			.headers(headers_19)))
		.pause(6)
		.exec(http("request_20")
			.get(uri3 + "/viade/routes/")
			.headers(headers_20)
			.resources(http("request_21")
			.post("/sockjs-node/233/urqpoxvh/xhr?t=1588332946143")
			.headers(headers_6)))
		.pause(12)
		.exec(http("request_22")
			.get(uri1 + "/profile/card")
			.headers(headers_19)
			.resources(http("request_23")
			.get(uri3 + "/viade/routes/rutaDePrueba3.json")
			.headers(headers_23),
            http("request_24")
			.options(uri3 + "/public/rutaDePrueba3.json")
			.headers(headers_24),
            http("request_25")
			.put(uri3 + "/public/rutaDePrueba3.json")
			.headers(headers_25)
			.body(RawFileBody("gatling_viade_es1c/sharefriend1user/0025_request.ttl"))
			.check(status.is(401)),
            http("request_26")
			.options(uri3 + "/public/rutaDePrueba3.json")
			.headers(headers_26),
            http("request_27")
			.put(uri3 + "/public/rutaDePrueba3.json")
			.headers(headers_27)
			.body(RawFileBody("gatling_viade_es1c/sharefriend1user/0027_request.ttl")),
            http("request_28")
			.head(uri1 + "/viade/shared/")
			.headers(headers_23),
            http("request_29")
			.get(uri1 + "/viade/shared/")
			.headers(headers_23),
            http("request_30")
			.head(uri1 + "/viade/shared/rutaDePrueba3.json")
			.headers(headers_23)
			.check(status.is(404)),
            http("request_31")
			.head(uri1 + "/viade/shared/")
			.headers(headers_31),
            http("request_32")
			.options(uri1 + "/viade/shared/")
			.headers(headers_32),
            http("request_33")
			.post(uri1 + "/viade/shared/")
			.headers(headers_33)
			.body(RawFileBody("gatling_viade_es1c/sharefriend1user/0033_request.json")),
            http("request_34")
			.delete(uri3 + "/public/rutaDePrueba3.json")
			.headers(headers_34),
            http("request_35")
			.get("/static/media/notification.651771e1.woff")
			.headers(headers_35),
            http("request_36")
			.get(uri1 + "/profile/card")
			.headers(headers_23),
            http("request_37")
			.options(uri1 + "/inbox/")
			.headers(headers_37),
            http("request_38")
			.post(uri1 + "/inbox/")
			.headers(headers_38)
			.body(RawFileBody("gatling_viade_es1c/sharefriend1user/0038_request.ttl"))))

	setUp(scn.inject(rampUsers(50) during (10 seconds))).protocols(httpProtocol)
}