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

import type { 
  CreateTestRequest,
  ProblemDetails,
  TestResponse,
  UpdateTestRequest,
 } from "./data-contracts";
import { ContentType, HttpClient, type RequestParams } from "./http-client";

export class Tests<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Когда не заданы параметры - приходит полный список тестов
   *
   * @tags Tests
   * @name TestsManageList
   * @summary Получить список тестов (для менеджера)
   * @request GET:/api/Tests/manage
   * @secure
   */
  testsManageList = (
    query?: {
      /** Опубликован ли тест */
      isPublic?: boolean;
      /** Идентификаторы групп */
      groupIds?: number[];
      /** Идентификаторы студентов */
      studentIds?: number[];
      /** Поле для сортировки (например, "Title" или "PublishedAt") */
      sortBy?: string;
      /**
       * Направление сортировки (true — по убыванию)
       * @default true
       */
      sortDescending?: boolean;
      /**
       * Номер страницы (начинается с 1)
       * @format int32
       * @default 1
       */
      pageNumber?: number;
      /**
       * Размер страницы
       * @format int32
       * @default 10
       */
      pageSize?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<TestResponse[], ProblemDetails>({
      path: `/api/Tests/manage`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Tests
   * @name TestsManageList2
   * @summary Получить тест по id (для менеджера)
   * @request GET:/api/Tests/{id}/manage
   * @originalName testsManageList
   * @duplicate
   * @secure
   */
  testsManageList2 = (id: number, params: RequestParams = {}) =>
    this.request<TestResponse, ProblemDetails>({
      path: `/api/Tests/${id}/manage`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Tests
   * @name TestsAvailableList
   * @summary Получить список тестов (для студента)
   * @request GET:/api/Tests/available
   * @secure
   */
  testsAvailableList = (
    query?: {
      /** Фильтр по публичности теста */
      isPublic?: boolean;
      /** Поиск по названию теста */
      searchTitle?: string;
      /** Поле для сортировки ("Title" или "PublishedAt") */
      sortBy?: string;
      /**
       * Направление сортировки (true — по убыванию)
       * @default true
       */
      sortDescending?: boolean;
      /**
       * Номер страницы (начинается с 1)
       * @format int32
       * @default 1
       */
      pageNumber?: number;
      /**
       * Размер страницы
       * @format int32
       * @default 10
       */
      pageSize?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<TestResponse[], ProblemDetails>({
      path: `/api/Tests/available`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Tests
   * @name TestsDetail
   * @summary Получить тест по id (для студента)
   * @request GET:/api/Tests/{id}
   * @secure
   */
  testsDetail = (id: number, params: RequestParams = {}) =>
    this.request<TestResponse, ProblemDetails>({
      path: `/api/Tests/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Tests
   * @name TestsDelete
   * @summary Удалить тест
   * @request DELETE:/api/Tests/{id}
   * @secure
   */
  testsDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, ProblemDetails>({
      path: `/api/Tests/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tests
   * @name TestsCreate
   * @summary Создать тест
   * @request POST:/api/Tests
   * @secure
   */
  testsCreate = (data: CreateTestRequest, params: RequestParams = {}) =>
    this.request<void, ProblemDetails>({
      path: `/api/Tests`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Tests
   * @name TestsUpdate
   * @summary Обновить данные теста
   * @request PUT:/api/Tests
   * @secure
   */
  testsUpdate = (data: UpdateTestRequest, params: RequestParams = {}) =>
    this.request<void, ProblemDetails>({
      path: `/api/Tests`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
