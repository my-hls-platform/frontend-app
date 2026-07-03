'use client'

import { videoService } from '@/services/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function UploadPage() {
	const router = useRouter()
	const [file, setFile] = useState<File | null>(null)
	const [title, setTitle] = useState('')
	const [isUploading, setIsUploading] = useState(false)
	const [error, setError] = useState('')

	const handleUpload = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!file || !title) return

		setIsUploading(true)
		setError('')

		try {
			await videoService.uploadVideo(file, title)
			router.push('/')
		} catch (err) {
			setError('Failed to upload video. Please try again.')
		} finally {
			setIsUploading(false)
		}
	}

	return (
		<div className='max-w-2xl mx-auto p-8 mt-10 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl'>
			<h1 className='text-3xl font-bold mb-6 text-white'>Upload New Video</h1>

			{error && (
				<div className='mb-4 p-4 bg-red-900/20 border border-red-900/50 text-red-400 rounded-lg'>
					{error}
				</div>
			)}

			<form onSubmit={handleUpload} className='space-y-6'>
				<div>
					<label className='block text-sm font-medium text-zinc-300 mb-2'>
						Video Title
					</label>
					<input
						type='text'
						required
						className='w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-white placeholder-zinc-600'
						placeholder='Enter a catchy title...'
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
				</div>

				<div>
					<label className='block text-sm font-medium text-zinc-300 mb-2'>
						Video File
					</label>
					<div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-zinc-800 border-dashed rounded-lg hover:border-blue-500 transition bg-zinc-950'>
						<div className='space-y-1 text-center'>
							<svg
								className='mx-auto h-12 w-12 text-zinc-500'
								stroke='currentColor'
								fill='none'
								viewBox='0 0 48 48'
							>
								<path
									d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
							<div className='flex text-sm text-zinc-400 justify-center mt-2'>
								<label className='relative cursor-pointer rounded-md font-medium text-blue-500 hover:text-blue-400 focus-within:outline-none'>
									<span>Upload a file</span>
									<input
										type='file'
										className='sr-only'
										accept='video/mp4,video/x-m4v,video/*'
										onChange={e => setFile(e.target.files?.[0] || null)}
									/>
								</label>
							</div>
							<p className='text-xs text-zinc-600 mt-2'>MP4 up to 2GB</p>
						</div>
					</div>
					{file && (
						<p className='mt-3 text-sm text-green-400 font-medium'>
							Selected: {file.name}
						</p>
					)}
				</div>

				<button
					type='submit'
					disabled={!file || !title || isUploading}
					className='w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed transition'
				>
					{isUploading ? 'Uploading...' : 'Upload Video'}
				</button>
			</form>
		</div>
	)
}
