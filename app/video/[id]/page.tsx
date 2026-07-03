import { HlsPlayer } from '@/components/HlsPlayer'
import { Video, videoService } from '@/services/api'

interface VideoPageProps {
	params: Promise<{ id: string }>
}

export default async function VideoPage({ params }: VideoPageProps) {
	const { id } = await params
	let video: Video | null = null

	try {
		video = await videoService.getVideoById(id)
	} catch (error) {
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
