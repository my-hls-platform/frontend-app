import VideoGrid from '@/components/VideoGrid'

export default function Home() {
	return (
		<main>
			<header className='py-6 px-8 max-w-7xl mx-auto'>
				<h1 className='text-2xl font-bold text-white'>Video Library</h1>
			</header>
			<VideoGrid />
		</main>
	)
}
