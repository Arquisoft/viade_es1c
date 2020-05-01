package gatling_viade_es1c

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class visualize1user extends Simulation {

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
		"Access-Control-Request-Headers" -> "content-type",
		"Access-Control-Request-Method" -> "POST",
		"Origin" -> "https://solid.github.io")

	val headers_11 = Map(
		"Accept-Encoding" -> "gzip, deflate, br",
		"Origin" -> "https://solid.github.io",
		"content-type" -> "application/json")

	val headers_14 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Accept-Encoding" -> "gzip, deflate, br",
		"Origin" -> "https://solid.community",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_15 = Map("Accept" -> "image/webp,*/*")

	val headers_21 = Map(
		"Accept" -> "application/n-quads,application/trig;q=0.95,application/ld+json;q=0.9,application/n-triples;q=0.8,text/turtle;q=0.5,*/*;q=0.1",
		"Accept-Encoding" -> "gzip, deflate, br",
		"Origin" -> "http://localhost:3000")

	val headers_22 = Map(
		"Accept" -> "text/turtle",
		"Accept-Encoding" -> "gzip, deflate, br",
		"Origin" -> "http://localhost:3000")

	val headers_23 = Map(
		"Accept" -> "application/font-woff2;q=1.0,application/font-woff;q=0.9,*/*;q=0.8",
		"Accept-Encoding" -> "identity")

	val headers_24 = Map(
		"Accept-Encoding" -> "gzip, deflate, br",
		"Origin" -> "http://localhost:3000")

    val uri1 = "https://uo265379.solid.community"
    val uri3 = "https://solid.community"
    val uri4 = "https://solid.github.io/solid-auth-client/dist/popup.html"

	val scn = scenario("visualize1user")
		.exec(http("request_0")
			.get("/")
			.headers(headers_0))
		.pause(2)
		.exec(http("request_1")
			.get("/locales/en/translation.json")
			.headers(headers_1)
			.resources(http("request_2")
			.get("/sockjs-node/info?t=1588331962988"),
            http("request_3")
			.get("/locales/es/translation.json")
			.headers(headers_1),
            http("request_4")
			.get("/sockjs-node/iframe.html")
			.headers(headers_0)))
		.pause(1)
		.exec(http("request_5")
			.post("/sockjs-node/186/jlwdp2at/xhr?t=1588331965030")
			.headers(headers_5)
			.resources(http("request_6")
			.post("/sockjs-node/186/jlwdp2at/xhr?t=1588331965039")
			.headers(headers_5)))
		.pause(2)
		.exec(http("request_7")
			.get(uri4)
			.headers(headers_7))
		.pause(2)
		.exec(http("request_8")
			.get(uri3 + "/.well-known/openid-configuration")
			.headers(headers_8)
			.resources(http("request_9")
			.get(uri3 + "/jwks")
			.headers(headers_8),
            http("request_10")
			.options(uri3 + "/register")
			.headers(headers_10),
            http("request_11")
			.post(uri3 + "/register")
			.headers(headers_11)
			.body(RawFileBody("gatling_viade_es1c/visualize1user/0011_request.json")),
            http("request_12")
			.get(uri3 + "/authorize?scope=openid&client_id=75897c1e69b8659dabf4e5ac3dd6e334&response_type=id_token%20token&request=eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwczovL3NvbGlkLmdpdGh1Yi5pby9zb2xpZC1hdXRoLWNsaWVudC9kaXN0L3BvcHVwLmh0bWwiLCJkaXNwbGF5IjoicGFnZSIsIm5vbmNlIjoiQUhSc2lVaUZsVVBOaHpzc0hRWFpmTi1qSkVVd2Z2LTVRclhLY0ZqVHJyVSIsImtleSI6eyJhbGciOiJSUzI1NiIsImUiOiJBUUFCIiwiZXh0Ijp0cnVlLCJrZXlfb3BzIjpbInZlcmlmeSJdLCJrdHkiOiJSU0EiLCJuIjoiM0I3V0NPdTZmQmw2QTYtUi01MUljMTRlNlVjd0ZKZzZIWU1KUEdoYks4aEVVNTBZU2ZtaXgyODBrSXZjZW4tYmRQcnkyT1VBX0REUHdJZkpOaHo0RlFpTFR2OEtYMVlqN3g4dkpqWHhXM1NLSkk3dk1RbGJiZEM2MFpGbUFTSUpkV3hyQ0hFZDY4NmFIZ3ZsRmxBTm5qU29CZVd6TlduMnUweFk4ODRzbTBkcWlXd214MlBlOUEwOXBFLTVjb1RsQVV5MFJmYzc1V3Ixd05xVHNuWW95RGFEemo5MzRQMUx0WEc2ZnVJakRTd3NYY0Jvby1nMW9tOWl6QWN5TmhPamd1UTU4elhFMk9ZQlJMdkg5Q3B0Q2s2b283UURXSllFNWdBaDZtRnltaTBRN3BxUW9mYzBsOFhZVmFXeDkyakxnWG5iblExdGdHUG9od2dRc3VHakFRIn19.&state=CZeH9OmRw_rnGPBBNNRhE-4gCwuWzoNLG0zF3XX2VbA")
			.headers(headers_7),
            http("request_13")
			.post("/sockjs-node/186/jlwdp2at/xhr?t=1588331965048")
			.headers(headers_5),
            http("request_14")
			.post(uri3 + "/login/password")
			.headers(headers_14)
			.formParam("username", "UO265379")
			.formParam("password", "Viade_es1c")
			.formParam("response_type", "id_token token")
			.formParam("display", "")
			.formParam("scope", "openid")
			.formParam("client_id", "75897c1e69b8659dabf4e5ac3dd6e334")
			.formParam("redirect_uri", "https://solid.github.io/solid-auth-client/dist/popup.html")
			.formParam("state", "CZeH9OmRw_rnGPBBNNRhE-4gCwuWzoNLG0zF3XX2VbA")
			.formParam("nonce", "")
			.formParam("request", "eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwczovL3NvbGlkLmdpdGh1Yi5pby9zb2xpZC1hdXRoLWNsaWVudC9kaXN0L3BvcHVwLmh0bWwiLCJkaXNwbGF5IjoicGFnZSIsIm5vbmNlIjoiQUhSc2lVaUZsVVBOaHpzc0hRWFpmTi1qSkVVd2Z2LTVRclhLY0ZqVHJyVSIsImtleSI6eyJhbGciOiJSUzI1NiIsImUiOiJBUUFCIiwiZXh0Ijp0cnVlLCJrZXlfb3BzIjpbInZlcmlmeSJdLCJrdHkiOiJSU0EiLCJuIjoiM0I3V0NPdTZmQmw2QTYtUi01MUljMTRlNlVjd0ZKZzZIWU1KUEdoYks4aEVVNTBZU2ZtaXgyODBrSXZjZW4tYmRQcnkyT1VBX0REUHdJZkpOaHo0RlFpTFR2OEtYMVlqN3g4dkpqWHhXM1NLSkk3dk1RbGJiZEM2MFpGbUFTSUpkV3hyQ0hFZDY4NmFIZ3ZsRmxBTm5qU29CZVd6TlduMnUweFk4ODRzbTBkcWlXd214MlBlOUEwOXBFLTVjb1RsQVV5MFJmYzc1V3Ixd05xVHNuWW95RGFEemo5MzRQMUx0WEc2ZnVJakRTd3NYY0Jvby1nMW9tOWl6QWN5TmhPamd1UTU4elhFMk9ZQlJMdkg5Q3B0Q2s2b283UURXSllFNWdBaDZtRnltaTBRN3BxUW9mYzBsOFhZVmFXeDkyakxnWG5iblExdGdHUG9od2dRc3VHakFRIn19."),
            http("request_15")
			.get("/img/icon/share-files.svg")
			.headers(headers_15),
            http("request_16")
			.get("/img/icon/friends-icon.png")
			.headers(headers_15),
            http("request_17")
			.get("/img/icon/upload-icon.png")
			.headers(headers_15),
            http("request_18")
			.get("/img/icon/notification-icon.svg")
			.headers(headers_15),
            http("request_19")
			.get("/img/icon/download-icon.svg")
			.headers(headers_15),
            http("request_20")
			.get("/img/icon/maps-icon.png")
			.headers(headers_15),
            http("request_21")
			.get(uri1 + "/profile/card")
			.headers(headers_21)))
		.pause(8)
		.exec(http("request_22")
			.get(uri1 + "/viade/routes/")
			.headers(headers_22)
			.resources(http("request_23")
			.get("/static/media/notification.651771e1.woff")
			.headers(headers_23)))
		.pause(3)
		.exec(http("request_24")
			.get(uri1 + "/viade/routes/rutaDePrueba3.json")
			.headers(headers_24)
			.resources(http("request_25")
			.post("/sockjs-node/186/jlwdp2at/xhr?t=1588331990081")
			.headers(headers_5)))

	setUp(scn.inject(rampUsers(50) during (10 seconds))).protocols(httpProtocol)
}