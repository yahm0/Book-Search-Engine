// Function to decode JWT
export const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('id_token');
  if (!token) return false;

  const decodedToken = decodeToken(token);
  if (!decodedToken) return false;

  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

// Function to get user data from the token
export const getUserFromToken = () => {
  const token = localStorage.getItem('id_token');
  if (!token) return null;

  return decodeToken(token);
};

// Function to log out the user
export const logout = () => {
  localStorage.removeItem('id_token');
  window.location.assign('/');
};
