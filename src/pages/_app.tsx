
// O _app é chamado cada vez que a página é recarregada, ou se for troca a rota
// Ele que renderiza as páginas na tela

// Para adicionar uma tipagem ao Component (descontruido na função MyApp) utilizaremos o AppProps
import { AppProps } from 'next/app';

// Importando o Componente Header, que aparecerá em todas as páginas
// Será importado no _app, pois ele deve ser atualizado a cada página
import Header from '../components/Header';

// Adicionando estilos globais na aplicação, através do _app que é renderizado em todas as pages
import '../styles/global.scss';

// Adicionando o Provider do Next Auth para espalhar por toda a aplicação a informação da sessão do usuário
// Renomeando o provider para ficar mais facil de identificar
import { Provider as NextAuthProvider } from 'next-auth/client';

// Adicionando o Provider do PayPal
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

// Criando um objeto com os parâmetros necessários para o provider do paypal
const initialOptions = {
	"client-id": "AayGf6Bh_fF-kEHMEt2Lc7Nnfhb85hg2XXAry5-CUVZKYKPRWR0l3-yKDdiVdbNS_09oIjwTglFfmshM",
	currency: "BRL",
	intent: "capture", 
}

// Acidionando tipagem no Component
function MyApp({ Component, pageProps }: AppProps) {
	return (
		// Envolvendo toda a aplicação com o Provider do auth, passando por parâmentro a nossa session
		<NextAuthProvider session={pageProps.session}>
			{/**Adicionando o provider do PayPal */}
			<PayPalScriptProvider options={initialOptions}>
				{/**Adicionando o Header */}
				<Header/>
				{/* Essa tag é responsável por renderizar as páginas*/}
				<Component {...pageProps} />
			</PayPalScriptProvider>
		</NextAuthProvider>
	)
}

export default MyApp
