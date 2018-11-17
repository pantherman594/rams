let child;

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

switch(id) {
	case '14235':
		child = {
			name: 'James',
      img: 'kid1.jpg',
			tempRisk: 0.45,
			longRisk: 0.23,
			// 0: present, 1: tardy, 2: excused, 3: unexcused
			attendance: [
				0, 0, 3, 0, 0, 1, 3, 3, 0, 0, 1, 1, 2, 0, 0, 3, 0, 0, 2, 0, 1, 0, 0, 0,
				0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0,
			],
			ymca: [
				0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1,
				0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 2, 0, 0, 0, 0, 1,
      ],
      grades: {
        Math: 87.3,
        English: 82.1,
        'Earth Science': 72.5,
        Art: 92.4,
      },
		};
		break;
	case '31262':
		child = {
			name: 'Jenny',
      img: 'kid2.jpg',
			tempRisk: 0.35,
			longRisk: 0.41,
			attendance: [
				0, 0, 0, 3, 3, 3, 1, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 1, 0, 2, 2, 0, 0,
				0, 3, 2, 3, 0, 0, 3, 0, 0, 0, 1, 2, 3, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0,
			],
			ymca: [
				0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
      ],
      grades: {
        Math: 77.1,
        English: 64.3,
        'Earth Science': 72.5,
        Art: 89.4,
      },
		};
		break;
	case '29948':
		child = {
			name: 'Joe',
      img: 'kid3.jpg',
			tempRisk: 0.15,
			longRisk: 0.31,
			attendance: [
				0, 1, 1, 0, 0, 1, 0, 3, 0, 0, 3, 0, 0, 1, 3, 0, 1, 0, 0, 0, 0, 0, 1, 0,
				0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 2, 0, 0, 0,
			],
			ymca: [
				0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
      ],
      grades: {
        Math: 97.1,
        English: 84.3,
        'Earth Science': 79.5,
        Art: 94.4,
      },
		};
		break;
}

loginState = updateLoginState();

$('.student-profile img').attr('src', '../assets/img/' + child.img);
$(`.c-${loginState.role}`).css('display', 'inherit');

if (cookies.perms === undefined) {
  setCookie('perms', 'attendance-school,attendance-organization,attendance-boysgirls,' + 
    'attendance_ymca-school,attendance_ymca-organization,grades-school');
}

let cookiePerms = cookies.perms.split(',');
let perms = {
  'attendance-school': false,
  'attendance-organization': false,
  'attendance-boysgirls': false,
  'attendance_ymca-school': false,
  'attendance_ymca-organization': false,
  'attendance_ymca-boysgirls': false,
  'grades-school': false,
  'grades-organization': false,
  'grades-boysgirls': false,
};

for (let i = 0; i < cookiePerms.length; i++) {
  perms[cookiePerms[i]] = true;
  let [ perm, role ] = cookiePerms[i].split('-');
  if (loginState.role === role) {
    $(`.p-${perm}`).show();
  }
}

function updateNav() {
  loginState = getLoginState();
  $('.login-form input').val('');
  if (loginState.isLoggedIn === true) {
    $('#nav-auth').text("Logout");
    $('#nav-user').text(`Hi, ${loginState.name}`).css('display', 'initial');
    $('.login').css('display', 'none');
    switch(loginState.role) {
      case 'parent':
        $('.nav-left').append('<div class="item">' + 
          '<a href="/permissions/" id="nav-permissions">Permissions</a>' +
          '</div>');
        $('.parent').css('display', 'inherit');
        $('.perm').show();
        break;
      case 'school':
        $('.school').css('display', 'inherit');
        break;
      case 'organization':
        $('.organization').css('display', 'inherit');
        break;
    }
  } else {
    logout();
    window.location = "/";
  }
}

updateNav();

$('#nav-auth').on('click', () => {
  let loginState = updateLoginState();

  if (loginState.isLoggedIn === true) {
    logout();
  }

  updateNav();
});

