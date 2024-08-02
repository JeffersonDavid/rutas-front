import { UserResponse } from '../../components/auth/dataCript';
import {CookieOptions} from './Contracts'

export const storage_key = 'authToken';
export const user_data_key = 'user_data';

export const defaultUser: UserResponse = {
    id: 0,
    name: '',
    email: '',
    token: ''
};

// utils/clearCookies.ts
export const clearAllCookies = () => {
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
  