
// Importando do Next Auth o SignIn para fazer o login com o GitHub, também o hook dele
import { signIn, signOut, useSession } from 'next-auth/client';

// Importando estilos
import styles from './styles.module.scss';

// Import dos icons utilizados
import { FiX } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'

export default function SignInButton(){

   //Desconstruindo o useSession para pegar apenas a sessão do usuário
   const [session] = useSession();

   return(
      <div id={styles.login}>

         {/**Criando uma renderização condicional, caso o usuário esteja logado */}
         {session ? (
            <button id={styles.sessionOn} type="button" onClick={() => signOut()}>
               <img src={session.user.image} alt="Foto do usuário" />
               <span>Olá {session.user.name}</span>
               <FiX size={18}/>
            </button>
         ) : (
            //Passando para o onclick do button o método signin informando qual provider será utilizado
            <button id={styles.sessionOff} type="button" onClick={() => signIn('github')}>
               <FaGithub size={24} />
               Entrar com o GitHub
            </button>
         )}
      </div>
   )
}