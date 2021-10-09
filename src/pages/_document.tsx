
// O _document é carregado apenas uma vez, quando a aplicação é montada

// Esse arquivo vai funcionar muito semelhante ao index.html do React, nele vamos montar um html

// Para isso iremos importar o Document do next, e outros elementos 
import Document, { Html, Head, Main, NextScript } from 'next/document';

// Este é o único componente que o Next pede para exportar em formato de classe, pois ele extende o Document
export default class MyDocument extends Document{
   // Como é uma classe, deve-se passar o render
   render(){
      return(
         //Nessa parte iremos poder montar uma estrutura personalizada de HTML para ser renderizada
         <Html>
            <Head>
               {/** Normal igual ao head do HTML
                * Fontes personalizadas, favicon, scripts etc...
                * Não devemos utilizar o title aqui, pois não será possível alterar em cada página
                */}
               <link rel="preconnect" href="https://fonts.googleapis.com" />
               <link rel="preconnect" href="https://fonts.gstatic.com" />
               <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Quicksand&display=swap" rel="stylesheet" />
            </Head>
            <body>
               {/**O body é o padrão do html, não precisa importar ele 
                * Dentro do body, coloca-se o <Main/>, que é a aplicação em sí,
                * O NextScript também deve ser passado após o Main
               */}
               <Main/>
               <NextScript/>
            </body>
         </Html>
      )
   }
}