let cookies = {};
let loginState = {
  isLoggedIn: 'false',
};

function getLoginState() {
  if (cookies.isLoggedIn === 'false') {
    loginState = {
      isLoggedIn: false,
    };
  } else {
    loginState = {
      isLoggedIn: true,
      role: cookies.role,
      name: cookies.name,
      id: Number(cookies.id),
    };
  }

  return loginState;
}

function updateLoginState() {
  updateCookies();

  if (cookies.isLoggedIn === undefined) {
    setCookie('isLoggedIn', 'false');
  }

  return getLoginState();
}

function login(username) {
  if (loginState.isLoggedIn === true) {
    return loginState;
  }

  switch(username) {
    case 'jimbo@hotmail.com':
      setCookie('isLoggedIn', 'true');
      setCookie('role', 'parent');
      setCookie('name', 'Jimbo');
      setCookie('id', 3774291);
      return getLoginState();
    case 'superintendent@haverhill-ps.org':
      setCookie('isLoggedIn', 'true');
      setCookie('role', 'school');
      setCookie('name', 'Margaret');
      setCookie('id', 1);
      return getLoginState();
    case 'hsmith@ymca.org':
      setCookie('isLoggedIn', 'true');
      setCookie('role', 'organization');
      setCookie('name', 'Harold');
      setCookie('id', 924);
      return getLoginState();
    default:
      setCookie('isLoggedIn', 'false');
      return getLoginState();
  }
}

function logout() {
  setCookie('isLoggedIn', 'false');
  getLoginState();
}

function setCookie(name, value) {
  cookies[name] = value;
  document.cookie = `${name}=${value};path=/`;
}

function updateCookies() {
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  cookies = {};

  for(var i = 0; i < ca.length; i++) {
    let c = ca[i];
    while(c.charAt(0) === ' ') {
      c = c.substring(1);
    }

    const cData = c.split('=');
    cookies[cData[0]] = cData[1];
  }

  return "";
}
