
// Para utilizar o CSS com next, e os estilos não "vazarem" para outras telas, criamos um css para cada tela e utilizamos o .module
// E no .tsx (TypeScript React) utilizamos como classe ou ID, passando o style. nome da classe ou ID
import styles from '../styles/styles.module.scss';

// Para a criação de titulos dinâmicos utilizaremos o Head do Next/Head
import Head from 'next/head';

export default function Home() {
   return (
      <>
         {/**Aqui dentro colocaremos uma tag head, para alterações no <head> do html dessa página
          * Para não misturar com os componentes do body, utilizaremos dentro de um fragment
          * Title e outras tags para o SEO da página
         */}
         <Head>
            <title>Board - Organizando Suas Tarefas</title>
         </Head>

         <div>
            <h1 className={styles.title}>Index do <span>NextJS</span></h1>
            <h2 id={styles.comID}>Com ID</h2>
         </div>
      </>
   )
}
