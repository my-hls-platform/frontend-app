import Hls from 'hls.js'
import { useEffect, useRef } from 'react'

interface HlsPlayerProps {
	src: string
}

export const HlsPlayer = ({ src }: HlsPlayerProps) => {
	const videoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		const video = videoRef.current
		if (!video) return
		let hls: Hls

		if (Hls.isSupported()) {
			hls = new Hls({
				maxBufferLength: 30,
				enableWorker: true,
			})

			hls.loadSource(src)
			hls.attachMedia(video)
		} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
			video.src = src
		}

		return () => {
			if (hls) {
				hls.destroy()
			}
		}
	}, [src])

	return <video ref={videoRef} controls className='w-full aspect-video'></video>
}
