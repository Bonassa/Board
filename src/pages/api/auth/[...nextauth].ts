import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
   providers: [
      Providers.GitHub({
         clientId: process.env.GITHUB_CLIENT_ID,
         clientSecret: process.env.GITHUB_CLIENT_SECRET,
         // O github pede qual o escopo desse acesso, passaremos apenas o acesso as informações públicas
         scope: 'read:user'
      }),
   ],
})