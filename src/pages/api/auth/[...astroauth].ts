import { AstroAuth, type AstroAuthConfig } from "auth-astro"
import GitHub from "@auth/core/providers/github"

export const authOpts: AstroAuthConfig = {
    providers: [
        //@ts-expect-error issue https://github.com/nextauthjs/next-auth/issues/6174
        GitHub({
            clientId: import.meta.env.GITHUB_ID,
            clientSecret: import.meta.env.GITHUB_SECRET,
        }),
    ]
};

export const { get, post } = AstroAuth(authOpts);