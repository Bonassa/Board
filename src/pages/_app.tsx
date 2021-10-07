
// Para adicionar uma tipagem ao Component (descontruido na função MyApp) utilizaremos o AppProps
import { AppProps } from 'next/app';

// Acidionando tipagem no Component
function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />
}

export default MyApp
