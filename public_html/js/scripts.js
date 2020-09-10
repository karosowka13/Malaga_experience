(function ($) {
	"use strict";

	/* Preloader */
	$(window).on("load", function () {
		var preloaderFadeOutTime = 500;
		function hidePreloader() {
			var preloader = $(".spinner-wrapper");
			setTimeout(function () {
				preloader.fadeOut(preloaderFadeOutTime);
			}, 500);
		}
		hidePreloader();
	});

	/* Navbar Scripts */
	// jQuery to collapse the navbar on scroll
	$(window).on("scroll load", function () {
		if ($(".navbar").offset().top > 20) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
	});

	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function () {
		$(document).on("click", "a.page-scroll", function (event) {
			var $anchor = $(this);
			$("html, body")
				.stop()
				.animate(
					{
						scrollTop: $($anchor.attr("href")).offset().top,
					},
					600,
					"easeInOutExpo"
				);
			event.preventDefault();
		});
	});

	// closes the responsive menu on menu item click
	$(".navbar-nav li a").on("click", function (event) {
		if (!$(this).parent().hasClass("dropdown"))
			$(".navbar-collapse").collapse("hide");
	});

	/* Rotating Text - Morphtext */
	$("#rotating").Morphext({
		// The [in] animation type. Refer to Animate.css for a list of available animations.
		animation: "fadeIn",
		// An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
		separator: ",",
		// The delay between the changing of each phrase in milliseconds.
		speed: 2000,
		complete: function () {
			// Called after the entrance animation is executed.
		},
	});

	/* Card Slider - Swiper */
	var cardSlider = new Swiper(".card-slider", {
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		loop: true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		slidesPerView: 3,
		spaceBetween: 20,
		breakpoints: {
			// when window is <= 992px
			992: {
				slidesPerView: 2,
			},
			// when window is <= 768px
			768: {
				slidesPerView: 1,
			},
		},
	});

	/* Lightbox - Magnific Popup */
	$(".popup-with-move-anim").magnificPopup({
		type: "inline",
		fixedContentPos: false /* keep it false to avoid html tag shift with margin-right: 17px */,
		fixedBgPos: true,
		overflowY: "auto",
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: "my-mfp-slide-bottom",
	});

	/* Filter - Isotope */
	var $grid = $(".grid").isotope({
		// options
		itemSelector: ".element-item",
		layoutMode: "fitRows",
	});

	// filter items on button click
	$(".filters-button-group").on("click", "a", function () {
		var filterValue = $(this).attr("data-filter");
		$grid.isotope({ filter: filterValue });
	});

	// change is-checked class on buttons
	$(".button-group").each(function (i, buttonGroup) {
		var $buttonGroup = $(buttonGroup);
		$buttonGroup.on("click", "a", function () {
			$buttonGroup.find(".is-checked").removeClass("is-checked");
			$(this).addClass("is-checked");
		});
	});

	/* Counter - CountTo */
	var a = 0;
	$(window).scroll(function () {
		if ($("#counter").length) {
			// checking if CountTo section exists in the page, if not it will not run the script and avoid errors
			var oTop = $("#counter").offset().top - window.innerHeight;
			if (a == 0 && $(window).scrollTop() > oTop) {
				$(".counter-value").each(function () {
					var $this = $(this),
						countTo = $this.attr("data-count");
					$({
						countNum: $this.text(),
					}).animate(
						{
							countNum: countTo,
						},
						{
							duration: 2000,
							easing: "swing",
							step: function () {
								$this.text(Math.floor(this.countNum));
							},
							complete: function () {
								$this.text(this.countNum);
								//alert('finished');
							},
						}
					);
				});
				a = 1;
			}
		}
	});

	/* Move Form Fields Label When User Types */
	// for input and textarea fields
	$("input, textarea").keyup(function () {
		if ($(this).val() != "") {
			$(this).addClass("notEmpty");
		} else {
			$(this).removeClass("notEmpty");
		}
	});

	/* Call Me Form */
	$("#callMeForm")
		.validator()
		.on("submit", function (event) {
			if (event.isDefaultPrevented()) {
				// handle the invalid form...
				lformError();
				lsubmitMSG(false, "Please fill all fields!");
			} else {
				// everything looks good!
				event.preventDefault();
				lsubmitForm();
			}
		});

	function lsubmitForm() {
		// initiate variables with form content
		var name = $("#lname").val();
		var phone = $("#lphone").val();
		var email = $("#lemail").val();
		var select = $("#lselect").val();
		var terms = $("#lterms").val();

		$.ajax({
			type: "POST",
			url: "php/callmeform-process.php",
			data:
				"name=" +
				name +
				"&phone=" +
				phone +
				"&email=" +
				email +
				"&select=" +
				select +
				"&terms=" +
				terms,
			success: function (text) {
				if (text == "success") {
					lformSuccess();
				} else {
					lformError();
					lsubmitMSG(false, text);
				}
			},
		});
	}

	function lformSuccess() {
		$("#callMeForm")[0].reset();
		lsubmitMSG(true, "Request Submitted!");
		$("input").removeClass("notEmpty"); // resets the field label after submission
	}

	function lformError() {
		$("#callMeForm")
			.removeClass()
			.addClass("shake animated")
			.one(
				"webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
				function () {
					$(this).removeClass();
				}
			);
	}

	function lsubmitMSG(valid, msg) {
		if (valid) {
			var msgClasses = "h3 text-center tada animated";
		} else {
			var msgClasses = "h3 text-center";
		}
		$("#lmsgSubmit").removeClass().addClass(msgClasses).text(msg);
	}

	/* Contact Form */
	$("#contactForm")
		.validator()
		.on("submit", function (event) {
			if (event.isDefaultPrevented()) {
				// handle the invalid form...
				cformError();
				csubmitMSG(false, "Please fill all fields!");
			} else {
				// everything looks good!
				event.preventDefault();
				csubmitForm();
			}
		});

	function csubmitForm() {
		// initiate variables with form content
		var name = $("#cname").val();
		var email = $("#cemail").val();
		var message = $("#cmessage").val();
		var terms = $("#cterms").val();
		$.ajax({
			type: "POST",
			url: "php/mail.php",
			data:
				"&name=" +
				name +
				"&email=" +
				email +
				"&message=" +
				message +
				"&terms=" +
				terms,
			success: function (phpReturnResult) {
				//alert('Success: ' + phpReturnResult);
				jQuery("#contactForm").html(
					"<div id='email-sent'><p>Thank you for the message.</p><p>We will reply as soon as possible. </p></div>"
				);
			},
			error: function (errormessage) {
				//you would not show the real error to the user - this is just to see if everything is working
				alert("Sendmail failed possibly php script: " + errormessage);
			},
		});
	}

	function cformSuccess() {
		$("#contactForm")[0].reset();
		csubmitMSG(true, "Message Submitted!");
		$("input").removeClass("notEmpty"); // resets the field label after submission
		$("textarea").removeClass("notEmpty"); // resets the field label after submission
	}

	function cformError() {
		$("#contactForm")
			.removeClass()
			.addClass("shake animated")
			.one(
				"webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
				function () {
					$(this).removeClass();
				}
			);
	}

	function csubmitMSG(valid, msg) {
		if (valid) {
			var msgClasses = "h3 text-center tada animated";
		} else {
			var msgClasses = "h3 text-center";
		}
		$("#cmsgSubmit").removeClass().addClass(msgClasses).text(msg);
	}

	/* Privacy Form */
	$("#privacyForm")
		.validator()
		.on("submit", function (event) {
			if (event.isDefaultPrevented()) {
				// handle the invalid form...
				pformError();
				psubmitMSG(false, "Please fill all fields!");
			} else {
				// everything looks good!
				event.preventDefault();
				psubmitForm();
			}
		});

	function psubmitForm() {
		// initiate variables with form content
		var name = $("#pname").val();
		var email = $("#pemail").val();
		var select = $("#pselect").val();
		var terms = $("#pterms").val();

		$.ajax({
			type: "POST",
			url: "php/privacyform-process.php",
			data:
				"name=" +
				name +
				"&email=" +
				email +
				"&select=" +
				select +
				"&terms=" +
				terms,
			success: function (text) {
				if (text == "success") {
					pformSuccess();
				} else {
					pformError();
					psubmitMSG(false, text);
				}
			},
		});
	}

	function pformSuccess() {
		$("#privacyForm")[0].reset();
		psubmitMSG(true, "Request Submitted!");
		$("input").removeClass("notEmpty"); // resets the field label after submission
	}

	function pformError() {
		$("#privacyForm")
			.removeClass()
			.addClass("shake animated")
			.one(
				"webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
				function () {
					$(this).removeClass();
				}
			);
	}

	function psubmitMSG(valid, msg) {
		if (valid) {
			var msgClasses = "h3 text-center tada animated";
		} else {
			var msgClasses = "h3 text-center";
		}
		$("#pmsgSubmit").removeClass().addClass(msgClasses).text(msg);
	}

	/* Back To Top Button */
	// create the back to top button
	$("body").prepend(
		'<a href="body" class="back-to-top page-scroll">Back to Top</a>'
	);
	var amountScrolled = 700;
	$(window).scroll(function () {
		if ($(window).scrollTop() > amountScrolled) {
			$("a.back-to-top").fadeIn("500");
		} else {
			$("a.back-to-top").fadeOut("500");
		}
	});

	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function () {
		$(this).blur();
	});
})(jQuery);

