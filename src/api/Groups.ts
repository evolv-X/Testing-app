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

import type {  CreateGroupRequest, UpdateGroupRequest  } from "./data-contracts";
import { ContentType, HttpClient, type RequestParams } from "./http-client";

export class Groups<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Groups
   * @name GroupsList
   * @summary Получить список всех групп.
   * @request GET:/api/Groups
   * @secure
   */
  groupsList = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/Groups`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Операция доступна только пользователям с ролью Manager.
   *
   * @tags Groups
   * @name GroupsCreate
   * @summary Создать новую группу.
   * @request POST:/api/Groups
   * @secure
   */
  groupsCreate = (data: CreateGroupRequest, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/Groups`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Groups
   * @name GroupsDetail
   * @summary Получить информацию о группе по идентификатору.
   * @request GET:/api/Groups/{id}
   * @secure
   */
  groupsDetail = (id: number, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/Groups/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Операция доступна только пользователям с ролью Manager.
   *
   * @tags Groups
   * @name GroupsUpdate
   * @summary Обновить данные группы.
   * @request PUT:/api/Groups/{id}
   * @secure
   */
  groupsUpdate = (
    id: string,
    data: UpdateGroupRequest,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/Groups/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Операция доступна только пользователям с ролью Manager.
   *
   * @tags Groups
   * @name GroupsDelete
   * @summary Удалить группу.
   * @request DELETE:/api/Groups/{id}
   * @secure
   */
  groupsDelete = (id: number, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/Groups/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
