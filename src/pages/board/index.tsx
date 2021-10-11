
//* Como estamos criando dentro de uma pasta, para o roteamento de next funcionar, o nome da pasta deve ser o nome da rota chamada

import styles from './styles.module.scss';

// Importando componente Head para alterar cabeçalho da página
import Head from 'next/head';

import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi'
import SupportButton from '../../components/SupportButton';

export default function Board(){
   return(
      // Editando cabeçalho da página
      <>
         <Head>
            <title>Board - Minhas Tarefas</title>
         </Head>

         <main className={styles.container}>
            <form>
               <input type="text" placeholder="Digite sua tarefa" />
               <button type="submit">
                  <FiPlus size={24} />
               </button>
            </form>

            <h2>Você tem 1 tarefa em sua lista</h2>

            <section>
               <article className={styles.taskList}>
                  <p>Primeira tarefa do dia</p>
                  <div className={styles.actions}>
                     <div>
                        <FiCalendar size={20} />
                        <time>17 de julho 2021</time>
                     </div>
                     <button className={styles.edit}>
                        <FiEdit2 size={20}/>
                        <span>Editar</span>
                     </button>
                     <button className={styles.delete}>
                        <FiTrash2 size={20} />
                        <span>Excluir</span>
                     </button>
                  </div>
               </article>
            </section>
         </main>

         <div className={styles.sponsorView}>
            <h3>Obrigado por apoiar esse projeto!</h3>
            <div>
               <FiClock size={24} />
               <span>Última doação à 3 dias.</span>
            </div>
         </div>

         <SupportButton/>
      </>
   )
}