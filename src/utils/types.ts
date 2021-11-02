export type TUserRole = 'superAdmin' | 'hrAdmin' | 'employee';

export interface IUser {
  _id: string;
  name: string;
  role: TUserRole;
}

export interface IPermissionsSet {
  readonly canDeclineDaysOff?: boolean;
  readonly canApproveDaysOff?: boolean;
  readonly canEditOwnDaysOff?: boolean;
  readonly canEditEmployeesDaysOff?: boolean;
  readonly canSeeDashboard?: boolean;
  readonly canSeeUsersList?: boolean;
  readonly canCreateUser?: boolean;
  readonly canModifyUser?: boolean;
  readonly canDeleteUser?: boolean;
  readonly canSendPassword?: boolean;
  readonly canBlockUser?: boolean;
  readonly canUnblockUser?: boolean;
}
