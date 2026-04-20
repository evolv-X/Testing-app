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

import type {  CreateStudentAnswerRequest, ProblemDetails  } from "./data-contracts";
import { ContentType, HttpClient, type RequestParams } from "./http-client";

export class StudentAnswers<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags StudentAnswers
   * @name StudentAnswersCreate
   * @summary Дать ответ на вопрос
   * @request POST:/api/StudentAnswers
   * @secure
   */
  studentAnswersCreate = (
    data: CreateStudentAnswerRequest,
    params: RequestParams = {},
  ) =>
    this.request<void, ProblemDetails>({
      path: `/api/StudentAnswers`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
