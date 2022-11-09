
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class UserActivity {
    id: string;
    datetime: string;
}

export abstract class IQuery {
    abstract getUserActivity(id: string): Nullable<UserActivity> | Promise<Nullable<UserActivity>>;
}

type Nullable<T> = T | null;
