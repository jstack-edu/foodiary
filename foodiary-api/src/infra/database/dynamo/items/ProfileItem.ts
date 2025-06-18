import { Profile } from '@application/entities/Profile';
import { AccountItem } from './AccountItem';

export class ProfileItem {
  static readonly type = 'Profile';

  private readonly keys: ProfileItem.Keys;

  constructor(private readonly attrs: ProfileItem.Attributes) {
    this.keys = {
      PK: ProfileItem.getPK(this.attrs.accountId),
      SK: ProfileItem.getSK(this.attrs.accountId),
    };
  }

  toItem(): ProfileItem.ItemType {
    return {
      ...this.keys,
      ...this.attrs,
      type: ProfileItem.type,
    };
  }

  static fromEntity(profile: Profile) {
    return new ProfileItem({
      ...profile,
      createdAt: profile.createdAt.toISOString(),
      birthDate: profile.birthDate.toISOString(),
    });
  }

  static toEntity(profileItem: ProfileItem.ItemType) {
    return new Profile({
      accountId: profileItem.accountId,
      activityLevel: profileItem.activityLevel,
      birthDate: new Date(profileItem.birthDate),
      gender: profileItem.gender,
      height: profileItem.height,
      name: profileItem.name,
      weight: profileItem.weight,
      goal: profileItem.goal,
      createdAt: new Date(profileItem.createdAt),
    });
  }

  static getPK(accountId: string): ProfileItem.Keys['PK'] {
    return `ACCOUNT#${accountId}`;
  }

  static getSK(accountId: string): ProfileItem.Keys['SK'] {
    return `ACCOUNT#${accountId}#PROFILE`;
  }
}

export namespace ProfileItem {
  export type Keys = {
    PK: AccountItem.Keys['PK'];
    SK: `ACCOUNT#${string}#PROFILE`;
  };

  export type Attributes = {
    accountId: string;
    name: string;
    birthDate: string;
    gender: Profile.Gender;
    height: number;
    weight: number;
    activityLevel: Profile.ActivityLevel;
    goal: Profile.Goal;
    createdAt: string;
  };

  export type ItemType = Keys & Attributes & {
    type: 'Profile';
  };
}
