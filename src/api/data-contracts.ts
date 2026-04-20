/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** @format int32 */
export enum TestType {
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
}

/** @format int32 */
export enum AnswerType {
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
}

export interface AnswerResponseForStudent {
  /**
   * Идентификатор
   * @format int32
   */
  id?: number;
  /** Текст ответа */
  text?: string | null;
}

export interface AttemptReviewDto {
  /** @format int32 */
  attemptId?: number;
  /** @format int32 */
  testId?: number;
  /** @format int32 */
  score?: number;
  /** @format int32 */
  maxScore?: number;
  canShowReview?: boolean;
  items?: AttemptReviewItemDto[] | null;
}

export interface AttemptReviewItemDto {
  /** @format int32 */
  questionId?: number;
  /** @format int32 */
  answerType?: number;
  /** @format int32 */
  maxScore?: number;
  /** @format int32 */
  earned?: number;
  correctAnswerIds?: number[] | null;
  selectedAnswerIds?: number[] | null;
}

export interface AuthRequest {
  /** @minLength 1 */
  login: string;
  /** @minLength 1 */
  password: string;
}

export interface CreateAnswerRequest {
  /**
   * Текст ответа
   * @minLength 1
   */
  text: string;
  /** Флаг правильного ответа */
  isCorrect: boolean;
  /**
   * Идентификатор вопроса
   * @format int32
   */
  questionId: number;
}

/** Модель начала попытки */
export interface CreateAttemptRequest {
  /**
   * Идентификатор теста
   * @format int32
   */
  testId?: number;
}

/** Модель создания группы */
export interface CreateGroupRequest {
  /**
   * Название группы
   * @minLength 1
   * @example "КБ10"
   */
  name: string;
  /**
   * Идентификатор направления
   * @format int32
   * @example 3
   */
  directionId?: number;
  /**
   * Идентфикатор курса
   * @format int32
   * @example 5
   */
  courseId?: number;
  /**
   * Идентификатор проекта
   * @format int32
   * @example 2
   */
  projectId?: number;
}

/** Модель создания вопроса */
export interface CreateQuestionRequest {
  /** Текст вопросы */
  text?: string | null;
  /**
   * Номер вопроса в тесте
   * @format int32
   */
  number?: number;
  /** Описание вопроса */
  description?: string | null;
  answerType?: AnswerType;
  /** Оценивается ли вопрос */
  isScoring?: boolean;
  /**
   * Балл за вопрос (если оценивается)
   * @format int32
   */
  maxScore?: number | null;
  /**
   * Идентификатор теста
   * @format int32
   */
  testId?: number;
}

export interface CreateStudentAnswerRequest {
  /**
   * К какой попытке привязан выбор
   * @format int32
   */
  attemptId?: number;
  /**
   * На какой вопрос дан ответ
   * @format int32
   */
  questionId?: number;
  /** Какие были выбраны варианты ответов (или один в случае с единичным выбором) */
  userSelectedOptions?: number[] | null;
  /** Если вопрос был текстовый, то здесь храним текстовый ответ */
  userTextAnswers?: string | null;
}

/** Модель создания студента */
export interface CreateStudentRequest {
  /**
   * Логин
   * @minLength 1
   */
  login: string;
  /**
   * Пароль
   * @minLength 1
   */
  password: string;
  /**
   * Email
   * @format email
   * @minLength 1
   */
  email: string;
  /**
   * Имя
   * @minLength 1
   */
  firstName: string;
  /** Отчество */
  middleName?: string | null;
  /**
   * Фамилия
   * @minLength 1
   */
  lastName: string;
  /**
   * Телефон
   * @minLength 1
   */
  phone: string;
  /**
   * Ссылка на профиль VK
   * @minLength 1
   */
  vkProfileLink: string;
}

