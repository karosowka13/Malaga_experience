!(function (e) {
	"use strict";
	e(window).on("load", function () {
		var o,
			a = 500;
		(o = e(".spinner-wrapper")),
			setTimeout(function () {
				o.fadeOut(a);
			}, 500);
	}),
		e(window).on("scroll load", function () {
			e(".navbar").offset().top > 20
				? e(".fixed-top").addClass("top-nav-collapse")
				: e(".fixed-top").removeClass("top-nav-collapse");
		}),
		e(function () {
			e(document).on("click", "a.page-scroll", function (o) {
				var a = e(this);
				e("html, body")
					.stop()
					.animate(
						{ scrollTop: e(a.attr("href")).offset().top },
						600,
						"easeInOutExpo"
					),
					o.preventDefault();
			});
		}),
		e(".navbar-nav li a").on("click", function (o) {
			e(this).parent().hasClass("dropdown") ||
				e(".navbar-collapse").collapse("hide");
		}),
		e("#rotating").Morphext({
			animation: "fadeIn",
			separator: ",",
			speed: 2e3,
			complete: function () {},
		});
	new Swiper(".card-slider", {
		autoplay: { delay: 4e3, disableOnInteraction: !1 },
		loop: !0,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		slidesPerView: 3,
		spaceBetween: 20,
		breakpoints: { 992: { slidesPerView: 2 }, 768: { slidesPerView: 1 } },
	});
	e(".popup-with-move-anim").magnificPopup({
		type: "inline",
		fixedContentPos: !1,
		fixedBgPos: !0,
		overflowY: "auto",
		closeBtnInside: !0,
		preloader: !1,
		midClick: !0,
		removalDelay: 300,
		mainClass: "my-mfp-slide-bottom",
	});
	var o = e(".grid").isotope({
		itemSelector: ".element-item",
		layoutMode: "fitRows",
	});
	e(".filters-button-group").on("click", "a", function () {
		var a = e(this).attr("data-filter");
		o.isotope({ filter: a });
	}),
		e(".button-group").each(function (o, a) {
			var t = e(a);
			t.on("click", "a", function () {
				t.find(".is-checked").removeClass("is-checked"),
					e(this).addClass("is-checked");
			});
		});
	var a = 0;
	function t() {
		e("#callMeForm")
			.removeClass()
			.addClass("shake animated")
			.one(
				"webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
				function () {
					e(this).removeClass();
				}
			);
	}
	function n(o, a) {
		if (o) var t = "h3 text-center tada animated";
		else t = "h3 text-center";
		e("#lmsgSubmit").removeClass().addClass(t).text(a);
	}
	function s(o, a) {
		if (o) var t = "h3 text-center tada animated";
		else t = "h3 text-center";
		e("#cmsgSubmit").removeClass().addClass(t).text(a);
	}
	function i() {
		e("#privacyForm")
			.removeClass()
			.addClass("shake animated")
			.one(
				"webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
				function () {
					e(this).removeClass();
				}
			);
	}
	function r(o, a) {
		if (o) var t = "h3 text-center tada animated";
		else t = "h3 text-center";
		e("#pmsgSubmit").removeClass().addClass(t).text(a);
	}
	e(window).scroll(function () {
		if (e("#counter").length) {
			var o = e("#counter").offset().top - window.innerHeight;
			0 == a &&
				e(window).scrollTop() > o &&
				(e(".counter-value").each(function () {
					var o = e(this),
						a = o.attr("data-count");
					e({ countNum: o.text() }).animate(
						{ countNum: a },
						{
							duration: 2e3,
							easing: "swing",
							step: function () {
								o.text(Math.floor(this.countNum));
							},
							complete: function () {
								o.text(this.countNum);
							},
						}
					);
				}),
				(a = 1));
		}
	}),
		e("input, textarea").keyup(function () {
			"" != e(this).val()
				? e(this).addClass("notEmpty")
				: e(this).removeClass("notEmpty");
		}),
		e("#callMeForm")
			.validator()
			.on("submit", function (o) {
				var a, s, i, r, l;
				o.isDefaultPrevented()
					? (t(), n(!1, "Please fill all fields!"))
					: (o.preventDefault(),
					  (a = e("#lname").val()),
					  (s = e("#lphone").val()),
					  (i = e("#lemail").val()),
					  (r = e("#lselect").val()),
					  (l = e("#lterms").val()),
					  e.ajax({
							type: "POST",
							url: "php/callmeform-process.php",
							data:
								"name=" +
								a +
								"&phone=" +
								s +
								"&email=" +
								i +
								"&select=" +
								r +
								"&terms=" +
								l,
							success: function (o) {
								"success" == o
									? (e("#callMeForm")[0].reset(),
									  n(!0, "Request Submitted!"),
									  e("input").removeClass("notEmpty"))
									: (t(), n(!1, o));
							},
					  }));
			}),
		e("#contactForm")
			.validator()
			.on("submit", function (o) {
				var a, t, n, i;
				o.isDefaultPrevented()
					? (e("#contactForm")
							.removeClass()
							.addClass("shake animated")
							.one(
								"webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
								function () {
									e(this).removeClass();
								}
							),
					  s(!1, "Please fill all fields!"))
					: (o.preventDefault(),
					  (a = e("#cname").val()),
					  (t = e("#cemail").val()),
					  (n = e("#cmessage").val()),
					  (i = e("#cterms").val()),
					  e.ajax({
							type: "POST",
							url: "php/mail.php",
							data:
								"&name=" + a + "&email=" + t + "&message=" + n + "&terms=" + i,
							success: function (e) {
								jQuery("#contactForm").html(
									"<div id='email-sent'><p>Thank you for the message.</p><p>We will reply as soon as possible. </p></div>"
								);
							},
							error: function (e) {
								alert("Sendmail failed possibly php script: " + e);
							},
					  }));
			}),
		e("#privacyForm")
			.validator()
			.on("submit", function (o) {
				var a, t, n, s;
				o.isDefaultPrevented()
					? (i(), r(!1, "Please fill all fields!"))
					: (o.preventDefault(),
					  (a = e("#pname").val()),
					  (t = e("#pemail").val()),
					  (n = e("#pselect").val()),
					  (s = e("#pterms").val()),
					  e.ajax({
							type: "POST",
							url: "php/privacyform-process.php",
							data:
								"name=" + a + "&email=" + t + "&select=" + n + "&terms=" + s,
							success: function (o) {
								"success" == o
									? (e("#privacyForm")[0].reset(),
									  r(!0, "Request Submitted!"),
									  e("input").removeClass("notEmpty"))
									: (i(), r(!1, o));
							},
					  }));
			}),
		e("body").prepend(
			'<a href="body" class="back-to-top page-scroll">Back to Top</a>'
		);
	e(window).scroll(function () {
		e(window).scrollTop() > 700
			? e("a.back-to-top").fadeIn("500")
			: e("a.back-to-top").fadeOut("500");
	}),
		e(".button, a, button").mouseup(function () {
			e(this).blur();
		});
})(jQuery);
const language = {
	eng: {
		home: "HOME",
		about: "ABOUT US",
		doo: "WHAT WE DO",
		contact: "CONTACT US",
		freewalkingtour: "FREE WALKING TOUR",
		navbarDropdown: "LANGUAGE",
		hi: "MALAGA IS ",
		rotating: "MUSEUMS, PARKS & GARDENS, MONUMENTS",
		subdescription: "Let us show you what is beneath the heart of this town",
		book: "BOOK NOW",
		about2: "ABOUT US",
		who: "WHO WE ARE",
		whodescription:
			"We are young, enthusiastic people commited to create experiences that enhance the love and passion for this wonderful city. We enjoy meeting new people from other countries so that they can know Malaga in a different and authentic way.<br><br>Our goal is to make every person, who sets his foot in Malaga, fall in love with this city.",
		whodescription2:
			'"A nonprofit organization founded on the love of history, travel and people."',
		members: "Our members will help you explore the best of Malaga.",
		discover:
			"Not only do we show the most famous places in the city, but also we lead to secret treasures of Malaga.",
		price: "The tour and the membership are based on tips.",
		questions: "FIND OUT MORE",
		what: "What do you want to see?",
		oldTown: "Old town",
		monumentos: "Archeaological centers and monuments",
		parks: "Parks and gardens",
		join1: "JOIN US",
		join2: "JOIN US",
		join3: "JOIN US",
		whattodo: "What do you want to do?",
		explore: "Explore the city",
		taste: "Taste real spanish food",
		meet: "Meet with people from all around the world",
		how: "How do you want to spend your time?",
		enjoy: "Enjoy the moments",
		knowspanish: "Get to know spanish culture and traditions",
		relax: "Relax on the beach",
		whatwedo: "WHAT WE DO",
		guidedtours: "Guided tours",
		guideddescription:
			" During our walking tour we will pass by all the most important monuments and sightseeing places in the old town. We will give very significant and interesting information about them. Regrettably, we are not going into any of them for the lack of time and extra ticket costs. The tour takes 2 hours approx",
		tourslang: "Tours in many languages",
		offerlang: "We offer tours in Spanish, English and Italian.",
		giveinfo: "Give essencial information about the city",
		giveinfodescripction:
			" In the end of the tour you will have all the essential information of what to see so you will be able to visit on your own. We will also recommend the best places to eat,try local traditional food and explore the culture of Malaga.",
		booknow: "Book now",
		meeting: "Meeting point",
		freetour: "Free tour",
		hour:
			"Malaga Free Tour is every day at 12:00 PM (noon) in Plaza de la Constitución in front of Costa Coffee. Look for a blue shirt and blue umbrella.",
		freetourdescrip: "Free walking tour with membership",
		freetourdescripp:
			"Free tour means that you can decide the price and the value of the tour when it finishes. We consider it more appropriate for guests to decide the price of the tour according to how much they liked it.",
		freetourdescrippp:
			"Walking is the perfect way to discover and explore the most interesting and crucial places of the city. You don’t have to book the tour, just come to the meeting place and join it.",
		freetourdescripppp:
			"During our free tours you will learn about the history, architecture and people of Malaga. Only those who walk Malaga can say that they really know the city and it’s no use to walk with a guidebook, it’s better to join our free tours! If you would like to have a private tour, please contact us.",
		covid19:
			"Due to the COVID-19 pandemic, guests joining our tours are welcome to wear face masks for the safety of yourselves and others around you. Please help us by following the recommended safety procedures. Where possible social distancing measures will be implemented during tours and maximum tour numbers will be in place.For the time being, our guides will greet you with a welcoming smile, rather than a hearty handshake. Stay safe!",
		contactform: "CONTACT",
		intouch: "Get In Touch Using The Form",
		message: "Your message",
		cterms: "I agree with stated",
		policy: "Privacy Policy",
		and: "and",
		terms: "Terms Conditions",
		submitbutton: "SUBMIT MESSAGE",
		seeyou: "HOPE TO SEE YOU SOON",
		come: "COME EXPERIENCE OUR WORLD WITH US",
		check: "Check also",
		freewalkingtourH2: "FREE WALKING TOUR",
	},
	es: {
		home: "HOME",
		about: "SOBRE NOSOTROS",
		doo: "QUE HACEMOS",
		contact: "CONTACTOS",
		freewalkingtour: "TOUR GRATIS A PIE",
		navbarDropdown: "IDIOMA",
		hi: "MALAGA ES ",
		rotating: "MUSEOS, PARQUES & JARDINES, MONUMENTOS",
		subdescription:
			"Déjenos mostrarle lo que hay dentro del corazón de esta ciudad",
		book: "RESERVA AHORA",
		about2: "SOBRE NOSOTROS",
		who: "QUIENES SOMOS",
		whodescription:
			"Somos gente joven y entusiasta, comprometida con la creación de experiencias que aumenten el amor y la pasión por esta maravillosa ciudad. Disfrutamos de conocer gente nueva de otros países para que conozcan Málaga de una manera diferente y auténtica.<br><br>Nuestra misión es hacer que cada persona que ponga un pie en Málaga, se enamore de esta ciudad",
		whodescription2:
			'"  Una organización sin fines de lucro basada en el amor a la historia, los viajes y la gente."',
		members: "Nuestros miembros le ayudarán a explorar lo mejor de Málaga.",
		discover:
			"No sólo mostramos los lugares más famosos de la ciudad, sino que también llevamos a los tesoros escondidos de Málaga.",
		price: "El tour y la membresía se basan en propinas.",
		questions: "Saber más",
		what: "Qué quieres ver?",
		oldTown: "Casco antiguo",
		monuments: "Restos arqueológicos y monumentos",
		parks: "Parques y jardines bellísimos",
		join1: "ÚNETE A NOSOTROS",
		join2: "ÚNETE A NOSOTROS",
		join3: "ÚNETE A NOSOTROS",
		whattodo: "¿Qué quieres hacer?",
		explore: "Explorar la ciudad",
		taste: "Probar la verdadera comida española",
		meet: "Conocer gente de todo el mundo",
		how: "¿Cómo quieres pasar tu tiempo?",
		enjoy: "Disfrutar de los momentos",
		knowspanish: "Conoce la cultura y las tradiciones españolas",
		relax: "Relajarse en la playa",
		whatwedo: "QUÉ HACEMOS",
		guidedtours: "Visitas guiadas",
		guideddescription:
			"Durante nuestras visitas guiadas vas a ver los monumentos más importante y lugares famosos en el casco antiguo. Vamos a dar informaciones muy significativas e interesantes. Por desgracia, no entraremos en ninguno de ellos por la falta de tiempo y los gastos extra sobre los billetes. El tour dura aproximadamente 2 horas",
		tourslang: "El tour es en varios idiomas",
		offerlang: "Ofrecemos visitas en Español, Inglés e Italiano.",
		giveinfo: "Damos información esencial sobre la ciudad",
		giveinfodescripction:
			"Al final te daremos todas las informaciones que necesitas para ir a visitar por tu cuenta. También recomendaremos los mejores lugares para comer, probar comida local y explorar la cultura de Málaga.",
		booknow: "Reserve ahora",
		meeting: "Sitio",
		freetour: "Tour libre",
		hour:
			"El tour libre empieza todos los días a las 12:00 PM (mediodía) en la Plaza de la Constitución en frente al Costa Coffee. Buscar la camiseta y el paraguas azul.",
		freetourdescrip: "El tour libre con la membresía",
		freetourdescripp:
			"El tour libre significa que tu decides el precio al final de la visita. Consideramos apropiado que los huéspedes decidan el precio de la visita según lo que les haya gustado.",
		freetourdescrippp:
			"Andar es la manera perfecta de descubrir y explorar los lugares más interesantes y cruciales de la ciudad. No tienes que reservar el tour, sólo tienes que venir al lugar de encuentro y sumarte.",
		freetourdescripppp:
			"Durante nuestros tours libres aprenderás sobre la historia, la arquitectura y la gente de Málaga. Sólo aquellos que caminan por Málaga pueden decir que realmente conocen la ciudad y no sirve de nada andar con un manual, ¡es mejor unirse a nuestros tours libres! Si desea un tour privado, por favor, póngase en contacto con nosotros.",
		covid19:
			"Debido a la pandemia de COVID-19, los huéspedes que se unen a nuestros tours son bienvenidos a usar máscaras faciales para su seguridad y la de los demás a su alrededor. Por favor, ayúdenos siguiendo los procedimientos de seguridad recomendados. Cuando sea posible, se implementarán medidas de distanciamiento social durante los tours y se establecerán números máximos de tours. Por el momento, nuestros guías le recibirán con una sonrisa de bienvenida, en lugar de un cordial apretón de manos. ¡Mantente seguro!",
		contactform: "CONTACTOS",
		intouch: "Contacta con nosotros a través del formulario",
		name: "Nombre",
		message: "Tu mensaje",
		cterms: "Estoy de acuerdo con lo declarado",
		policy: "Política de privacidad",
		and: "y",
		terms: "Términos y condiciones",
		submitbutton: "ENVIAR MENSAJE",
		seeyou: "ESPERAMOS VERTE PRONTO.",
		come: "VEN A EXPERIMENTAR NUESTRO MUNDO CON NOSOTROS",
		check: "Comprueba también",
		freewalkingtourH2: "TOUR GRATIS A PIE",
	},
};
if (window.location.hash && "#es" === window.location.hash)
	for (let e in language.es)
		document.getElementById(e).textContent = language.es[e];
$(window).on("hashchange", function () {
	window.location.reload(!0);
});
var message = "Function Disabled!";
function clickIE4() {
	if (2 == event.button) return !1;
}
function clickNS4(e) {
	if (
		(document.layers || (document.getElementById && !document.all)) &&
		(2 == e.which || 3 == e.which)
	)
		return !1;
}
document.layers
	? (document.captureEvents(Event.MOUSEDOWN), (document.onmousedown = clickNS4))
	: document.all &&
	  !document.getElementById &&
	  (document.onmousedown = clickIE4),
	(document.oncontextmenu = new Function("return false"));
