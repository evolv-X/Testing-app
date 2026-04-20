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
  CreateQuestionRequest,
  ProblemDetails,
  QuestionResponse,
  UpdateQuestionRequest,
 } from "./data-contracts";
import { ContentType, HttpClient, type RequestParams } from "./http-client";

export class Question<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Question
   * @name QuestionList
   * @summary Получить список вопросов
   * @request GET:/api/Question
   * @secure
   */
  questionList = (
    query?: {
      /** @format int32 */
      testId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<QuestionResponse[], ProblemDetails>({
      path: `/api/Question`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Question
   * @name QuestionCreate
   * @summary Создать вопрос к тесту
   * @request POST:/api/Question
   * @secure
   */
  questionCreate = (data: CreateQuestionRequest, params: RequestParams = {}) =>
    this.request<void, ProblemDetails>({
      path: `/api/Question`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Question
   * @name QuestionUpdate
   * @summary Обновить вопрос к тесту
   * @request PUT:/api/Question
   * @secure
   */
  questionUpdate = (data: UpdateQuestionRequest, params: RequestParams = {}) =>
    this.request<void, ProblemDetails>({
      path: `/api/Question`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Question
   * @name QuestionManageList
   * @summary Получить список вопросов
   * @request GET:/api/Question/manage
   * @secure
   */
  questionManageList = (
    query?: {
      /** @format int32 */
      testId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<QuestionResponse[], ProblemDetails>({
      path: `/api/Question/manage`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Question
   * @name QuestionDetail
   * @summary Получить вопрос по идентификатору
   * @request GET:/api/Question/{id}
   * @secure
   */
  questionDetail = (id: number, params: RequestParams = {}) =>
    this.request<QuestionResponse, ProblemDetails>({
      path: `/api/Question/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Question
   * @name QuestionDelete
   * @summary Удалить вопрос
   * @request DELETE:/api/Question/{id}
   * @secure
   */
  questionDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, ProblemDetails>({
      path: `/api/Question/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
