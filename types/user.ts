export type User = {
  id: string;
  name: string;
  family: string;
  phone: string;
};

export type UserRoles = "ROLE_SELLER" | "ROLE_ADMIN" | "ROLE_USER";

export type UserTypes = "REALPERSON" | "LEGALPERSON";

export enum UserRolesEnum {
  ROLE_SELLER = "ROLE_SELLER",
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_USER = "ROLE_USER",
}

export enum UserTypesEnum {
  REALPERSON = "REALPERSON",
  LEGALPERSON = "LEGALPERSON",
}

export enum UserGendersEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
export const userRolesOptions = [
  { label: "فروشنده", value: UserRolesEnum.ROLE_SELLER },
  { label: "مدیر", value: UserRolesEnum.ROLE_ADMIN },
  // { label: "کاربر", value: UserRolesEnum.ROLE_USER },
];

export const userTypesOptions = [
  { label: "حقیقی", value: UserTypesEnum.REALPERSON },
  { label: "حقوقی", value: UserTypesEnum.LEGALPERSON },
];

export const userGendersOptions = [
  { label: "مرد", value: UserGendersEnum.MALE },
  { label: "زن", value: UserGendersEnum.FEMALE },
];
