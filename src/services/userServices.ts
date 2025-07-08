import { UserEntry, NonSensitiveInfoUser } from "../types";
import data_users from './users_data.json';

const users: UserEntry[] = data_users as UserEntry[];

export const getUsers = (): UserEntry[] => users;

export const getNoSensitiveInfoUsers = (): NonSensitiveInfoUser[] => users