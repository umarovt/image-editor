interface DownloadButtonProps {
    fullImageUrl: string
    id: string
  }
  
  export function DownloadButton({ fullImageUrl, id }: DownloadButtonProps) {
    const handleDownload = () => {
      const link = document.createElement('a')
      link.href = fullImageUrl
      link.download = `edited_image_${id}.jpg`
      link.click()
    }
  
    return (
      <button
        onClick={handleDownload}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Download Image
      </button>
    )
  }