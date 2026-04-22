import axios from 'axios';
import { Auth } from './Auth';
import { Tests } from './Tests';
import { Question } from './Question';
import { Attempts } from './Attempts';
import { StudentAnswers } from './StudentAnswers';
import { StudentTests } from './StudentTests';
import { TestResults } from './TestResults';
import { Answer } from './Answer';
import { Groups } from './Groups';
import { Students } from './Students';
import { tokenStorage } from '../shared/auth/tokenStorage';

const BASE_URL = import.meta.env.DEV
  ? ''  // в dev-режиме работает Vite proxy
  : 'http://62c8d468f852.vps.myjino.ru:49195';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Добавляем токен ко всем запросам
axiosInstance.interceptors.request.use((config) => {
  const token = tokenStorage.getAccess();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

class ApiClient {
  public auth = new Auth();
  public tests = new Tests();
  public question = new Question();
  public attempts = new Attempts();
  public studentAnswers = new StudentAnswers();
  public studentTests = new StudentTests();
  public testResults = new TestResults();
  public answer = new Answer();
  public groups = new Groups();
  public students = new Students();

  constructor() {
    // Подменяем внутренние инстансы Axios во всех сгенерированных классах
    // на наш единый инстанс с настроенным интерсептором для подстановки токена.
    this.auth.instance = axiosInstance;
    this.tests.instance = axiosInstance;
    this.question.instance = axiosInstance;
    this.attempts.instance = axiosInstance;
    this.studentAnswers.instance = axiosInstance;
    this.studentTests.instance = axiosInstance;
    this.testResults.instance = axiosInstance;
    this.answer.instance = axiosInstance;
    this.groups.instance = axiosInstance;
    this.students.instance = axiosInstance;
  }
}

export const apiClient = new ApiClient();
