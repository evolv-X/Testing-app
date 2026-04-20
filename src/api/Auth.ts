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

import type {  AuthRequest, ProblemDetails  } from "./data-contracts";
import { ContentType, HttpClient, type RequestParams } from "./http-client";

export class Auth<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Auth
   * @name AuthCreate
   * @request POST:/api/Auth
   * @secure
   */
  authCreate = (data: AuthRequest, params: RequestParams = {}) =>
    this.request<any, ProblemDetails>({
      path: `/api/Auth`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthRefreshCreate
   * @request POST:/api/Auth/refresh
   * @secure
   */
  authRefreshCreate = (params: RequestParams = {}) =>
    this.request<any, ProblemDetails>({
      path: `/api/Auth/refresh`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthLogoutCreate
   * @request POST:/api/Auth/logout
   * @secure
   */
  authLogoutCreate = (params: RequestParams = {}) =>
    this.request<any, ProblemDetails>({
      path: `/api/Auth/logout`,
      method: "POST",
      secure: true,
      ...params,
    });
}