/* change language script */

//change text in paragraphs
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
	},
	es: {
		home: "HOME",
		about: "SOBRE NOSOTROS",
		doo: "QUE HACEMOS",
		contact: "CONTACTOS",
		freewalkingtour: "TOUR LIBRE A PIE",
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
	},
};

//define language via window hash
if (window.location.hash) {
	if (window.location.hash === "#es") {
		for (let id in language.es) {
			document.getElementById(id).textContent = language.es[id];
		}
	}
	// else if (window.location.hash === "#eng") {
	// 	for (let id in language.eng) {
	// 		document.getElementById(id).textContent = language.eng[id];
	// 	}
	// }
}

$(window).on("hashchange", function () {
	window.location.reload(true);
});

/* disabled rigth clicking events */
var message = "Function Disabled!";

function clickIE4() {
	if (event.button == 2) {
		return false;
	}
}
function clickNS4(e) {
	if (document.layers || (document.getElementById && !document.all)) {
		if (e.which == 2 || e.which == 3) {
			return false;
		}
	}
}
if (document.layers) {
	document.captureEvents(Event.MOUSEDOWN);
	document.onmousedown = clickNS4;
} else if (document.all && !document.getElementById) {
	document.onmousedown = clickIE4;
}
document.oncontextmenu = new Function("return false");
