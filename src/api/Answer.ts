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
  CreateAnswerRequest,
  ProblemDetails,
  UpdateAnswerRequest,
 } from "./data-contracts";
import { ContentType, HttpClient, type RequestParams } from "./http-client";

export class Answer<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Answer
   * @name AnswerCreate
   * @summary Создать ответ на вопрос
   * @request POST:/api/Answer
   * @secure
   */
  answerCreate = (data: CreateAnswerRequest, params: RequestParams = {}) =>
    this.request<void, ProblemDetails>({
      path: `/api/Answer`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Answer
   * @name AnswerUpdate
   * @summary Обновить ответ на вопрос
   * @request PUT:/api/Answer
   * @secure
   */
  answerUpdate = (data: UpdateAnswerRequest, params: RequestParams = {}) =>
    this.request<void, ProblemDetails>({
      path: `/api/Answer`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Answer
   * @name AnswerDelete
   * @summary Удалить ответ на вопрос
   * @request DELETE:/api/Answer/{id}
   * @secure
   */
  answerDelete = (id: number, params: RequestParams = {}) =>
    this.request<any, ProblemDetails>({
      path: `/api/Answer/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
