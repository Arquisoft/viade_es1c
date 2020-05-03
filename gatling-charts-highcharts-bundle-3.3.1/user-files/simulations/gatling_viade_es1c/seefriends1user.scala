package gatling_viade_es1c

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class seefriends1user extends Simulation {

	val httpProtocol = http
		.baseUrl("http://localhost:3000")
		.inferHtmlResources(BlackList(""".*\.js""", """.*\.css""", """.*\.ico""", """.*\.jpg""", """.*\.jpeg"""), WhiteList())
		.acceptHeader("*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0")

	val headers_0 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_1 = Map("X-Requested-With" -> "XMLHttpRequest")

	val headers_5 = Map("Origin" -> "http://localhost:3000")

	val headers_7 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Accept-Encoding" -> "gzip, deflate, br",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_8 = Map(
		"Accept-Encoding" -> "gzip, deflate, br",
		"Origin" -> "https://solid.github.io")

	val headers_10 = Map(
		"Accept-Encoding" -> "gzip, deflate, br",
		"Origin" -> "https://solid.github.io",
		"content-type" -> "application/json")

	val headers_12 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Accept-Encoding" -> "gzip, deflate, br",
		"Origin" -> "https://solid.community",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_13 = Map("Accept" -> "image/webp,*/*")

	val headers_19 = Map(
		"Accept" -> "application/n-quads,application/trig;q=0.95,application/ld+json;q=0.9,application/n-triples;q=0.8,text/turtle;q=0.5,*/*;q=0.1",
		"Accept-Encoding" -> "gzip, deflate, br",
		"Origin" -> "http://localhost:3000")

    val uri1 = "https://uo265379.solid.community/profile/card"
    val uri3 = "https://solid.community"
    val uri4 = "https://solid.github.io/solid-auth-client/dist/popup.html"

	val scn = scenario("seefriends1user")
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
			.get("/sockjs-node/info?t=1588334076521"),
            http("request_4")
			.get("/sockjs-node/iframe.html")
			.headers(headers_0)))
		.pause(1)
		.exec(http("request_5")
			.post("/sockjs-node/821/3wkvdzue/xhr?t=1588334078817")
			.headers(headers_5)
			.resources(http("request_6")
			.post("/sockjs-node/821/3wkvdzue/xhr?t=1588334078830")
			.headers(headers_5),
            http("request_7")
			.get(uri4)
			.headers(headers_7)))
		.pause(2)
		.exec(http("request_8")
			.get(uri3 + "/.well-known/openid-configuration")
			.headers(headers_8)
			.resources(http("request_9")
			.get(uri3 + "/jwks")
			.headers(headers_8),
            http("request_10")
			.post(uri3 + "/register")
			.headers(headers_10)
			.body(RawFileBody("gatling_viade_es1c/seefriends1user/0010_request.json")),
            http("request_11")
			.get(uri3 + "/authorize?scope=openid&client_id=75996da91f3fb339e0b325fdb6f0dc40&response_type=id_token%20token&request=eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwczovL3NvbGlkLmdpdGh1Yi5pby9zb2xpZC1hdXRoLWNsaWVudC9kaXN0L3BvcHVwLmh0bWwiLCJkaXNwbGF5IjoicGFnZSIsIm5vbmNlIjoidTEyeHVVZ2I5MkhSMzh6ZFFteW40N1ptRDN2dXBKUFNwNFFVeEV0WXBfMCIsImtleSI6eyJhbGciOiJSUzI1NiIsImUiOiJBUUFCIiwiZXh0Ijp0cnVlLCJrZXlfb3BzIjpbInZlcmlmeSJdLCJrdHkiOiJSU0EiLCJuIjoidHduSEZsWV9zYW1PajVQU29uMXlpVlctTnZuRnVuMGtaX1pobXpiZFdLdjFuOV9MYjBOellvOXFOeXNJemlESnRrNWdlZHV4QlRlZ01kdmwyY0dlLUFUNFY4OHZ2YmtCZ0tSOU0wbW4wcjRybThRemR0dkhqeC04bGFnQ1k5X2V5cXN4anZGcER3LUtjNTNoekJOa1h4R2tMT0ZNYnhFMWtYNE5tVGpFZ2NKQVUySHJ1NnJvY1ptMWtORFcta1Z6YXh4b1hWbHFIQ1ctdEI0OFRQQ3Z0SThOMHV0Yk9VRGtJaEprZHRCbUZrT0FTRmg2dEhTSTdtUGZnWWVRQldqaG02My0wN1JyeUtVOEp3ZGFYME9fdFBQd2tBUHhkbWtGREJGZWJOems3ME5UMnFGVm0tdXRSNEFfclczbDY0UnNRZ3Y0RDBFV0NvVVlpSi1FTWRRYnBRIn19.&state=UaLK-_p2uQp_M2i6A4mwTaY1BYJGF8ucb0mLEFcwgl0")
			.headers(headers_7)))
		.pause(7)
		.exec(http("request_12")
			.post(uri3 + "/login/password")
			.headers(headers_12)
			.formParam("username", "UO265379")
			.formParam("password", "Viade_es1c")
			.formParam("response_type", "id_token token")
			.formParam("display", "")
			.formParam("scope", "openid")
			.formParam("client_id", "75996da91f3fb339e0b325fdb6f0dc40")
			.formParam("redirect_uri", "https://solid.github.io/solid-auth-client/dist/popup.html")
			.formParam("state", "UaLK-_p2uQp_M2i6A4mwTaY1BYJGF8ucb0mLEFcwgl0")
			.formParam("nonce", "")
			.formParam("request", "eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwczovL3NvbGlkLmdpdGh1Yi5pby9zb2xpZC1hdXRoLWNsaWVudC9kaXN0L3BvcHVwLmh0bWwiLCJkaXNwbGF5IjoicGFnZSIsIm5vbmNlIjoidTEyeHVVZ2I5MkhSMzh6ZFFteW40N1ptRDN2dXBKUFNwNFFVeEV0WXBfMCIsImtleSI6eyJhbGciOiJSUzI1NiIsImUiOiJBUUFCIiwiZXh0Ijp0cnVlLCJrZXlfb3BzIjpbInZlcmlmeSJdLCJrdHkiOiJSU0EiLCJuIjoidHduSEZsWV9zYW1PajVQU29uMXlpVlctTnZuRnVuMGtaX1pobXpiZFdLdjFuOV9MYjBOellvOXFOeXNJemlESnRrNWdlZHV4QlRlZ01kdmwyY0dlLUFUNFY4OHZ2YmtCZ0tSOU0wbW4wcjRybThRemR0dkhqeC04bGFnQ1k5X2V5cXN4anZGcER3LUtjNTNoekJOa1h4R2tMT0ZNYnhFMWtYNE5tVGpFZ2NKQVUySHJ1NnJvY1ptMWtORFcta1Z6YXh4b1hWbHFIQ1ctdEI0OFRQQ3Z0SThOMHV0Yk9VRGtJaEprZHRCbUZrT0FTRmg2dEhTSTdtUGZnWWVRQldqaG02My0wN1JyeUtVOEp3ZGFYME9fdFBQd2tBUHhkbWtGREJGZWJOems3ME5UMnFGVm0tdXRSNEFfclczbDY0UnNRZ3Y0RDBFV0NvVVlpSi1FTWRRYnBRIn19.")
			.resources(http("request_13")
			.get("/img/icon/notification-icon.svg")
			.headers(headers_13),
            http("request_14")
			.get("/img/logoViaDe.svg")
			.headers(headers_13),
            http("request_15")
			.get("/img/icon/upload-icon.png")
			.headers(headers_13),
            http("request_16")
			.get("/img/icon/share-files.svg")
			.headers(headers_13),
            http("request_17")
			.get("/img/icon/download-icon.svg")
			.headers(headers_13),
            http("request_18")
			.get("/img/icon/maps-icon.png")
			.headers(headers_13),
            http("request_19")
			.get(uri1)
			.headers(headers_19),
            http("request_20")
			.post("/sockjs-node/821/3wkvdzue/xhr?t=1588334078847")
			.headers(headers_5)))

	setUp(scn.inject(rampUsers(50) during (10 seconds))).protocols(httpProtocol)
}