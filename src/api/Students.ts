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
  CreateStudentRequest,
  StudentResponse,
  UpdateStudentRequest,
 } from "./data-contracts";
import { ContentType, HttpClient, type RequestParams } from "./http-client";

export class Students<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Если идентификаторы групп не указаны — придёт полный список студентов
   *
   * @tags Students
   * @name StudentsList
   * @summary Получить список студентов
   * @request GET:/api/Students
   * @secure
   */
  studentsList = (
    query?: {
      /** Идентификаторы групп */
      groupIds?: number[];
      /** Поиск по ФИО студента */
      searchName?: string;
      /** Поле для сортировки ("LastName", "FirstName", "Id") */
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
    this.request<StudentResponse[], any>({
      path: `/api/Students`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Students
   * @name StudentsCreate
   * @summary Добавить студента
   * @request POST:/api/Students
   * @secure
   */
  studentsCreate = (data: CreateStudentRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Students`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Students
   * @name StudentsUpdate
   * @summary Обновить данные о студенте
   * @request PUT:/api/Students
   * @secure
   */
  studentsUpdate = (data: UpdateStudentRequest, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Students`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Students
   * @name StudentsDetail
   * @summary Получить данные студента по Id
   * @request GET:/api/Students/{id}
   * @secure
   */
  studentsDetail = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Students/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Students
   * @name StudentsDelete
   * @summary Удалить студента
   * @request DELETE:/api/Students/{id}
   * @secure
   */
  studentsDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/Students/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Students
   * @name StudentsAvatarCreate
   * @summary Загрузить аватар студента
   * @request POST:/api/Students/avatar
   * @secure
   */
  studentsAvatarCreate = (
    data: {
      /** @format binary */
      Avatar?: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/Students/avatar`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
}
