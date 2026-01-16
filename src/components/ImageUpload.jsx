import { useRef } from 'react';
import { Upload, Image } from 'lucide-react';

export default function ImageUpload({ imageUrl, onImageSelect, isLoading }) {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <div 
      className={`image-upload ${imageUrl ? 'has-image' : ''}`}
      onClick={handleClick}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      
      {imageUrl ? (
        <img src={imageUrl} alt="Selected" />
      ) : (
        <div className="flex flex-col items-center gap-2 text-gray-400">
          {isLoading ? (
            <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full" />
          ) : (
            <>
              <Upload className="w-8 h-8" />
              <span className="text-sm">Upload image for mood</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
