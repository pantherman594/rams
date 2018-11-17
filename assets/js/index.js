loginState = updateLoginState();

$('#nav-home').addClass('active');
function updateNav() {
  loginState = getLoginState();
  $('.login-form input').val('');
  if (loginState.isLoggedIn === true) {
    $('#nav-auth').text("Logout");
    $('#nav-user').text(`Hi, ${loginState.name}`).css('display', 'initial');
    $('.login').css('display', 'none');
    $('#nav-permissions').remove();
    switch(loginState.role) {
      case 'parent':
        $('.nav-left').append('<div class="item">' + 
          '<a href="/permissions/" id="nav-permissions">Permissions</a>' +
          '</div>');
        $('.parent').css('display', 'inherit');
        break;
      case 'school':
        $('.school').css('display', 'inherit');
        break;
      case 'organization':
        $('.organization').css('display', 'inherit');
        break;
    }
  } else {
    $('#nav-auth').text("Guest");
    $('#nav-user').text('').css('display', 'none');
    $('.loggedin').css('display', 'none');
    $('.login').css('display', 'inherit');
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

$('#login-email, #login-password').on('keypress', (e) => {
  if (e.keyCode == 13) {
    tryLogin();
    return false;
  }
});

$('#login-button').on('click', () => {
  tryLogin();
});

function tryLogin() {
  if ($('#login-email').val() !== '' && $('#login-password').val() !== '') {
    $('#login-error').text('');
    if (login($('#login-email').val()).isLoggedIn === false) {
      $('#login-error').text('Invalid username or password');
    } else {
      updateNav();
    }
  } else {
    $('#login-error').text('Invalid username or password');
  }
}

$('.student-profile').each((i, elem) => {
  let tempRisk;
  let longRisk;

  switch(i) {
    case 0:
      tempRisk = 0.45;
      longRisk = 0.23;
      break;
    case 1:
      tempRisk = 0.35;
      longRisk = 0.41;
      break;
    case 2:
      tempRisk = 0.15;
      longRisk = 0.31;
      break;
  }

  animateRisk(elem, 10, '#00c431', 0.999);
  if (tempRisk > longRisk) {
    animateRisk(elem, 10, 'orange', tempRisk);
    animateRisk(elem, 10, 'red', longRisk);
  } else {
    animateRisk(elem, 10, 'red', longRisk);
    animateRisk(elem, 10, 'orange', tempRisk);
  }
});

function animateRisk(elem, width, color, riskPercentage) {
  const profOX = 100 + width;
  const profOY = 100 + width;
  const profRadius = 100;
  let svg = $(`<svg class="risk-border"><g><path stroke="${color}" fill="#ffffff00" stroke-width="${width}"></path></g>`).appendTo(elem);
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
