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
	$("#js-rotating").Morphext({
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

//map
// Initialize and add the map
function initMap() {
	// The location of Uluru
	var uluru = { lat: 36.720937, lng: -4.421885 };
	// The map, centered at Uluru
	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 15,
		center: uluru,
	});
	// The marker, positioned at Uluru
	var marker = new google.maps.Marker({ position: uluru, map: map });
}

//change language script

//define language reload anchors
const language_reload = document.querySelectorAll(".language-reload");

//change text in paragraphs
const language = {
	eng: { hi: "My Malaga" },
	es: { hi: "Mi Malaga" },
};

//define language via window hash
if (window.location.hash) {
	if (window.location.hash === "#es") {
		welcome.textContent = language.es.hi;
	}
}

//define language reload onclick iteration
for (let i; i <= language_reload.length; i++) {
	language_reload[i].onclick = function () {
		location.reload(true);
	};
}

//disabled rigth clicking events
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
