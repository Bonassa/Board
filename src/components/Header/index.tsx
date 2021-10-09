
// Importando os estilos do Header
import styles from './styles.module.scss';

// Importando o butão de SignIn
import SignInButton from '../SignInButton';

// Importando o Link para navegações entre páginas
import Link from 'next/link';

export default function Header(){
   return(
      // Utilizando a tag header para ajudar no SEO
      <header className={styles.headerContainer}>
         <div className={styles.headerContent}>
            <div id={styles.logo}>
               {/**Para referenciar o src, o next já espera que esteja na pasta public as images */}
               <Link href="/">
                  <img src="/images/logo.svg" alt="Logo Board" />
               </Link>
            </div>
            <nav>
               <Link href="/">
                  <a>Home</a>
               </Link>
               <Link href="/board">
                  <a>Meu Board</a>
               </Link>
            </nav>

            <SignInButton/>
         </div>
      </header>
   )
}