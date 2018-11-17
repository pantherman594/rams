loginState = updateLoginState();

function updateNav() {
  loginState = getLoginState();
  $('.login-form input').val('');
  if (loginState.isLoggedIn === true && loginState.role === 'parent') {
    $('#nav-auth').text("Logout");
    $('#nav-user').text(`Hi, ${loginState.name}`).css('display', 'initial');
    $('.login').css('display', 'none');

    $('.nav-left').append('<div class="item">' + 
      '<a href="/permissions/" id="nav-permissions" class="active">Permissions</a>' +
      '</div>');
    $('.parent').css('display', 'inherit');
  } else {
    if (loginState.isLoggedIn !== true) {
      logout();
    }
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
  'grades-ymca': false,
  'grades-boysgirls': false,
};

for (let i = 0; i < cookiePerms.length; i++) {
  perms[cookiePerms[i]] = true;
  $(`input[name=${cookiePerms[i]}]`)[0].checked = true;
}

$('input[type=checkbox]').on('click', (e) => {
  perms[e.target.name] = e.target.checked;
  savePerms();
});

function savePerms() {
  let keys = Object.keys(perms);
  let permString = '';
  for (let i = 0; i < keys.length; i++) {
    if (perms[keys[i]] === true) {
      permString += ',' + keys[i];
    }
  }
  setCookie('perms', permString.substring(1));
}
