// https://usefulangle.com/post/97/nodejs-resize-image
// npm install sharp --save
// node resize

const fs = require('fs');
const sharp = require('sharp');
const image_size = require('image-size');
const jimp = require('jimp') ;
const sch = require('./schools.js');
const schools = sch.schools;
const news = sch.news;

const WIDTH = 640;
const HEIGHT = 480;

const rootFolder = 'd:/dev/charity/data';
const appFolder = 'd:/dev/charity';
const hostFolder = appFolder +'/hosting';

if (require.main === module) {

	var args = process.argv.slice(2);
	console.log('args: ', args);
	let src = args[0];
	
	if (src == 'detail') {
		console.log('processDetailHtml');
		processDetailHtml();
	} else if (src == 'list') {
		console.log('processSchoolListHtml');
		processSchoolListHtml();
	} else if (src == 'news') {
		console.log('processNewsHtml');
		processNewsHtml();
	} else if (src == 'js') {
		console.log('processMapsJs');
		processMapsJs();
	} else if (src == 'image') {
		console.log('processFiles');
		let srcFilesToCopy = processSchool();
		// wait for folder to be created, then process files
		setTimeout(() => {
			processFiles(srcFilesToCopy);
			// checkOutFiles(srcFilesToCopy);
		}, 5000);
	} else {
		console.log('Option not valid: ' + src + ' - Valid options: detail, list, news, js, image');
	}
}

