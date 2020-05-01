package gatling_viade_es1c

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class download1user extends Simulation {

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

	val headers_4 = Map("Origin" -> "http://localhost:3000")

	val headers_6 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Accept-Encoding" -> "gzip, deflate, br",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_7 = Map(
		"Accept-Encoding" -> "gzip, deflate, br",
		"Origin" -> "https://solid.github.io")

	val headers_9 = Map(
		"Accept-Encoding" -> "gzip, deflate, br",
		"Origin" -> "https://solid.github.io",
		"content-type" -> "application/json")

	val headers_11 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Accept-Encoding" -> "gzip, deflate, br",
		"Origin" -> "https://solid.community",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_12 = Map("Accept" -> "image/webp,*/*")

	val headers_18 = Map(
		"Accept" -> "application/n-quads,application/trig;q=0.95,application/ld+json;q=0.9,application/n-triples;q=0.8,text/turtle;q=0.5,*/*;q=0.1",
		"Accept-Encoding" -> "gzip, deflate, br",
		"Origin" -> "http://localhost:3000")

	val headers_19 = Map(
		"Accept" -> "text/turtle",
		"Accept-Encoding" -> "gzip, deflate, br",
		"Origin" -> "http://localhost:3000")

	val headers_20 = Map(
		"Accept" -> "application/font-woff2;q=1.0,application/font-woff;q=0.9,*/*;q=0.8",
		"Accept-Encoding" -> "identity")

	val headers_21 = Map(
		"Accept-Encoding" -> "gzip, deflate, br",
		"Origin" -> "http://localhost:3000")

    val uri1 = "https://uo265379.solid.community"
    val uri3 = "https://solid.community"
    val uri4 = "https://solid.github.io/solid-auth-client/dist/popup.html"

	val scn = scenario("download1user")
		.exec(http("request_0")
			.get("/")
			.headers(headers_0))
		.pause(4)
		.exec(http("request_1")
			.get("/locales/es/translation.json")
			.headers(headers_1)
			.resources(http("request_2")
			.get("/sockjs-node/info?t=1588335036763"),
            http("request_3")
			.get("/sockjs-node/iframe.html")
			.headers(headers_0)))
		.pause(1)
		.exec(http("request_4")
			.post("/sockjs-node/179/y4b1f00p/xhr?t=1588335039002")
			.headers(headers_4)
			.resources(http("request_5")
			.post("/sockjs-node/179/y4b1f00p/xhr?t=1588335039011")
			.headers(headers_4),
            http("request_6")
			.get(uri4)
			.headers(headers_6)))
		.pause(1)
		.exec(http("request_7")
			.get(uri3 + "/.well-known/openid-configuration")
			.headers(headers_7)
			.resources(http("request_8")
			.get(uri3 + "/jwks")
			.headers(headers_7),
            http("request_9")
			.post(uri3 + "/register")
			.headers(headers_9)
			.body(RawFileBody("gatling_viade_es1c/download1user/0009_request.json")),
            http("request_10")
			.get(uri3 + "/authorize?scope=openid&client_id=86e4b1fea49715eac7596b4a27ec2dfe&response_type=id_token%20token&request=eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwczovL3NvbGlkLmdpdGh1Yi5pby9zb2xpZC1hdXRoLWNsaWVudC9kaXN0L3BvcHVwLmh0bWwiLCJkaXNwbGF5IjoicGFnZSIsIm5vbmNlIjoiWEtyM0FzWE1TQlM2ZlBRcHBzM0lXT0tpOUp3cklMUzVBNmdyc3dDTW5GWSIsImtleSI6eyJhbGciOiJSUzI1NiIsImUiOiJBUUFCIiwiZXh0Ijp0cnVlLCJrZXlfb3BzIjpbInZlcmlmeSJdLCJrdHkiOiJSU0EiLCJuIjoiMDVSaGpPZHUtMVp3U25hbmxRQUZZZXJqR2hlWmtwelRfa1JMTGdTbkl5cTBkOFM5bVQzdlM4NTRUM2RIM2VDQWlPZXplWGM0QW1qUWN0S0JXakVIRVk5WWdKZXpIZGNNck12bFJXelctLVBsZ2VSeDFzVkVKSkZONFN3cC12MzltNDcwc3pLXzR1VnVEeHdHTkc3bVpUcnhteGswNlpubTI4SnJQZjVQX29mTWZERjBPMjBvMTRxUzlKU0JUQTJzUVZ2MkhJbS03NzFHMTVrZTlKdndTT3ZMUDhCOS1taXZxZTdsM3B5cVdvU3pELVpOTHJiWkZfOWZtc3MyUVAtMFRXSnV1TXVjV0ZIWFVlam5DZkFCRE9KS01tMVQ4clVpSlYtdUw0Ykhwb3VvMFI3Z3hLeXBuSVlLTmxmNlpINkpGb1pPM1RHN1gxdTQ5ZjVyS0NNRlBRIn19.&state=arnjV79o5LG84HCihyBx3tDMbEPAQQ-H9loOQRb0qKI")
			.headers(headers_6)))
		.pause(6)
		.exec(http("request_11")
			.post(uri3 + "/login/password")
			.headers(headers_11)
			.formParam("username", "UO265379")
			.formParam("password", "Viade_es1c")
			.formParam("response_type", "id_token token")
			.formParam("display", "")
			.formParam("scope", "openid")
			.formParam("client_id", "86e4b1fea49715eac7596b4a27ec2dfe")
			.formParam("redirect_uri", "https://solid.github.io/solid-auth-client/dist/popup.html")
			.formParam("state", "arnjV79o5LG84HCihyBx3tDMbEPAQQ-H9loOQRb0qKI")
			.formParam("nonce", "")
			.formParam("request", "eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwczovL3NvbGlkLmdpdGh1Yi5pby9zb2xpZC1hdXRoLWNsaWVudC9kaXN0L3BvcHVwLmh0bWwiLCJkaXNwbGF5IjoicGFnZSIsIm5vbmNlIjoiWEtyM0FzWE1TQlM2ZlBRcHBzM0lXT0tpOUp3cklMUzVBNmdyc3dDTW5GWSIsImtleSI6eyJhbGciOiJSUzI1NiIsImUiOiJBUUFCIiwiZXh0Ijp0cnVlLCJrZXlfb3BzIjpbInZlcmlmeSJdLCJrdHkiOiJSU0EiLCJuIjoiMDVSaGpPZHUtMVp3U25hbmxRQUZZZXJqR2hlWmtwelRfa1JMTGdTbkl5cTBkOFM5bVQzdlM4NTRUM2RIM2VDQWlPZXplWGM0QW1qUWN0S0JXakVIRVk5WWdKZXpIZGNNck12bFJXelctLVBsZ2VSeDFzVkVKSkZONFN3cC12MzltNDcwc3pLXzR1VnVEeHdHTkc3bVpUcnhteGswNlpubTI4SnJQZjVQX29mTWZERjBPMjBvMTRxUzlKU0JUQTJzUVZ2MkhJbS03NzFHMTVrZTlKdndTT3ZMUDhCOS1taXZxZTdsM3B5cVdvU3pELVpOTHJiWkZfOWZtc3MyUVAtMFRXSnV1TXVjV0ZIWFVlam5DZkFCRE9KS01tMVQ4clVpSlYtdUw0Ykhwb3VvMFI3Z3hLeXBuSVlLTmxmNlpINkpGb1pPM1RHN1gxdTQ5ZjVyS0NNRlBRIn19.")
			.resources(http("request_12")
			.get("/img/logoViaDe.svg")
			.headers(headers_12),
            http("request_13")
			.get("/img/icon/notification-icon.svg")
			.headers(headers_12),
            http("request_14")
			.get("/img/icon/friends-icon.png")
			.headers(headers_12),
            http("request_15")
			.get("/img/icon/upload-icon.png")
			.headers(headers_12),
            http("request_16")
			.get("/img/icon/maps-icon.png")
			.headers(headers_12),
            http("request_17")
			.get("/img/icon/download-icon.svg")
			.headers(headers_12),
            http("request_18")
			.get(uri1 + "/profile/card")
			.headers(headers_18)))
		.pause(3)
		.exec(http("request_19")
			.get(uri1 + "/viade/routes/")
			.headers(headers_19)
			.resources(http("request_20")
			.get("/static/media/notification.651771e1.woff")
			.headers(headers_20)))
		.pause(4)
		.exec(http("request_21")
			.get(uri1 + "/viade/routes/rutaDePrueba3.json")
			.headers(headers_21)
			.resources(http("request_22")
			.post("/sockjs-node/179/y4b1f00p/xhr?t=1588335039025")
			.headers(headers_4)))

	setUp(scn.inject(rampUsers(50) during (10 seconds))).protocols(httpProtocol)
}