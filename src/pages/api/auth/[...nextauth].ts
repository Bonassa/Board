import NextAuth from "next-auth";
import Providers from "next-auth/providers";

// Importando o firebase pra validar se o usuário é um apoiador
import firebase from '../../../services/firebaseConnection';

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

            // Pegando a ultima doação do usuário | dentro do profile.sub tem o id do usuário, convertendo pra String por causa do TS
            const lastDonate = await firebase.firestore().collection('donaters').doc(String(profile.sub)).get()
            .then((snapshot) => {
               // Verificando se o usuário é um apoaidor
               if (snapshot.exists) {
                  return snapshot.data().lastDonate.toDate();
               } else {
                  // Usuário não está cadastrado como apoiador
                  return null;
               }
            })

            // retornando a sessão do usuário
            return {
               ...session,
               id: profile.sub,
               // Verificando se ele encotrou algum valor na lastdonate, então é donater
               donater: lastDonate ? true : false,
               lastDonate: lastDonate
            }
         } catch {
            // Iremos retornar uma objeto, pois ele já tem uma sessão.
            return {
               ...session,
               id: null,
               // Passando os mesmos campos
               donater: false,
               lastDonate: null
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