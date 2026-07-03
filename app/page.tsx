import VideoGrid from '@/components/VideoGrid'

export default function Home() {
	return (
		<main className='min-h-screen bg-gray-50'>
			<header className='bg-white border-b border-gray-200 py-6 px-8'>
				<h1 className='text-2xl font-bold text-gray-900'>HLS Platform</h1>
			</header>
			<VideoGrid />
		</main>
	)
}
