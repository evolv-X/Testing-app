import { makeAutoObservable, runInAction } from "mobx";
import { tokenStorage } from "../shared/auth/tokenStorage";

import type { AuthRequest } from "../api/data-contracts";

export class AuthStore {
  isAuthorized: boolean = false;
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.checkSession();
  }

  checkSession() {
    this.isAuthorized = !!tokenStorage.getAccess();
  }

  setLoading(value: boolean) {
    this.isLoading = value;
  }

  setError(error: string | null) {
    this.error = error;
  }

  setAuthorized(value: boolean) {
    this.isAuthorized = value;
  }

  async login(_data: AuthRequest, rememberMe: boolean = false) {
    this.isLoading = true;
    this.error = null;

    try {
      tokenStorage.setRemember(rememberMe);

      // --- ВРЕМЕННАЯ ЗАГЛУШКА ДЛЯ РАЗРАБОТКИ ---
      // Имитируем задержку сети
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Генерируем фейковый токен
      const fakeToken = "dummy-token-for-dev";

      runInAction(() => {
        tokenStorage.setAccess(fakeToken);
        this.isAuthorized = true;
      });

      /* 
      // ОРИГИНАЛЬНЫЙ КОД ДЛЯ РЕАЛЬНОГО БЭКЕНДА:
      const response = await apiClient.auth.authCreate(data);

      // Шаг 8.4. Извлекаем токен из ответа
      const responseData = response.data as any;
      const accessToken = responseData.accessToken || responseData.token || (typeof responseData === "string" ? responseData : null);

      if (!accessToken) {
        throw new Error("Сервер не вернул токен. Проверьте правильность логина и пароля.");
      }

      runInAction(() => {
        // Шаг 8.5. Сохраняем токен
        tokenStorage.setAccess(accessToken);
        // Шаг 8.6. Изменяем статус
      });
      */
    } catch (e: any) {
      tokenStorage.clear();

      runInAction(() => {
        this.isAuthorized = false;
        if (e.response && e.response.data) {
          const data = e.response.data;
          const detail = data.message || data.detail || data.title;
          this.error = detail || "Ошибка сервера";
        } else {
          this.error = e.message || "Ошибка авторизации";
        }
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  logout() {
    tokenStorage.clear();
    this.isAuthorized = false;
    this.error = null;
  }
}

export const authStore = new AuthStore();
