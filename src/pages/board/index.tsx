
//* Como estamos criando dentro de uma pasta, para o roteamento de next funcionar, o nome da pasta deve ser o nome da rota chamada

import styles from './styles.module.scss';

import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

import { useState, FormEvent } from 'react';

// Importando o fireBase
import firebase from '../../services/firebaseConnection';

// Para formatações de datas
import { format, formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Link from 'next/link';

// Importando componente Head para alterar cabeçalho da página
import Head from 'next/head';

import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi'
import SupportButton from '../../components/SupportButton';

type TaskList = {
   id: string;
   createdAt: string | Date;
   createdAtFormated?: string;
   tarefa: string;
   owner: string;
}

// Criando uma interface para tipar o user
interface BoardProps {
   user: {
      nome: string;
      id: string;
      donater: boolean;
      lastDonate: Date;
   },
   data: string;
}

// Recebendo o user enviado pelo lado do servidor e o data com as informações das tasks
export default function Board({ user, data }: BoardProps) {

   const [task, setTask] = useState('');

   // Já populando a tasklist com as tasks do banco | Convertendo para array novamente
   // useState<TaskList[]> --- Informando que é uma state do tipo TaskList (criado ali em cima) e [] um array desse tipo
   const [taskList, setTaskList] = useState<TaskList[]>(JSON.parse(data));

   const [editing, setEditing] = useState<TaskList | null>(null);

   async function handleSubmit(e: FormEvent) {
      e.preventDefault();

      if (task === '') {
         alert('Preencha Alguma Tarefa!');
         return;
      }

      // Verificando se o usuário está editando a tarefa
      if (editing === null) {

         await firebase.firestore().collection(user.id).add({
            createdAt: new Date(),
            tarefa: task,
            owner: user.nome
         })
         .then((doc) => {
            console.log('Cadastrado com sucesso!');
            let data = {
               id: doc.id,
               createdAt: new Date(),
               createdAtFormated: format(new Date(), 'dd MMMM yyyy'),
               tarefa: task,
               owner: user.nome
            }
   
            setTaskList([...taskList, data]);
            setTask('');
         })
         .catch((err) => {
            console.log(err);
         })
      } else {
         await firebase.firestore().collection(user.id).doc(editing.id).update({
            tarefa: task
         })
         .then(() => {
            console.log('Atualizado com sucesso');
            let data = taskList;
            let index = taskList.findIndex(item => item.id === editing.id);

            data[index].tarefa = task;
            setTaskList(data);

            setEditing(null);
            setTask('');
         })
         .catch((err) => {
            console.log('Erro ao atualizar tarefa ', err);
         })
      }
   }

   async function handleDelete(id:string) {

      await firebase.firestore().collection(user.id).doc(id).delete()
      .then(() => {
         console.log('Tarefa excluida com sucesso!');
         let updated = taskList.filter( item => {
            return (item.id !== id)
         })

         setTaskList(updated);
      })
      .catch((error) => {
         console.log('Erro ao deletar, ', error)
      })
   }

   // Função de Edição das tasks
   function handleEdit(editingTask: TaskList){
      setEditing(editingTask);
      setTask(editingTask.tarefa);
   }

   function handleCancel(){
      setEditing(null);
      setTask('');
   }

   return (
      // Editando cabeçalho da página
      <>
         <Head>
            <title>Board - Minhas Tarefas</title>
         </Head>

         <main className={styles.container}>
            <form onSubmit={handleSubmit}>
               <input type="text" placeholder="Digite sua tarefa" value={task} onChange={(e) => setTask(e.target.value)} />
               <button type="submit">
                  {editing ? (
                     <FiEdit2 size={24} />
                  ) : (
                     <FiPlus size={24} />
                  )}
               </button>
            </form>

            {editing && (
               <div className={styles.editingTrue}>
                  <span>Você está editando uma tarefa! </span>
                  <button onClick={ handleCancel }>Clique aqui</button><span>para sair</span>
               </div>
            )}

            {taskList.length > 0 ? (
               taskList.length === 1 ?
                  <h2>Você tem {taskList.length} tarefa em sua lista</h2>
                  :
                  <h2>Você tem {taskList.length} tarefas em sua lista</h2>
            ) : (
               <h2>Você ainda não tem nenhuma tarefa em sua lista</h2>
            )}

            <section>
               {taskList.map((task) => {
                  return (
                     <article key={task.id} className={styles.taskList}>
                        <Link href={`/board/${task.id}`} passHref>
                           <p>{task.tarefa}</p>
                        </Link>
                        <div className={styles.actions}>
                           <div>
                              <FiCalendar size={20} />
                              <time>{task.createdAtFormated}</time>
                           </div>

                           {user.donater && (
                              <button className={styles.edit} onClick={ () => handleEdit(task)}>
                                 <FiEdit2 size={20} />
                                 <span>Editar</span>
                              </button>
                           )}
                           <button className={styles.delete} onClick={() => { handleDelete(task.id) }}>
                              <FiTrash2 size={20} />
                              <span>Excluir</span>
                           </button>
                        </div>
                     </article>
                  )
               })}
            </section>
         </main>

         {user.donater && (
            <div className={styles.sponsorView}>
               <h3>Obrigado {user.nome.split(" ", 1)} por apoiar esse projeto!</h3>
               <div>
                  <FiClock size={24} />
                  {/**Pegando a diferença entre o dia que ele doou e hj */}
                  <span>Última doação à {formatDistance(new Date(user.lastDonate), new Date(), { locale: ptBR })}</span>
               </div>
            </div>
         )}

         <SupportButton />
      </>
   )
}

// Trabalhando na parte da renderização do lado do servidor
// Verificando se o usuário está logado.

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

   // Pegando a sessão do lado do servidor
   const session = await getSession({ req });

   if (!session) {
      return {
         // O serverside tem o redirect para mudar a rota do usuário
         redirect: {
            destination: '/',
            permanent: false
         }
      }
   }
   
   // Montando um usuário para retornar para a renderização da página
   const user = {
      nome: session?.user.name,
      id: session?.id,
      donater: session?.donater,
      lastDonate: session?.lastDonate
   }

   // Buscando as tarefas do lado do servidor
   const tasks = await firebase.firestore().collection(`${session.id}`).get()

   const data = JSON.stringify(tasks.docs.map( u => {
      return {
         id: u.id,
         createdAtFormated: format(u.data().createdAt.toDate(), 'dd MMMM yyyy', { locale: ptBR }),
         ...u.data(),
      }
   }));

   return {
      props: {
         // retornando o usuário para a página
         user,
         data
      }
   }
}