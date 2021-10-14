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

   // Enviando a session para todas as paginas, para fazer o controle de usuário logado
   callbacks: {
      async session(session, profile){
         // Função chamada quando você já tem uma sessão
         try{
            // retornando a sessão do usuário
            return {
               ...session,
               id: profile.sub
            }
         } catch {
            // Iremos retornar uma objeto, pois ele já tem uma sessão.
            return {
               ...session,
               id: null
            }
         }
      },
      async signIn(user, account, profile){
         // Função chamada quando você faz o login na aplicação
         const { email } = user;

         // Como esse método pode falhar (é uma Promisse), valida erros
         try {
            return true;
         } catch(err) {
            console.log('Deu erro: ', err);
            // returno falso para não retornar uma sessão
            return false;
         }
      }
   }
})