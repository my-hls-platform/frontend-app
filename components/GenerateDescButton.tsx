'use client'

import { videoService } from '@/services/api'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function GenerateDescButton({ videoId }: { videoId: string }) {
	const [isGenerating, setIsGenerating] = useState(false)
	const router = useRouter()

	const handleGenerate = async () => {
		setIsGenerating(true)
		try {
			await videoService.generateDescription(videoId)
			alert('Analysis requested! Check back in a few minutes.')
			router.refresh()
		} catch (error) {
			alert('Failed to start AI analysis.')
		} finally {
			setIsGenerating(false)
		}
	}

	return (
		<button
			onClick={handleGenerate}
			disabled={isGenerating}
			className='px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition disabled:bg-purple-300 flex items-center space-x-2'
		>
			{isGenerating ? (
				<span>Processing...</span>
			) : (
				<>
					<svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M13 10V3L4 14h7v7l9-11h-7z'
						/>
					</svg>
					<span>Generate with Bedrock</span>
				</>
			)}
		</button>
	)
}
