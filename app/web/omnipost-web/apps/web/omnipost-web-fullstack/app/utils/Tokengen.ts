import jwt, {type SignOptions} from "jsonwebtoken";

type JsonPrimitive = string | number | boolean | null;
export type JwtSafeValue =
    | JsonPrimitive
    | JwtSafeValue[]
    | { [key: string]: JwtSafeValue };
export type JwtSafeFields = Record<string, JwtSafeValue>;

type TokenGenerationOptions<
    TAccessFields extends JwtSafeFields,
    TRefreshFields extends JwtSafeFields,
> = {
    accessFields: TAccessFields;
    refreshFields?: TRefreshFields;
    accessSecret?: string;
    refreshSecret?: string;
    accessTokenExpiresIn?: SignOptions["expiresIn"];
    refreshTokenExpiresIn?: SignOptions["expiresIn"];
    audience?: SignOptions["audience"];
    issuer?: SignOptions["issuer"];
};

type GeneratedTokens = {
    accessToken: string;
    refreshToken: string;
};

const RESERVED_JWT_CLAIMS = new Set([
    "aud",
    "exp",
    "iat",
    "iss",
    "jti",
    "nbf",
    "sub",
]);

const DEFAULT_ACCESS_TOKEN_EXPIRY: SignOptions["expiresIn"] = "15m";
const DEFAULT_REFRESH_TOKEN_EXPIRY: SignOptions["expiresIn"] = "7d";

function getJwtSecret(secret: string | undefined, envName: string) {
    const resolvedSecret = secret ?? process.env[envName];

    if (!resolvedSecret?.trim()) {
        throw new Error(`${envName} is required to generate JWT tokens.`);
    }

    return resolvedSecret;
}

function assertSafeJwtFields(fields: JwtSafeFields, fieldGroupName: string) {
    for (const [key, value] of Object.entries(fields)) {
        if (RESERVED_JWT_CLAIMS.has(key)) {
            throw new Error(
                `${fieldGroupName}.${key} is reserved. Pass standard JWT claims through token options instead.`,
            );
        }

        if (value === undefined) {
            throw new Error(`${fieldGroupName}.${key} cannot be undefined.`);
        }
    }
}

function generateJwtTokens<
    TAccessFields extends JwtSafeFields,
    TRefreshFields extends JwtSafeFields = TAccessFields,
>({
      accessFields,
      refreshFields,
      accessSecret,
      refreshSecret,
      accessTokenExpiresIn = DEFAULT_ACCESS_TOKEN_EXPIRY,
      refreshTokenExpiresIn = DEFAULT_REFRESH_TOKEN_EXPIRY,
      audience,
      issuer,
  }: TokenGenerationOptions<TAccessFields, TRefreshFields>): GeneratedTokens {
    assertSafeJwtFields(accessFields, "accessFields");

    const resolvedRefreshFields = refreshFields ?? accessFields;
    assertSafeJwtFields(resolvedRefreshFields, "refreshFields");

    const sharedOptions: Pick<SignOptions, "audience" | "issuer"> = {
        audience,
        issuer,
    };

    const accessToken = jwt.sign(
        accessFields,
        getJwtSecret(accessSecret, "JWT_ACCESS_SECRET"),
        {
            ...sharedOptions,
            expiresIn: accessTokenExpiresIn,
        },
    );

    const refreshToken = jwt.sign(
        resolvedRefreshFields,
        getJwtSecret(refreshSecret, "JWT_REFRESH_SECRET"),
        {
            ...sharedOptions,
            expiresIn: refreshTokenExpiresIn,
        },
    );

    return {accessToken, refreshToken};
}

export {
    generateJwtTokens
}