function processDetailHtml() {

	const THONG_TIN = 'Thông tin';
	const HINH_ANH = 'Hình ảnh';
	const TRUOC = 'Trước';
	const SAU = 'Sau';

	for (let sid in schools) {
		let school = schools[sid];
		let info = school.info;
		let location = school.location;
		let images = school.images;

		let title = info.name + ', ' + info.description;

		let str = '\n';
		str += tab(0) + '<div class="">\n';

		str += tab(2) + '<h5 class="text-uppercase mb-4">\n';
		str += tab(4) + '<div>\n';
		str += tab(6) + '<a class="text-primary"><i class="bi bi-calendar-date me-2"></i>' + info.date + ' - </a>\n';
		str += tab(6) + '<a class="text-uppercase mb-4" style="color: black;">' + title + '</a>\n';
		str += tab(4) + '</div>\n';
		str += tab(2) + '</h5>\n';

		str += tab(2) + '<div id="map"></div>\n';

		str += tab(2) + '<p></p>\n';
		str += tab(2) + '<h5 class="text-uppercase mb-4">' + THONG_TIN + '</h5>\n';
		str += tab(2) + '<div class="service-item bg-light d-flex p-4 mb-4">\n';
		str += tab(4) + '<div>\n';
		str += tab(6) + '<img src="img/contact-icon.svg" style="width: 32px; height: 32px; margin-bottom: 12px;">\n';
		str += tab(6) + '<a class="text-primary">&emsp;<b>LIÊN HỆ - </b>\n';
		str += tab(6) + '<a style="color: black;">' + info.contact.content + '</a>\n';
		str += tab(6) + '<br>\n';
		str += tab(6) + '<img src="img/trao-qua-icon.svg" style="width: 32px; height: 32px; margin-bottom: 12px;">\n';
		str += tab(6) + '<a class="text-primary">&emsp;<b>QUÀ - </b>\n';
		str += tab(6) + '<a style="color: black;">' + info.gift + '</a>\n';
		str += tab(4) + '</div>\n';
		str += tab(2) + '</div>\n';

		str += '</div>\n';

		if (images.length > 0) {
			let ifolder = 'schools/' + sid + '/images';
			str += '<h5 class="text-uppercase">' + HINH_ANH + '</h5>\n';
			str += '<p></p>\n';
			str += '<div id="carouselExampleControls" class="carousel slide" data-ride="carousel" data-interval="5000">\n';
			str += tab(2) + '<div class="carousel-inner">\n';
			for (let i = 0; i < images.length; i++) {
				let item = images[i];
				let caption = (item.length > 1) ? item[1] : '';
				let file = ifolder + '/' +item[0].substring(item[0].lastIndexOf('/')+1);
				if (i == 0) {
					str += tab(4) + '<div class="carousel-item active item-01">\n';
				} else {
					str += tab(4) + '<div class="carousel-item item-01">\n';
				}
				str += tab(6) + '<img class="d-block w-100" src="' + file + '" alt="">\n';
				if (caption != '') {
					// remove all row divider
					caption = caption.replace('|', ' ');
					let words = caption.split(' ');
					let shortCaption = words[0].trim() + ' ' + words[1].trim() + ' ' + words[2].trim() + ' ...';
					
					// add <br>
					let fwords = [];
					for (let i = 0; i < words.length; i++) {
						if (i == 8 || i == 16 || i == 24 || i == 32)
							fwords.push('<br/>')
						fwords.push(words[i].trim())
					}
					caption = fwords.join(' ');
					str += tab(6) + '<div class="overlay-text">' + shortCaption + '\n';
					str += tab(8) + '<div class="tooltiptext">' + caption + '</div>\n';
					str += tab(6) + '</div>\n';
				}
				str += tab(4) + '</div>\n';
			}
			str += tab(2) + '</div>\n';
			str += tab(2) + '<div class="num-01" style="text-align: center; vertical-align: middle;""></div>\n';
			str += tab(2) + '<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">\n';
			str += tab(4) + '<span class="carousel-control-prev-icon" aria-hidden="true"></span>\n';
			str += tab(2) + '</a>\n';
			str += tab(2) + '<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">\n';
			str += tab(4) + '<span class="carousel-control-next-icon" aria-hidden="true"></span>\n';
			str += tab(2) + '</a>\n';
			str += '</div>\n';
		}

		// create strMap
		let link = 'detail-' + sid + '.html';
		location.name = info.name;
		location.description = info.description;
		location.date = info.date;
		location.link = link;
		let locationJSON = JSON.stringify(location, null, 2);
		let strMap = `
<script> 
const locations = [${locationJSON}]
// Initialize the map
function initMap() {
	// Create a new map instance
	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 10,
		center: {
			lat: locations[0].lat,
			lng: locations[0].lng,
		},
	});

	function addMarkers(locations) {
		locations.forEach((location) => {
			const marker = new google.maps.Marker({
				position: {
					lat: location.lat,
					lng: location.lng,
				},
				map: map,
				title: location.name,
				icon: {
					url: location.icon, // Use custom icon for each marker
					scaledSize: new google.maps.Size(location.width, location.height), // Resize icon if needed
				},
			});

			// Optional: Add an info window for each marker
			const infoWindow = new google.maps.InfoWindow({
			content: \`
					<div style="font-family: Roboto, sans-serif; line-height: 1.5;">
						<h5 style="margin: 5px 0; color: #333;">${location.name}</h5>
						<h6 style="margin: 5px 0; color: #333;">${location.description}</h6>
					</div>
				\`,
			});
			// Show info window when marker is clicked
			marker.addListener("click", () => {
				infoWindow.open(map, marker);
			});
		});
	}
	// Add markers for each location except the user's location
	addMarkers(locations);
}
</script>
<!-- Google Maps API -->
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBF295Bo3I6b8luu4P3EZ74_V_pkFRKhus&callback=initMap"
async defer></script>
`
		// read detail-template.html

		let inFile = hostFolder +'/detail-template.html';
		let outFile = hostFolder + '/detail-' + sid + '.html';
		let src = fs.readFileSync(inFile, { encoding: 'utf8', flag: 'r' });
		src = replace(src, str, '<!-- DETAILS START -->', '<!-- DETAILS END -->');
		src = replace(src, strMap, '<!-- LOCATION START -->', '<!-- LOCATION END -->');
		fs.writeFileSync(outFile, src, function(err) {
			if(err)
				console.log('ERROR - ', err);
			console.log('"processDetailHtml - File: ' + outFile + ' was saved!');
		}); 
	}
}

