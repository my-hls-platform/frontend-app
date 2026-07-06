'use client'

import { HlsPlayer } from '@/components/HlsPlayer'
import { Video, videoService } from '@/services/api'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function VideoPage() {
	const params = useParams()
	const id = params?.id as string

	const [video, setVideo] = useState<Video | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	useEffect(() => {
		if (!id) return

		const fetchVideo = async () => {
			try {
				setLoading(true)
				const data = await videoService.getVideoById(id)
				setVideo(data)
			} catch (err) {
				setError(true)
			} finally {
				setLoading(false)
			}
		}

		fetchVideo()
	}, [id])

	if (loading) {
		return (
			<div className='flex h-screen items-center justify-center'>
				<h1 className='text-xl font-semibold text-gray-500'>Loading video...</h1>
			</div>
		)
	}

	if (error) {
		return (
			<div className='flex h-screen items-center justify-center'>
				<h1 className='text-xl font-semibold text-red-500'>Error loading video</h1>
			</div>
		)
	}

	if (!video || video.status !== 'READY' || !video.hlsUrl) {
		return (
			<div className='flex h-screen items-center justify-center'>
				<h1 className='text-xl font-semibold text-gray-500'>
					Video is processing or unavailable
				</h1>
			</div>
		)
	}

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<h1 className='text-2xl font-bold mb-6'>{video.title}</h1>

			<div className='rounded-xl overflow-hidden shadow-lg bg-black'>
				<HlsPlayer src={video.hlsUrl} />
			</div>

			{video.description && (
				<div className='mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100'>
					<h3 className='font-semibold text-lg mb-2'>AI Description:</h3>
					<p className='text-gray-700 leading-relaxed'>{video.description}</p>
				</div>
			)}
		</div>
	)
}