$('.name').text(child.name);
document.title = child.name + ' | RAMS';

$('.student-profile').each((i, elem) => {
  const { tempRisk, longRisk } = child;

    animateRisk(elem, 10, '#00c431', 0.999);
  if (tempRisk > longRisk) {
    animateRisk(elem, 10, 'orange', tempRisk);
    animateRisk(elem, 10, 'red', longRisk);
  } else {
    animateRisk(elem, 10, 'red', longRisk);
    animateRisk(elem, 10, 'orange', tempRisk);
  }
});

let attSvg = '<svg><g>'
const totalWidth = Math.min(window.innerWidth / 1.5, 500);
const { attendance } = child;
const attWidth = totalWidth / attendance.length;

let present = 0;
let tardy = 0;
let excused = 0;
let unexcused = 0;
for (let i = 0; i < attendance.length; i++) {
	let fill;
	switch(attendance[i]) {
		case 0:
			fill = '#00c431';
			present++;
			break;
		case 1:
			fill = '#008cff';
			tardy++;
			break;
		case 2:
			fill = '#ffa200';
			excused++;
			break;
		case 3:
			fill = 'red';
			unexcused++;
			break;
	}
	let ymcaFill = perms[`attendance_ymca-${loginState.role}`] === false || child.ymca[i] === 0 ? 'white' : '#00c431';
	attSvg += `<rect fill="${fill}" x="${i * attWidth}" y="0" width="${attWidth + 1}" height="60"></rect>`;
	attSvg += `<rect fill="${ymcaFill}" x="${i * attWidth}" y="60" width="${attWidth + 1}" height="20"></rect>`;
}
attSvg += `<text x="${totalWidth + 3}" y="35">School</text>`;
attSvg += `<text x="${totalWidth + 3}" y="75">YMCA</text>`;
attSvg += '<g></svg>';
attSvg = $(attSvg).appendTo('.attendance');
attSvg.css('width', `${totalWidth + 55}px`).css('height', '85px');

$('.attendance').append('<br />');
$('.attendance').append(`<strong>Present:</strong> ${present} days<br />`);
$('.attendance').append(`<strong>Tardy:</strong> ${tardy} days<br />`);
$('.attendance').append(`<strong>Excused Absence:</strong> ${excused} days<br />`);
$('.attendance').append(`<strong>Unexcused Absence:</strong> ${unexcused} days<br />`);

const { grades } = child;
const courses = Object.keys(grades);
const mult = window.innerWidth / 250;
for (let i = 0; i < courses.length; i++) {
  let grade = grades[courses[i]];
  $('<div>')
    .delay(0)
    .css('width', '0')
    .animate({ 'width': `${mult * grade}px` }, 700)
    .html(`${courses[i]} <strong>${grade}</strong>`)
    .appendTo('.chart');
}

function animateRisk(elem, width, color, riskPercentage) {
  const profOX = 100 + width;
  const profOY = 100 + width;
  const profRadius = 100;
  let svg = $(`<svg xmlns="http://www.w3.org/2000/svg" class="risk-border"><g><path stroke="${color}" fill="#ffffff00" stroke-width="${width}"></path></g>`).appendTo(elem);
  for (let i = 0; i <= 100; i++) {
    setTimeout(() => {
      let percentage = riskPercentage * i / 100;
      let largeArc = percentage >= 0.5 ? '1' : '0';
      let endDegree = percentage * 2 * Math.PI;
      let progRadius = profRadius + width / 2;
      let progX = profOX + progRadius * Math.sin(endDegree);
      let progY = profOY - progRadius * Math.cos(endDegree);
      $(svg).children('g').children('path').attr('d',
        `M ${profOX},${profOY - progRadius}`
        + ` A ${progRadius},${progRadius}`
        + ` 0 ${largeArc},1 ${progX},${progY}`
      );
    }, i * 15);
  }
}
