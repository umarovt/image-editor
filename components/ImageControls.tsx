interface ImageControlsProps {
    height: number
    width: number
    grayscale: boolean
    blur: number
    onHeightChange: (height: number) => void
    onGrayscaleChange: (grayscale: boolean) => void
    onBlurChange: (blur: number) => void
  }
  
  export function ImageControls({
    height,
    width,
    grayscale,
    blur,
    onHeightChange,
    onGrayscaleChange,
    onBlurChange,
  }: ImageControlsProps) {
    return (
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Height:</label>
          <input
            type="number"
            value={height}
            onChange={(e) => onHeightChange(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Width (auto-adjusted):</label>
          <input
            type="number"
            value={width}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={grayscale}
              onChange={(e) => onGrayscaleChange(e.target.checked)}
              className="mr-2"
            />
            Grayscale
          </label>
        </div>
        <div>
          <label className="block mb-2">Blur (1-10):</label>
          <input
            type="range"
            min="0"
            max="10"
            value={blur}
            onChange={(e) => onBlurChange(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    )
  }