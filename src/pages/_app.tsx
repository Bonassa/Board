
// O _app é chamado cada vez que a página é recarregada, ou se for troca a rota
// Ele que renderiza as páginas na tela

// Para adicionar uma tipagem ao Component (descontruido na função MyApp) utilizaremos o AppProps
import { AppProps } from 'next/app';

// Importando o Componente Header, que aparecerá em todas as páginas
// Será importado no _app, pois ele deve ser atualizado a cada página
import Header from '../components/Header';

// Adicionando estilos globais na aplicação, através do _app que é renderizado em todas as pages
import '../styles/global.scss';

// Acidionando tipagem no Component
function MyApp({ Component, pageProps }: AppProps) {
	return (
		// Utilizaremos um fragment para não afetar em estilizações nem nada e retornar o Header antes das páginas
		<>
			{/**Adicionando o Header */}
			<Header/>
			{/* Essa tag é responsável por renderizar as páginas*/}
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
