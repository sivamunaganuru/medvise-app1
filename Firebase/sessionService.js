import * as SecureStore from 'expo-secure-store';

const SESSION_INFO_KEY = 'session_info';

const parseCookieDate = (cookieDate) => {
  return new Date(cookieDate).getTime();
};

const extractCookies = (setCookieHeader) => {
  const cookies = {};
  const rawCookies = setCookieHeader.split('; ');
  rawCookies.forEach((cookie) => {
    const [key, value] = cookie.split('=');
    cookies[key] = value;
  });
  return cookies;
};

export const storeSessionInfo = async (cookieData) => {
  cookieData = extractCookies(cookieData);
  // console.log(cookieData)
  const sessionInfo = {
    sessionId: cookieData['Secure, sessionid'].split('; ')[0], // Extract session ID
    csrfToken: cookieData['csrftoken'],
    csrfExpiry: parseCookieDate(cookieData['expires']),
    sessionExpiry: new Date().getTime() + (parseInt(cookieData['Max-Age'], 10) * 1000), // Convert Max-Age to milliseconds
  };
  // console.log(JSON.stringify(sessionInfo))
  await SecureStore.setItemAsync(SESSION_INFO_KEY, JSON.stringify(sessionInfo));
  
};

export const retrieveSessionInfo = async () => {
  const sessionInfo = await SecureStore.getItemAsync(SESSION_INFO_KEY);
  return sessionInfo ? JSON.parse(sessionInfo) : null;
};

export const clearSessionInfo = async () => {
  await SecureStore.deleteItemAsync(SESSION_INFO_KEY);
};

export const verifySession = async () => {
  const sessionInfo = await retrieveSessionInfo();
  if (!sessionInfo) return false;

  const currentTime = new Date().getTime();
  if (currentTime > sessionInfo.csrfExpiry || currentTime > sessionInfo.sessionExpiry) {
    await clearSessionInfo();
    return false;
  }

  // Here, add your API call to verify the session with the backend
  // For example:
  // const response = await axios.post('/api/verify-session', { sessionId: sessionInfo.sessionId });
  // return response.data.isValid;

  return true; // Placeholder, update with actual verification logic
};
