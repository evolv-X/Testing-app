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

import type {  ProblemDetails, StudentTestSummaryDto  } from "./data-contracts";
import { HttpClient, type RequestParams } from "./http-client";

export class StudentTests<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags StudentTests
   * @name StudentTestsSummaryList
   * @summary Получить сводку по попыткам всех доступных студенту тестов
   * @request GET:/api/StudentTests/summary
   * @secure
   */
  studentTestsSummaryList = (params: RequestParams = {}) =>
    this.request<StudentTestSummaryDto[], ProblemDetails>({
      path: `/api/StudentTests/summary`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
