'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ImageOptions } from '@/lib/imageProviders'
import { debounce } from 'lodash'
import { ImagePreview } from './ImagePreview'
import { ImageControls } from './ImageControls'
import { DownloadButton } from './DownloadButton'
import { useProgressiveImage } from '@/app/hooks/useProgressiveImage'

export default function ImageEditor({ id }: { id: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [width, setWidth] = useState(Number(searchParams.get('width')) || 300)
  const [height, setHeight] = useState(Number(searchParams.get('height')) || 200)
  const [grayscale, setGrayscale] = useState(searchParams.get('grayscale') === 'true')
  const [blur, setBlur] = useState(Number(searchParams.get('blur')) || 0)

  const imageOptions: ImageOptions = { grayscale, blur }
  const { imageInfo, imageUrl, fullImageUrl, isLoading } = useProgressiveImage(id, width, height, imageOptions)

  const updateParams = useCallback(
    debounce((updates: Record<string, string>) => {
      const newParams = new URLSearchParams(searchParams)
      Object.entries(updates).forEach(([key, value]) => {
        newParams.set(key, value)
      })
      router.push(`/edit/${id}?${newParams.toString()}`, { scroll: false })
    }, 300),
    [id, router, searchParams]
  )

  useEffect(() => {
    updateParams({ width: width.toString(), height: height.toString(), grayscale: grayscale.toString(), blur: blur.toString() })
  }, [width, height, grayscale, blur, updateParams])

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight)
    if (imageInfo) {
      const aspectRatio = imageInfo.width / imageInfo.height
      setWidth(Math.round(newHeight * aspectRatio))
    }
  }

  if (!imageInfo) {
    return <div>Loading image information...</div>
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <ImagePreview
        imageUrl={imageUrl}
        fullImageUrl={fullImageUrl}
        isLoading={isLoading}
        imageInfo={imageInfo}
      />
      <div className="flex-1 space-y-4">
        <ImageControls
          height={height}
          width={width}
          grayscale={grayscale}
          blur={blur}
          onHeightChange={handleHeightChange}
          onGrayscaleChange={setGrayscale}
          onBlurChange={setBlur}
        />
        <DownloadButton fullImageUrl={fullImageUrl} id={id} />
        <button
          onClick={() => router.back()}
          className="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 mt-4"
        >
          Back to Gallery
        </button>
      </div>
    </div>
  )
}