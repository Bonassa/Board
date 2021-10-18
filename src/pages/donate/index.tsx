
import styles from './styles.module.scss';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import firebase from '../../services/firebaseConnection';
import { useState } from 'react';

// Importando botões do PayPal
import { PayPalButtons } from '@paypal/react-paypal-js'

interface UserProps {
   user: {
      id: string;
      name: string;
      email: string;
      foto: string;
   }
}

export default function Donate({ user } : UserProps){

   const [donater, setDonater] = useState(false);

   // Função para graver no FireStore os usuários donaters
   async function handleSaveDonaters() {
      await firebase.firestore().collection('donaters').doc(user.id).set({
         donate: true,
         lastDonate: new Date(),
         name: user.name,
         image: user.foto
      })
      .then(() => {
         setDonater(true);
      })
   }

   return(
      <>
         <Head>
            <title>Board - Seja um Apoiador</title>
         </Head>

         <main id={styles.container}>
            <img src="images/rocket.svg" alt="Foguete" />

            {donater ? (
               <div className={styles.sponsor}>
                  <img src={user.foto} alt="Usuário" />
                  <span>Obrigado {user.name} por apoiar esse Projeto!</span>
               </div>
            ) : (
               <div className={styles.text}>
                  <h1>Seja um Apoiador desse Projeto! 🏆</h1>
                  <h3>Contribua com apenas <span>R$ 1,00</span></h3>
                  <h4>Apareça em nossa home e tenha funcionalidades exclusivas</h4>
               </div>
            )}

            <div className={styles.paypal}>
               <PayPalButtons
                  //Criando ordem de pagamento
                  createOrder={ (data, actions) => {
                     //Criando uma ordem de pagamento
                     return actions.order.create({
                        purchase_units: [{
                           amount: {
                              // Valor da compra
                              value: '1'
                           }
                        }]
                     })
                  }}

                  //Função para quando o pagamento for aprovado
                  onApprove={ (data, actions) => {
                     return actions.order.capture().then((details) => {
                        console.log('Compra Aprovada ' + details.payer.name.given_name )
                        handleSaveDonaters();
                     })
                  }}
               />
            </div>
         </main>
      </>
   )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

   const session = await getSession({ req });

   if(!session){
      return {
         redirect: {
            destination: "/",
            permanent: false
         }
      }
   }

   const user = {
      id: session?.id,
      name: session?.user.name,
      email: session?.user.email,
      foto: session?.user.image
   }

   return {
      props: {
         user
      }
   }
}