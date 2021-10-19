
// Para utilizar o CSS com next, e os estilos não "vazarem" para outras telas, criamos um css para cada tela e utilizamos o .module
// E no .tsx (TypeScript React) utilizamos como classe ou ID, passando o style. nome da classe ou ID
import styles from '../styles/styles.module.scss';

// Geração estática de página
import { GetStaticProps } from 'next';

// Para a criação de titulos dinâmicos utilizaremos o Head do Next/Head
import Head from 'next/head';
import firebase from '../services/firebaseConnection';

// Importando o Next/Image para otimizar o trabalho com images
import Image from 'next/image';
import board from '../../public/images/board-user.svg';

type Donaters = {
   id: string;
   donate: boolean;
   image: string;
   lastDonate: Date;
   name: string;
}

interface DonatersProps {
   data: string;
}

export default function Home({ data } : DonatersProps) {

   const donaters = JSON.parse(data) as Donaters[];

   return (
      <>
         {/**Aqui dentro colocaremos uma tag head, para alterações no <head> do html dessa página
          * Para não misturar com os componentes do body, utilizaremos dentro de um fragment
          * Title e outras tags para o SEO da página
         */}
         <Head>
            <title>Board - Organizando Suas Tarefas</title>
         </Head>

         <div className={styles.container}>
            <div className={styles.banner}>
               <Image src={board} alt="Imagem de um notbook exemplificando aplicação" />
            </div>
            <div className={styles.pageContent}>
               <h1>Uma Ferramenta para Organizar a sua Vida</h1>
               <h2>Descreva suas tarefas, Planeje e organize seu dia a dia</h2>
               <h3><span>100% gratuita</span> e online</h3>
            </div>
            <div className={styles.sponsors}>
               <h4>Apoiadores</h4>

               <div>
                  {donaters.map(donate => (
                     <img key={donate.id} src={donate.image} alt={donate.name}  />
                  ))}
               </div>
            </div>
         </div>
      </>
   )
}


// Fazendo a geração estatica da página, com o getStaticProps | Não funciona em modo DEV
// os : são para tipagem com o typeScript
export const getStaticProps: GetStaticProps = async () => {

   let donaters = await firebase.firestore().collection('donaters').get();

   const data = JSON.stringify(donaters.docs.map((item) => {
      return {
         id: item.id,
         ...item.data()
      }
   }));

   return {
      props: {
         data
      },
      // A quanto tempo a página será regerada no servidor, (em segundos)
      revalidate: 60 * 60 
   }
}