function processSchoolListHtml() {

	let str = '\n';
	for (var sid in schools) {
		let school = schools[sid];
		let info = school.info;
		let href = 'detail-' + sid + '.html';
		// let title = info.name + ', ' + info.description;
		let title = info.name;

		str += tab(0) + '<div class="col-lg-6">\n';
		str +=  tab(2) + '<div class="card">\n';
		str +=  tab(4) + '<div class="card-header" aria-expanded="false">\n';
		str +=  tab(6) + '<div class="d-flex">\n';
		str +=  tab(8) + '<div>\n';
		str +=  tab(10) + '<h5 class="mb-0">\n';
		str +=  tab(12) + '<button class="btn btn-link" aria-expanded="true" >\n';
		str +=  tab(14) + '<div class="d-flex mb-3">\n';
		str +=  tab(16) + '<div>\n';
		str +=  tab(18) + '<i class="bi bi-calendar-date me-2"></i>' + info.date + '\n';
		str +=  tab(18) + '<a> - </a><a href="' + href + '" class="text-uppercase" style="color: black;">' + title + '</a>\n';

		str +=  tab(16) + '</div>\n';
		str +=  tab(14) + '</div>\n';
		str +=  tab(12) + '</button>\n';
		str +=  tab(10) + '</h5>\n';
		str +=  tab(8) + '</div>\n';
		str +=  tab(6) + '</div>\n';
		str +=  tab(4) + '</div>\n';
		str +=  tab(2) + '</div>\n';
		str +=  tab(0) + '</div>\n';
	}
 	// read school-list.html
	replaceAndSave(hostFolder +'/school-list.html', str, '<!-- SCHOOLS START -->', '<!-- SCHOOLS END -->');
}

function processNewsHtml() {

	let str = '\n';
	let count = 0;

	for (var date in news) {
		count++;
		let data = news[date];

		str += '<div class="col-lg-6">\n';
		str += tab(2) + '<div class="card">\n';
		// str += tab(4) + '<div class="card-header" id="heading' + count + '">\n';
		str += tab(4) + '<div class="card-header" id="heading' + count + '" data-toggle="collapse" data-target="#collapse' + count + '" aria-expanded="false" aria-controls="collapse' + count + '">\n';
		str += tab(6) + '<div class="d-flex">\n';
		
		str += tab(8) + '<div>\n';
		str += tab(10) + '<h5 class="mb-0">\n';

		str += tab(12) + '<button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse' + count + '" aria-expanded="false" aria-controls="#collapse' + count + '">\n';
		str += tab(14) + '<div class="d-flex mb-3">\n';
		str += tab(16) + '<div class="post-day">\n';
		str += tab(18) + '<i class="bi bi-calendar-date me-2"></i>' + date + '\n';
		str += tab(18) + '<a> - </a><a class="text-uppercase" style="color: black;" >' + data.title + '</a>\n';
		str += tab(16) + '</div>\n';
		str += tab(14) + '</div>\n';
		str += tab(12) + '</button>\n';

		str += tab(10) + '</h5>\n';
		str += tab(8) + '</div>\n';
		str += tab(6) + '</div>\n';
		str += tab(4) + '</div>\n';
		
		str += tab(4) + '<div id="collapse' + count + '" class="collapse" aria-labelledby="heading' + count + '"  data-parent="#accordion">\n';
		
		str += tab(6) + '<div class="card-body">\n';
		str += tab(8) + '<div class="service-item bg-light d-flex p-4">\n';
		str += tab(10) + '<div id="container-wrap">\n';
		str += tab(12) + '<div id="floated-wrap">\n';
		str += tab(14) + '<img src="' + data.image + '" width="80" height="80"></img>\n';
		str += tab(12) + '</div>\n';
		str += tab(10) + data.content + '\n';
		str += tab(8) + '</div>\n';
		str += tab(6) + '</div>\n';

		str += tab(6) + '</div>\n';
		str += tab(4) + '</div>\n';
		str += tab(2) + '</div>\n';
		str += '</div>\n';
		str += '\n\n';
	}

	let newNews = false;
	for (var date in news) {
		// console.log('date: ', date);
		let values = date.split('/');
		let month = +values[1] - 1;
		let newsDate = new Date(values[2], month, values[0]);
		let today = new Date();
		// less than 1 month old
		newNews = (newsDate.getTime() > today.getTime() - 30 * 24 * 3600 * 1000)
		// console.log('newNews: ', newNews);
		if (newNews)
			break;
	}

	// read tin-tuc.html
	replaceAndSave(hostFolder +'/tin-tuc.html', str, '<!-- NEWS START -->', '<!-- NEWS END -->');
	if (newNews) {
		// read index.html
		let strNew = tab(4) + '<a href="tin-tuc.html" class="nav-item nav-link" style="margin-right: 20px;"><img src="img/new-icon-gif.gif" style="width: 120px;height: 120px;position: absolute;top: 20px; right: 20px"></a>\n';
		replaceAndSave(hostFolder +'/index.html', strNew, '<!-- NEW START -->', '<!-- NEW END -->');
	} else {
		replaceAndSave(hostFolder +'/index.html', '', '<!-- NEW START -->', '<!-- NEW END -->');
	}
}

