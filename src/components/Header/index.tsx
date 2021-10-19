
// Importando os estilos do Header
import styles from './styles.module.scss';

// Importando o butão de SignIn
import SignInButton from '../SignInButton';

// Importando o Link para navegações entre páginas
import Link from 'next/link';

import Image from 'next/image';
import logo from '../../../public/images/logo.svg';

export default function Header(){
   return(
      // Utilizando a tag header para ajudar no SEO
      <header className={styles.headerContainer}>
         <div className={styles.headerContent}>
            <div id={styles.logo}>
               {/**Para referenciar o src, o next já espera que esteja na pasta public as images */}
               <Link href="/">
                  <a>
                     <Image src={logo} alt="Logo Board" />
                  </a>
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