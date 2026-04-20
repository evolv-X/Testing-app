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
  AttemptReviewDto,
  CreateAttemptRequest,
  ProblemDetails,
  UpdateAttemptRequest,
 } from "./data-contracts";
import { ContentType, HttpClient, type RequestParams } from "./http-client";

export class Attempts<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Attempts
   * @name AttemptsCreate
   * @summary Начать попытку
   * @request POST:/api/Attempts
   * @secure
   */
  attemptsCreate = (data: CreateAttemptRequest, params: RequestParams = {}) =>
    this.request<void, ProblemDetails>({
      path: `/api/Attempts`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Attempts
   * @name AttemptsUpdate
   * @summary Закончить попытку
   * @request PUT:/api/Attempts
   * @secure
   */
  attemptsUpdate = (data: UpdateAttemptRequest, params: RequestParams = {}) =>
    this.request<void, ProblemDetails>({
      path: `/api/Attempts`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Attempts
   * @name AttemptsReviewList
   * @summary Получить разбор попытки
   * @request GET:/api/Attempts/{attemptId}/review
   * @secure
   */
  attemptsReviewList = (attemptId: number, params: RequestParams = {}) =>
    this.request<AttemptReviewDto, ProblemDetails>({
      path: `/api/Attempts/${attemptId}/review`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
