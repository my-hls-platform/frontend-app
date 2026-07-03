import Link from 'next/link'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className='bg-zinc-950 text-zinc-100 min-h-screen'>
				<nav className='bg-zinc-900 border-b border-zinc-800 shadow-md'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
						<div className='flex items-center justify-between h-16'>
							<div className='flex items-center space-x-8'>
								<Link
									href='/'
									className='text-xl font-bold tracking-tight text-white hover:text-zinc-300 transition'
								>
									HLS Platform
								</Link>
								<div className='flex space-x-4'>
									<Link
										href='/'
										className='px-3 py-2 rounded-md text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition'
									>
										Library
									</Link>
									<Link
										href='/upload'
										className='px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-500 transition'
									>
										Upload Video
									</Link>
								</div>
							</div>
						</div>
					</div>
				</nav>
				<main>{children}</main>
			</body>
		</html>
	)
}
