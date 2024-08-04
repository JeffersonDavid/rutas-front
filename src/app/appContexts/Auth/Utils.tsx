import { UserResponse } from '../../components/auth/dataCript';
import {CookieOptions} from './Contracts'

export const defaultUser: UserResponse = {
    id: 0,
    name: '',
    email: '',
    token: ''
};

// utils/clearCookies.ts
export const clearAllCookiesFromClient = () => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }
};


export const setCookie = (name: string, value: string, options: CookieOptions = {}) => {
    let cookieString = `${name}=${encodeURIComponent(value)};`;
  
    if (options.path) {
      cookieString += `path=${options.path};`;
    }
  
    if (options.expires) {
      cookieString += `expires=${(options.expires instanceof Date) ? options.expires.toUTCString() : options.expires};`;
    }
  
    if (options.maxAge) {
      cookieString += `max-age=${options.maxAge};`;
    }
  
    if (options.domain) {
      cookieString += `domain=${options.domain};`;
    }
  
    if (options.secure) {
      cookieString += `secure;`;
    }
  
    if (options.sameSite) {
      cookieString += `samesite=${options.sameSite};`;
    }
  
    document.cookie = cookieString;
  };


  // utils/cookies.ts
export const getCookie = (name: string): string | null => {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  };
  
  