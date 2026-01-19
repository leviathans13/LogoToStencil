import Image from "next/image";

interface ImagePreviewProps {
  imageUrl: string | null;
  title: string;
  loading?: boolean;
}

export default function ImagePreview({ imageUrl, title, loading = false }: ImagePreviewProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      
      <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-sm text-gray-600">Processing...</p>
            </div>
          </div>
        ) : imageUrl ? (
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <svg
              className="mx-auto h-16 w-16 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="mt-2 text-sm">No image uploaded</p>
          </div>
        )}
      </div>
    </div>
  );
}
