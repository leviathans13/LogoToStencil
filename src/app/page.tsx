"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import FileUpload from "@/components/FileUpload";
import ImagePreview from "@/components/ImagePreview";
import LoadingState from "@/components/LoadingState";

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Create object URL from uploaded file
  const originalImageUrl = useMemo(() => {
    if (!uploadedFile) return null;
    return URL.createObjectURL(uploadedFile);
  }, [uploadedFile]);

  // Cleanup object URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (originalImageUrl) {
        URL.revokeObjectURL(originalImageUrl);
      }
    };
  }, [originalImageUrl]);

  // Process image when original URL is available
  useEffect(() => {
    if (!originalImageUrl) {
      setResultImageUrl(null);
      setIsProcessing(false);
      return;
    }

    // Use a flag to track if processing should continue
    let isActive = true;
    setIsProcessing(true);

    const timer = setTimeout(() => {
      if (isActive) {
        // For now, use the same image as result
        // This will be replaced with actual processing logic later
        setResultImageUrl(originalImageUrl);
        setIsProcessing(false);
      }
    }, 2000);

    return () => {
      isActive = false;
      clearTimeout(timer);
    };
  }, [originalImageUrl]);

  const handleFileSelect = useCallback((file: File | null) => {
    setUploadedFile(file);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {isProcessing && <LoadingState />}
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Logo To Stencil
          </h1>
          <p className="text-gray-600">
            Upload your logo and customize your report cover
          </p>
        </header>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            {/* Upload Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Upload & Settings
              </h2>
              
              <div className="space-y-6">
                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Image
                  </label>
                  <FileUpload
                    onFileSelect={handleFileSelect}
                    disabled={isProcessing}
                  />
                  {uploadedFile && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected: {uploadedFile.name}
                    </p>
                  )}
                </div>

                {/* Settings Placeholder */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Settings
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Brightness
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        defaultValue="100"
                        className="w-full"
                        disabled={!uploadedFile || isProcessing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contrast
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        defaultValue="100"
                        className="w-full"
                        disabled={!uploadedFile || isProcessing}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Threshold
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="255"
                        defaultValue="128"
                        className="w-full"
                        disabled={!uploadedFile || isProcessing}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    disabled={!uploadedFile || isProcessing}
                  >
                    Process Image
                  </button>
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                    onClick={() => handleFileSelect(null)}
                    disabled={!uploadedFile || isProcessing}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* Original Preview */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <ImagePreview
                imageUrl={originalImageUrl}
                title="Original Preview"
              />
            </div>
          </div>

          {/* Right Column - Result Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <ImagePreview
                imageUrl={resultImageUrl}
                title="Result Preview"
                loading={isProcessing}
              />
              
              {resultImageUrl && !isProcessing && (
                <div className="mt-4">
                  <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Download Result
                  </button>
                </div>
              )}
            </div>

            {/* Info Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                How to Use
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                <li>Upload your logo (PNG or JPG format)</li>
                <li>Adjust settings to customize the output</li>
                <li>Click &quot;Process Image&quot; to generate the stencil</li>
                <li>Download the result when ready</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
