import {z} from 'zod'

enum Gender {
    MALE = 'Male',
    FEMALE = 'Female',
    OTHER = 'Other',
}

interface UserType {
    id?: number,
    email: string,
    name: string,
    avatar: string
    gender: Gender,
    dob?: Date,
    countryCode? : string,
    phoneNumber?: number,
    refreshToken?: string,
    createdAt?: Date,
    updatedAt?: Date,
}

const UserSchema = z.object({
    id: z.number().optional(),
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}\\$/),
    name: z.string(),
    avatar: z.string().regex(/^https?:\/\//),
    gender: z.enum(Gender),
    dob: z.date().optional(),
    countryCode: z.string().optional(),
    phoneNumber: z.number().optional(),
    refreshToken: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
}) satisfies z.ZodType<UserType>

type userType = z.infer<typeof UserSchema>
export type { userType }
