
// O _app é chamado cada vez que a página é recarregada, ou se for troca a rota
// Ele que renderiza as páginas na tela

// Para adicionar uma tipagem ao Component (descontruido na função MyApp) utilizaremos o AppProps
import { AppProps } from 'next/app';

// Adicionando estilos globais na aplicação, através do _app que é renderizado em todas as pages
import '../styles/global.scss';

// Acidionando tipagem no Component
function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}

export default MyApp
