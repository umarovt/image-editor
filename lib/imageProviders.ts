export interface ImageProvider {
  getImageUrl(
    id: string,
    width: number,
    height: number,
    options: ImageOptions
  ): string;
  getImageList(page: number, limit: number): Promise<ImageInfo[]>;
  getThumbnailUrl(id: string, width: number, height: number): string;
  getImageInfo(id: string): Promise<ImageInfo>;
}

export interface ImageOptions {
  grayscale: boolean;
  blur: number;
}

export interface ImageInfo {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  downloadUrl: string;
}

class LoremPicsumProvider implements ImageProvider {
  getImageUrl(
    id: string,
    width: number,
    height: number,
    options: ImageOptions
  ): string {
    let url = `https://picsum.photos/id/${id}/${width}/${height}?`;
    if (options.grayscale) url += "grayscale&";
    if (options.blur > 0) url += `blur=${options.blur}&`;
    return url.slice(0, -1); // Remove trailing '&' or '?'
  }

  getThumbnailUrl(id: string, width: number, height: number): string {
    return `https://picsum.photos/id/${id}/${width}/${height}`;
  }

  async getImageList(page: number, limit: number): Promise<ImageInfo[]> {
    const res = await fetch(
      `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
    );
    if (!res.ok) throw new Error("Failed to fetch images");
    const data = await res.json();
    return data.map(
      (item: {
        id: string;
        author: string;
        width: number;
        height: number;
        url: string;
        download_url: string;
      }) => ({
        id: item.id,
        author: item.author,
        width: item.width,
        height: item.height,
        url: item.url,
        downloadUrl: item.download_url,
      })
    );
  }

  async getImageInfo(id: string): Promise<ImageInfo> {
    const res = await fetch(`https://picsum.photos/id/${id}/info`);
    if (!res.ok) throw new Error("Failed to fetch image info");
    const data = await res.json();
    return {
      id: data.id,
      author: data.author,
      width: data.width,
      height: data.height,
      url: data.url,
      downloadUrl: data.download_url,
    };
  }
}

export const loremPicsumProvider = new LoremPicsumProvider();

export function getImageProvider(
  provider: string = "loremPicsum"
): ImageProvider {
  switch (provider) {
    case "loremPicsum":
      return loremPicsumProvider;
    default:
      throw new Error(`Unsupported image provider: ${provider}`);
  }
}
