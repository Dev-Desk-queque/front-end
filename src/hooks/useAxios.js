import useLocalStorage from "./useLocalStorage";
import axios from "axios";

/**
 * @instance axiosWithAuth is the instance of axios that either contains a token or not based on localStorage.
 */
let axiosWithAuth;

/**
 * @param {string} baseURL The main url (without /api, etc.) for the backend API (ex. http://localhost:5000/)
 */
export default function useAxios(baseURL) {
  const [
    localStorageToken,
    setLocalStorageToken,
    deleteLocalStorageToken,
  ] = useLocalStorage("token", null);

  if (localStorageToken) {
    axiosWithAuth = axios.create({
      baseURL: baseURL,
      headers: { authorization: localStorageToken },
    });
  } else {
    axiosWithAuth = axios.create({ baseURL: baseURL });
  }

  /**
   * @param {string | null} newToken The new token to set. If null, removes token from localStorage and resets axios to default with baseURL
   */
  function updateToken(newToken) {
    if (!newToken) {
      deleteLocalStorageToken();
      axiosWithAuth = axios.create({ baseURL: baseURL });
    } else {
      setLocalStorageToken(newToken);
      axiosWithAuth = axios.create({
        baseURL: baseURL,
        headers: { authorization: newToken },
      });
    }
  }

  return [axiosWithAuth, updateToken];
}
