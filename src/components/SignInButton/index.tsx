
// Importando estilos
import styles from './styles.module.scss';

// Import dos icons utilizados
import { FiX } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'

export default function SignInButton(){

   const session = false;

   return(
      <div id={styles.login}>

         {/**Criando uma renderização condicional, caso o usuário esteja logado */}
         {session ? (
            <button id={styles.sessionOn} type="button" onClick={() => {}}>
               <img src="https://sujeitoprogramador.com/steve.png" alt="Foto do usuário" />
               <span>Olá Steve</span>
               <FiX size={18}/>
            </button>
         ) : (
            <button id={styles.sessionOff} type="button" onClick={() => {}}>
               <FaGithub size={24} />
               Entrar com o GitHub
            </button>
         )}
      </div>
   )
}