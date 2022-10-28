=====================================================================
# TOOLS, PLUGINS
=====================================================================

// SLIDERS WITH SWIPER
// https://www.freakyjolly.com/ionic-slides-using-swiper-js-tutorial-by-examples/
// https://www.freakyjolly.com/ionic-swiper-slider-with-custom-arrows-tutorial/
// https://ionicframework.com/docs/angular/slides

// ION-CARD 
// https://www.positronx.io/ionic-card-component-example/

// ZOOM
// https://www.npmjs.com/package/ngx-pinch-zoom
// http://ivylab.space/pinch-zoom
// https://devdactic.com/ionic-image-zoom-guide/

// innerHTML
// https://www.digitalocean.com/community/tutorials/angular-innerhtml-binding-angular

// DESIGN FONT
// Material Design Font zmdi
// <ion-icon class="zmdi zmdi-accounts"></ion-icon>
// https://zavoloklom.github.io/material-design-iconic-font/icons.html

// CSS VARIABLE CHANGE WITH JAVASCRIPT
// https://www.w3schools.com/css/css3_variables_javascript.asp
// https://github.com/MTobisch/ngx-dynamic-hooks
	document.documentElement.style.setProperty('--font-size-p', '0.9rem');

// ASYNC - AWAIT
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await

// ION-SELECT
// https://ionicframework.com/docs/api/select

=====================================================================
# BUILD / DEPLOY
=====================================================================

ionic build --prod
cd ..
firebase deploy --only hosting:tuthien-nt

=====================================================================
# APP.JSON
=====================================================================

"side_menu": { "logo", "name", "website" },
"topics": [
	{ "type", 
		"menu": { "label", 
							"text", 
							"icon"
						},
		"title":  { "text"
						  },
		"tabs": [
			{ "type", 
					"header": { "label",
											"text",
											"icon": { "zmdi",
																"color" 
															}
										},
					"content": [
						{ "card":	{ "heading":  {	"align", 
																			"date", 
																			"text": { "label", "color" },
																			"icon": {"zmdi", "color" } 
																		},
												"items": [
														{	"text": { "label", "color", "align", "bullet", 
																				"icon": { "zmdi", "color" },
																				"paras": []
																			},
														{ "image":  { "src": [] 
																				}
												]
											}
							}
						]
				}
		]
	}
]
