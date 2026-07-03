const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export interface Video {
	id: string
	title: string
	hlsUrl?: string | null
	status: string
	description?: string | null
}

export const videoService = {
	async getVideos(searchQuery: string = ''): Promise<Video[]> {
		const url = new URL(`${API_URL}/videos`)
		if (searchQuery) {
			url.searchParams.append('search', searchQuery)
		}

		const response = await fetch(url.toString(), {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			cache: 'no-store',
		})

		if (!response.ok) throw new Error('Failed to fetch videos')
		return response.json()
	},

	async getVideoById(id: string): Promise<Video> {
		const response = await fetch(`${API_URL}/videos/${id}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			cache: 'no-store',
		})

		if (!response.ok) throw new Error('Video not found')
		return response.json()
	},

	async uploadVideo(file: File, title: string): Promise<Video> {
		const formData = new FormData()
		formData.append('file', file)
		formData.append('title', title)

		const response = await fetch(`${API_URL}/videos/upload`, {
			method: 'POST',
			body: formData,
		})

		if (!response.ok) throw new Error('Upload failed')
		return response.json()
	},

	async generateDescription(id: string): Promise<void> {
		const response = await fetch(`${API_URL}/videos/${id}/analyze`, {
			method: 'POST',
		})

		if (!response.ok) throw new Error('Failed to trigger AI analysis')
	},
}
