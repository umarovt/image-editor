import { Suspense } from 'react'
import ImageList from '@/components/ImageList'
import Pagination from '@/components/Pagination'

export default function Home({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = Number(searchParams.page) || 1

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Image Gallery</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ImageList page={currentPage} />
      </Suspense>
      <Pagination currentPage={currentPage} />
    </main>
  )
}