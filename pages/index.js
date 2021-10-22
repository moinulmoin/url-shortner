import Head from 'next/head';
import AllUrl from '../components/AllUrl';
import CreateShortUrl from '../components/CreateShortUrl';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { GlobalContextProvider } from '../context/GlobalContext';

export default function Home() {
	return (
		<div className='min-h-screen bg-gray-900 text-white'>
			<Head>
				<title>URL Shortener App</title>
				<link rel='icon' href='/favicon.ico' />
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='true'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap'
					rel='stylesheet'
				/>
			</Head>

			<Header />

			<main className='h-[calc(100vh-168px)] mt-14'>
				<div className='container mx-auto'>
					<div className='flex flex-col gap-y-10'>
						<GlobalContextProvider>
							<CreateShortUrl />
							<AllUrl />
						</GlobalContextProvider>
					</div>
				</div>
			</main>
			{/* <Toast /> */}

			<Footer />
		</div>
	);
}
