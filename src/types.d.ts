export type Gender = 'Femenino' | 'Masculino' | 'No binario';

export interface UserEntry {
    id:         number
    first_name: string
    last_name:  string
    email:      string
    gender:     Gender
    avatar:     string
    birth:      string
    password:   string
}

export type NonSensitiveInfoUser  = Pick<UserEntry, 'id' | 'first_name' | 'email' | 'avatar'>

export type OmitSensitiveInfoUser = Omit<UserEntry, 'password'>