function processMapsJs() {

	let locations = [];
	for (var sid in schools) {
		let link = 'detail-' + sid + '.html';
		let school = schools[sid];
		let info = school.info;
		let location = school.location;
		location.name = info.name;
    location.description = info.description;
    location.date = info.date;
		location.link = link;
		locations.push(location);
	}

	// save new maps
	let outFile = hostFolder +'/js/maps.js';
	let src = fs.readFileSync(outFile, { encoding: 'utf8', flag: 'r' });

	// search // START LOCATIONS and END LOCATIONS
	let startMarker = '// START LOCATIONS';
	let endMarker = '// END LOCATIONS';
	let idxStart = src.indexOf(startMarker) + startMarker.length;
	let idxEnd = src.indexOf(endMarker);
	src = src.substring(0, idxStart) + '\n' + JSON.stringify(locations, null, 2) + '\n' + src.substring(idxEnd);
	fs.writeFileSync(outFile, src, function(err) {
		if(err)
			console.log('ERROR - ', err);
		console.log('"processMapsJs - File: ' + outFile + ' was saved!');
	}); 
}

function processSchool() {
	let srcFilesToCopy = [];

	for (var sid in schools) {
		let school = schools[sid]
		let info = school.info;
		let images = school.images;
		// process images

		if (images.length > 0) {
			let inFolder = rootFolder + '/' + info.imageFolder;
			let outFolder = hostFolder + '/schools/' + sid + '/images';
			// console.log('inFolder, outFolder: ', inFolder, outFolder);
			if (!fs.existsSync(outFolder)) {
				console.log('outFolder not exist!: ',outFolder);
				// create folder
				fs.mkdirSync(outFolder, { recursive: true }, (err) => {
					if (err)
							return console.error(err);
					console.log('Directory created successfully!');
				});
			}
			for (let j = 0; j < images.length; j++) {
				let file = images[j][0];
				let inFile = inFolder + '/' + file;
				let outFile = outFolder + '/' + file.substring(file.lastIndexOf('/')+1);
				srcFilesToCopy.push([inFile, outFile]);
			}
		}
	}
	return srcFilesToCopy;
}

function processFiles(srcFilesToCopy) {

	let options = {
		width: WIDTH, 
		height: HEIGHT,
		fit: 'contain',
		background: { r: 255, g: 255, b: 255, alpha: 0.5 }
	}

	// create src files
	srcFilesToCopy.forEach(files => {
		let inFile = files[0];
		let outFile = files[1];
		image_size(inFile, function (err, dim) {
			// console.log('SRC: name, dim: ', inFile, dim);
			let s = sharp(inFile);
			let orientation = dim.orientation;
			let out = null;
			if (!orientation || orientation == 1) {
			 out = s.resize(options);
			} else if (orientation == 3) {
				out = s.rotate().resize(options);
			} else if (orientation == 6) {
				out = s.rotate().rotate().resize(options);
			}
			out.toFile(outFile).then(fileInfo => {
				// console.log('DES: name, fileInfo: ', outFile, fileInfo);
			})
		});
	})
}

// https://www.tutorialspoint.com/how-to-overlay-text-on-an-image-using-jimp-in-nodejs
// https://www.npmjs.com/package/jimp
// https://stackoverflow.com/questions/71213136/how-to-change-the-font-color-of-text-print-in-jimp



function tab(count) {
	return ''.padEnd(count, ' ');
}

function replace(src, strReplace, startMarker, endMarker) {
	let idxStart = src.indexOf(startMarker) + startMarker.length;
	let idxEnd = src.indexOf(endMarker);
	src = src.substring(0, idxStart) + '\n' + strReplace + '\n' + src.substring(idxEnd);
	return src;
}

function replaceAndSave(file, str, startMarker, endMarker) {
	let src = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
	src = replace(src, str, startMarker, endMarker);
	fs.writeFileSync(file, src, function(err) {
		if(err)
			console.log('ERROR - ', err);
		console.log('"processSchoolListHtml - File: ' + file + ' was saved!');
	}); 
}