/** Модель создания теста */
export interface CreateTestRequest {
  /**
   * Название теста
   * @minLength 1
   */
  title: string;
  /**
   * Описание теста
   * @minLength 1
   */
  description: string;
  /** Можно ли пройти тест больше одного раза */
  isRepeatable?: boolean;
  type: TestType;
  /**
   * Дата публикации теста
   * @format date-time
   */
  publishedAt: string;
  /**
   * Дата, до которой можно пройти тест
   * @format date-time
   */
  deadline: string;
  /**
   * Время на прохождения теста (если нужно)
   * @format int32
   */
  durationMinutes?: number | null;
  /**
   * Количество очков для прохождения тест (если нужно)
   * @format int32
   */
  passingScore?: number | null;
  /**
   * Максимально количество попыток прохождения (если нужно)
   * @format int32
   */
  maxAttempts?: number | null;
  /** Идентификаторы студентов (для кого предназначен тест) */
  students?: number[] | null;
  /** Идентификаторы проектов (для которых предназначен тест) */
  projects?: number[] | null;
  /** Идентификаторы курсов (для которых предназначен тест) */
  courses?: number[] | null;
  /** Идентификаторы групп (для которых предназначен тест) */
  groups?: number[] | null;
  /** Идентификаторы направлений (для которых предназначен тест) */
  directions?: number[] | null;
}

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
}

/** Вопрос */
export interface QuestionResponse {
  /**
   * Идентификатор
   * @format int32
   */
  id?: number;
  /** Тест вопроса */
  text?: string | null;
  /**
   * Номер вопроса в тесте
   * @format int32
   */
  number?: number;
  /** Описание вопроса */
  description?: string | null;
  answerType?: AnswerType;
  /** Оценивается ли тест */
  isScoring?: boolean;
  /**
   * Сколько баллов можно получить за вопрос
   * @format int32
   */
  maxScore?: number;
  /** Список ответов */
  answers?: AnswerResponseForStudent[] | null;
}

export interface StudentResponse {
  /**
   * Идентификатор
   * @format int32
   */
  id?: number;
  /** Логин */
  login?: string | null;
  /** Email */
  email?: string | null;
  /** Имя */
  firstName?: string | null;
  /** Отчество */
  middleName?: string | null;
  /** Фамилия */
  lastName?: string | null;
  /** Телефон */
  phone?: string | null;
  /** Ссылка на профиль VK */
  vkProfileLink?: string | null;
  /** Путь до картинки */
  avatarPath?: string | null;
}

export interface StudentTestSummaryDto {
  /** @format int32 */
  testId?: number;
  /** @format int32 */
  maxAttempts?: number | null;
  /** @format int32 */
  attemptsUsed?: number;
  /** @format int32 */
  attemptsLeft?: number | null;
  hasActiveAttempt?: boolean;
  /** @format int32 */
  activeAttemptId?: number | null;
  hasGradedAttempt?: boolean;
  /** @format int32 */
  bestScore?: number | null;
  /** @format int32 */
  maxScore?: number;
}

/** Краткая модель теста */
export interface TestResponse {
  /**
   * Идентификатор
   * @format int32
   */
  id?: number;
  /** Название */
  title?: string | null;
  /** Описание */
  description?: string | null;
  /** Можно ли пройти тест больше одного раза */
  isRepeatable?: boolean;
  type?: TestType;
  /** Опубликован ли для студентов */
  isPublic?: boolean;
  /**
   * Дата создания
   * @format date-time
   */
  createdAt?: string;
}

/** Детальный результат теста для студента */
export interface TestResultDetailResponse {
  /**
   * Идентификатор теста
   * @format int32
   */
  testId?: number;
  /** Есть ли хотя бы одна попытка */
  hasAnyAttempt?: boolean;
  /**
   * ID лучшей попытки
   * @format int32
   */
  bestAttemptId?: number | null;
  /**
   * Лучший балл
   * @format int32
   */
  bestScore?: number | null;
  /**
   * Максимальный балл за тест
   * @format int32
   */
  maxScore?: number;
  /** Пройден ли тест */
  passed?: boolean;
  /**
   * Использовано попыток
   * @format int32
   */
  attemptsUsed?: number;
  /**
   * Осталось попыток
   * @format int32
   */
  attemptsLeft?: number | null;
  /** Можно ли показывать разбор */
  canShowReview?: boolean;
}

