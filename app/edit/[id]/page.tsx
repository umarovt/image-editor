import ImageEditor from '@/components/ImageEditor'

export default function EditPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Image</h1>
      <ImageEditor id={params.id} />
    </div>
  )
}