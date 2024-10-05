'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Pagination({ currentPage }: { currentPage: number }) {
  const router = useRouter()

  return (
    <div className="flex justify-center mt-8 space-x-4">
      <Link
        href={`/?page=${currentPage - 1}`}
        className={`px-4 py-2 rounded ${
          currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
        onClick={(e) => {
          if (currentPage === 1) e.preventDefault()
          else router.push(`/?page=${currentPage - 1}`)
        }}
      >
        Previous
      </Link>
      <Link
        href={`/?page=${currentPage + 1}`}
        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        onClick={() => router.push(`/?page=${currentPage + 1}`)}
      >
        Next
      </Link>
    </div>
  )
}