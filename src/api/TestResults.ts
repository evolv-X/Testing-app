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
  ProblemDetails,
  TestResultDetailResponse,
  TestResultDto,
 } from "./data-contracts";
import { HttpClient, type RequestParams } from "./http-client";

export class TestResults<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags TestResults
   * @name TestResultsManageList
   * @summary Получить результаты студентов (для менеджера)
   * @request GET:/api/TestResults/manage
   * @secure
   */
  testResultsManageList = (params: RequestParams = {}) =>
    this.request<TestResultDto[], ProblemDetails>({
      path: `/api/TestResults/manage`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description После добавления авторизации получение id через параметры будет удалено
   *
   * @tags TestResults
   * @name TestResultsStudentList
   * @summary Получить результаты студента
   * @request GET:/api/TestResults/student
   * @secure
   */
  testResultsStudentList = (params: RequestParams = {}) =>
    this.request<TestResultDto, ProblemDetails>({
      path: `/api/TestResults/student`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Позволяет получить детальную информацию о результатах прохождения конкретного теста
   *
   * @tags TestResults
   * @name TestResultsTestDetail
   * @summary Получить результат теста для текущего студента
   * @request GET:/api/TestResults/test/{testId}
   * @secure
   */
  testResultsTestDetail = (testId: number, params: RequestParams = {}) =>
    this.request<TestResultDetailResponse, ProblemDetails>({
      path: `/api/TestResults/test/${testId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
