import Image from 'next/image'
import Link from 'next/link'
import { getImageProvider, ImageInfo } from '@/lib/imageProviders'

async function getImages(page: number): Promise<ImageInfo[]> {
  const provider = getImageProvider()
  return provider.getImageList(page, 10)
}

export default async function ImageList({ page }: { page: number }) {
  const images = await getImages(page)
  const imageProvider = getImageProvider()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <Link key={image.id} href={`/edit/${image.id}`} className="block">
          <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <Image
              src={imageProvider.getThumbnailUrl(image.id, 300, 200)}
              alt={`Photo by ${image.author}`}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
              placeholder="blur"
              blurDataURL={imageProvider.getThumbnailUrl(image.id, 30, 20)}
            />
            <div className="p-4">
              <p className="text-sm font-medium">{image.author}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}