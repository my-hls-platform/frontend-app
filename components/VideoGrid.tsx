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
		<div className='p-8 max-w-7xl mx-auto'>
			<div className='mb-8'>
				<input
					type='text'
					placeholder='Search videos...'
					className='w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow text-black'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>
			</div>

			{error && (
				<div className='p-4 mb-6 bg-red-50 text-red-600 rounded-lg'>Error: {error}</div>
			)}

			{isLoading && (
				<div className='flex justify-center items-center h-32'>
					<span className='text-gray-500'>Loading videos...</span>
				</div>
			)}

			{!isLoading && !error && videos.length === 0 && (
				<div className='text-center text-gray-500 py-12'>No videos found.</div>
			)}

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{videos.map(video => (
					<div
						key={video.id}
						className='flex flex-col border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-white'
					>
						<h3 className='font-semibold text-lg mb-2 truncate' title={video.title}>
							{video.title}
						</h3>

						<div className='mb-4'>
							<span
								className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${video.status === 'READY' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
							>
								{video.status}
							</span>
						</div>

						<div className='mt-auto pt-4'>
							{video.status === 'READY' ? (
								<Link
									href={`/video/${video.id}`}
									className='block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors'
								>
									Watch Video
								</Link>
							) : (
								<button
									disabled
									className='block w-full text-center bg-gray-100 text-gray-400 font-medium py-2 px-4 rounded-lg cursor-not-allowed'
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
