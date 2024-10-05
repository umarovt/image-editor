import Image from 'next/image'
import { ImageInfo } from '@/lib/imageProviders'

interface ImagePreviewProps {
  imageUrl: string
  fullImageUrl: string
  isLoading: boolean
  imageInfo: ImageInfo
}

export function ImagePreview({ imageUrl, fullImageUrl, isLoading, imageInfo }: ImagePreviewProps) {
  return (
    <div className="flex-1 relative">
      <div style={{ paddingBottom: `${(imageInfo.height / imageInfo.width) * 100}%` }} className="relative">
        <Image
          src={isLoading ? imageUrl : fullImageUrl}
          alt="Edited image"
          fill
          style={{ objectFit: 'contain' }}
          className={isLoading ? 'filter blur-sm' : ''}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}
      </div>
    </div>
  )
}