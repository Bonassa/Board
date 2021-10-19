
// Com o Next, para usar um parâmetro na rota, criamos o arquivo com o nome do parâmetro entre []

import stylesHerdado from './styles.module.scss';
import styles from './task.module.scss';

import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Head from 'next/head';

import { FiCalendar } from 'react-icons/fi';

// Importando o botão de apoiar
import SupportButton from '../../components/SupportButton';

//import { useState } from 'react';

import firebase from '../../services/firebaseConnection';

type Task = {
   id: string;
   createdAt: string;
   createdAtFormated: string;
   tarefa: string;
   owner: string;
}

interface TaskListProps {
   tarefa: string;
}

export default function Task({ tarefa }: TaskListProps){

   //const [task, setTask] = useState<Task>(JSON.parse(tarefa));
   const task = JSON.parse(tarefa) as Task;

   return(
      <>
         <Head>
            <title>Board - Detalhes da Tarefa</title>
         </Head>

         <main className={stylesHerdado.container}>
            <h2>Detalhes da Tarefa</h2>

            <div id={styles.details}>
               <div>
                  <FiCalendar size={24} />
                  <label>Tarefa criada em <span>{task.createdAtFormated}</span></label>
               </div>
               <h3>{task.tarefa}</h3>
            </div>

            <SupportButton/>
         </main>
      </>
   )
}

// Fazendo a busca e renderização pelo lado do servidor
export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
   
   // Pegando a sessão do usuário
   const session = await getSession({ req });
   var tarefa = {};

   // Validando se o usuário está logado
   if(!session.donater){
      return {
         redirect: {
            destination: '/',
            permanent: false
         }
      }
   }

   // Pegando através do params o id enviado pela rota
   const { id } = params;

   // Verificando no banco de dados a task desse id
   await firebase.firestore().collection(`${session.id}`).doc(`${id}`).get()
   .then((snapshot) => {

      if (snapshot.exists) {
         let dados = {
            id: snapshot.id,
            createdAt: snapshot.data().createdAt,
            createdAtFormated: format(snapshot.data().createdAt.toDate(), 'dd MMMM yyyy', { locale: ptBR }),
            tarefa: snapshot.data().tarefa,
            owner: snapshot.data().owner
         }
   
         tarefa = JSON.stringify(dados);
      } 

   })
   .catch((err) => {
      console.log(err);
   })

   // Verificando se houve erro ao buscar no banco | Objeto vazio
   if(Object.keys(tarefa).length === 0) {
      return {
         redirect: {
            destination: '/board',
            permanent: false
         }
      }
   }
   
   return {
      props: {
         tarefa
      }
   }
}