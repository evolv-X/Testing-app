const ACCESS_KEY = "access_token";
const REMEMBER_KEY = "remember_me";

const getStorage = (remember: boolean): Storage => {
  return remember ? localStorage : sessionStorage;
};

export const tokenStorage = {
  setRemember(value: boolean) {
    localStorage.setItem(REMEMBER_KEY, JSON.stringify(value));
  },

  getRemember(): boolean {
    const value = localStorage.getItem(REMEMBER_KEY);
    return value ? JSON.parse(value) : false;
  },

  setAccess(token: string) {
    const remember = this.getRemember();
    const storage = getStorage(remember);

    if (remember) {
      sessionStorage.removeItem(ACCESS_KEY);
    } else {
      localStorage.removeItem(ACCESS_KEY);
    }

    storage.setItem(ACCESS_KEY, token);
  },

  getAccess(): string | null {
    return (
      localStorage.getItem(ACCESS_KEY) || sessionStorage.getItem(ACCESS_KEY)
    );
  },

  clear() {
    localStorage.removeItem(ACCESS_KEY);
    sessionStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REMEMBER_KEY);
  },
};
