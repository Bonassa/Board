
// Para utilizar o CSS com next, e os estilos não "vazarem" para outras telas, criamos um css para cada tela e utilizamos o .module
// E no .tsx (TypeScript React) utilizamos como classe ou ID, passando o style. nome da classe ou ID
import styles from '../styles/styles.module.scss';

export default function Home() {
   return (
      <div>
         <h1 className={styles.title}>Index do <span>NextJS</span></h1>
         <h2 id={styles.comID}>Com ID</h2>
         <div>

         </div>
      </div>
   )
}
