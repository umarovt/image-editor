import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import {
  getImageProvider,
  ImageOptions,
  ImageInfo,
} from "@/lib/imageProviders";

export function useProgressiveImage(
  id: string,
  width: number,
  height: number,
  options: ImageOptions
) {
  const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [fullImageUrl, setFullImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const imageProvider = getImageProvider();

  useEffect(() => {
    const fetchImageInfo = async () => {
      const info = await imageProvider.getImageInfo(id);
      setImageInfo(info);
      const aspectRatio = info.width / info.height;
      setImageUrl(
        imageProvider.getImageUrl(
          id,
          100,
          Math.round(100 / aspectRatio),
          options
        )
      );
      updateFullImage(width, height, options);
    };
    fetchImageInfo();
  }, [id]);

  const updateFullImage = useCallback(
    debounce(
      (newWidth: number, newHeight: number, newOptions: ImageOptions) => {
        setIsLoading(true);
        const newImageUrl = imageProvider.getImageUrl(
          id,
          newWidth,
          newHeight,
          newOptions
        );
        setFullImageUrl(newImageUrl);
        // Preload the image
        const img = new Image();
        img.src = newImageUrl;
        img.onload = () => setIsLoading(false);
      },
      300
    ),
    [id, imageProvider]
  );

  useEffect(() => {
    updateFullImage(width, height, options);
  }, [width, height, options, updateFullImage]);

  return { imageInfo, imageUrl, fullImageUrl, isLoading };
}
