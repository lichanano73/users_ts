export type Gender = 'Female' | 'Male' | 'Bigender' | 'Genderfluid';

export interface UserEntry {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    gender: Gender,
    avatar: string,
    birth: string
}