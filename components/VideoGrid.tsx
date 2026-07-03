'use client'

import { useDebounce } from '@/hooks/useDebounce'
import { Video, videoService } from '@/services/api'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function VideoGrid() {
	const [searchTerm, setSearchTerm] = useState('')
	const [videos, setVideos] = useState<Video[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const debouncedSearchTerm = useDebounce(searchTerm, 500)

	useEffect(() => {
		let isMounted = true

		const fetchVideos = async () => {
			setIsLoading(true)
			setError(null)

			try {
				const data = await videoService.getVideos(debouncedSearchTerm)
				if (isMounted) setVideos(data)
			} catch (err: any) {
				if (isMounted) setError(err.message)
			} finally {
				if (isMounted) setIsLoading(false)
			}
		}

		fetchVideos()

		return () => {
			isMounted = false
		}
	}, [debouncedSearchTerm])

	return (
		<div className='px-8 pb-8 max-w-7xl mx-auto'>
			<div className='mb-8'>
				<input
					type='text'
					placeholder='Search videos...'
					className='w-full max-w-md px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-white placeholder-zinc-500'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>
			</div>

			{error && (
				<div className='p-4 mb-6 bg-red-900/20 border border-red-900/50 text-red-400 rounded-lg'>
					Error: {error}
				</div>
			)}

			{isLoading && (
				<div className='flex justify-center items-center h-32'>
					<span className='text-zinc-500'>Loading videos...</span>
				</div>
			)}

			{!isLoading && !error && videos.length === 0 && (
				<div className='text-center text-zinc-500 py-12'>No videos found.</div>
			)}

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{videos.map(video => (
					<div
						key={video.id}
						className='flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors'
					>
						<h3
							className='font-semibold text-lg mb-2 truncate text-white'
							title={video.title}
						>
							{video.title}
						</h3>

						<div className='mb-4'>
							<span
								className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${video.status === 'READY' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}
							>
								{video.status}
							</span>
						</div>

						<div className='mt-auto pt-4 border-t border-zinc-800'>
							{video.status === 'READY' ? (
								<Link
									href={`/video/${video.id}`}
									className='block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition-colors'
								>
									Watch Video
								</Link>
							) : (
								<button
									disabled
									className='block w-full text-center bg-zinc-800 text-zinc-500 font-medium py-2 px-4 rounded-lg cursor-not-allowed'
								>
									Processing...
								</button>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
