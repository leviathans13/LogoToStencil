"use client";

import { ChangeEvent, useRef } from "react";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  disabled?: boolean;
}

export default function FileUpload({ onFileSelect, disabled = false }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Validate file type
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a PNG or JPG file");
        onFileSelect(null);
        return;
      }
      
      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("File size should not exceed 10MB");
        onFileSelect(null);
        return;
      }
    }
    
    onFileSelect(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept=".png,.jpg,.jpeg,image/png,image/jpeg"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
      
      <div
        onClick={handleClick}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          disabled
            ? "border-gray-300 bg-gray-50 cursor-not-allowed"
            : "border-blue-400 bg-blue-50 hover:bg-blue-100 cursor-pointer"
        }`}
      >
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-700">
            {disabled ? "Processing..." : "Click to upload"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            PNG or JPG (max 10MB)
          </p>
        </div>
      </div>
    </div>
  );
}