export interface TestResultDto {
  /** @format int32 */
  id?: number;
  passed?: boolean;
  /** @format int32 */
  testId?: number;
  /** @format int32 */
  attemptId?: number;
  /** @format int32 */
  bestScore?: number;
  /** @format int32 */
  studentId?: number;
}

export interface UpdateAnswerRequest {
  /**
   * Идентификатор
   * @format int32
   */
  id?: number;
  /**
   * Текст ответа
   * @minLength 1
   */
  text: string;
  /** Флаг правильного ответа */
  isCorrect: boolean;
  /**
   * Идентификатор вопроса
   * @format int32
   */
  questionId: number;
}

export interface UpdateAttemptRequest {
  /**
   * Идентфикатор попытки
   * @format int32
   */
  id?: number;
}

/** Модель обнолвения группы */
export interface UpdateGroupRequest {
  /**
   * Идентификатор группы.
   * @format int32
   * @example 10
   */
  id?: number;
  /**
   * Название группы
   * @example "КБ10"
   */
  name?: string | null;
  /**
   * Идентификатор направления
   * @format int32
   * @example 3
   */
  directionId?: number;
  /**
   * Идентфикатор курса
   * @format int32
   * @example 5
   */
  courseId?: number;
  /**
   * Идентификатор проекта
   * @format int32
   * @example 2
   */
  projectId?: number;
}

/** Модель обновления данных в вопросе */
export interface UpdateQuestionRequest {
  /**
   * Идентификатор вопроса
   * @format int32
   */
  id?: number;
  /** Текст вопросы */
  text?: string | null;
  /**
   * Номер вопроса в тесте
   * @format int32
   */
  number?: number;
  /** Описание вопроса */
  description?: string | null;
  answerType?: AnswerType;
  /** Оценивается ли вопрос */
  isScoring?: boolean;
  /**
   * Балл за вопрос (если оценивается)
   * @format int32
   */
  maxScore?: number | null;
  /**
   * Идентификатор теста
   * @format int32
   */
  testId?: number;
}

/** Модель обновления данных студента */
export interface UpdateStudentRequest {
  /**
   * Идентификатор
   * @format int32
   */
  id?: number;
  /**
   * Телефон
   * @minLength 1
   */
  phone: string;
  /**
   * Ссылка на профиль VK
   * @minLength 1
   */
  vkProfileLink: string;
}

/** Модель обновления теста */
export interface UpdateTestRequest {
  /**
   * Идентификатор
   * @format int32
   */
  id?: number;
  /**
   * Название теста
   * @minLength 1
   */
  title: string;
  /**
   * Описание теста
   * @minLength 1
   */
  description: string;
  /** Можно ли пройти тест больше одного раза */
  isRepeatable?: boolean;
  type: TestType;
  /**
   * Дата публикации теста
   * @format date-time
   */
  publishedAt: string;
  /**
   * Дата, до которой можно пройти тест
   * @format date-time
   */
  deadline: string;
  /**
   * Время на прохождения теста (если нужно)
   * @format int32
   */
  durationMinutes?: number | null;
  /**
   * Количество очков для прохождения тест (если нужно)
   * @format int32
   */
  passingScore?: number | null;
  /**
   * Максимально количество попыток прохождения (если нужно)
   * @format int32
   */
  maxAttempts?: number | null;
  /** Идентификаторы студентов (для кого предназначен тест) */
  students?: number[] | null;
  /** Идентификаторы проектов (для которых предназначен тест) */
  projects?: number[] | null;
  /** Идентификаторы курсов (для которых предназначен тест) */
  courses?: number[] | null;
  /** Идентификаторы групп (для которых предназначен тест) */
  groups?: number[] | null;
  /** Идентификаторы направлений (для которых предназначен тест) */
  directions?: number[] | null;
}
