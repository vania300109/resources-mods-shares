import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: number;
}

export default function StarRating({ 
  rating, 
  onChange, 
  readonly = false,
  size = 20
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  
  const handleClick = (newRating: number) => {
    if (!readonly && onChange) {
      onChange(newRating);
    }
  };
  
  const handleMouseEnter = (starIndex: number) => {
    if (!readonly) {
      setHoverRating(starIndex);
    }
  };
  
  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };
  
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <Star
          key={starIndex}
          filled={(hoverRating || rating) >= starIndex}
          onClick={() => handleClick(starIndex)}
          onMouseEnter={() => handleMouseEnter(starIndex)}
          onMouseLeave={handleMouseLeave}
          readonly={readonly}
          size={size}
        />
      ))}
    </div>
  );
}

interface StarProps {
  filled: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  readonly: boolean;
  size: number;
}

function Star({ 
  filled, 
  onClick, 
  onMouseEnter, 
  onMouseLeave, 
  readonly,
  size
}: StarProps) {
  const sizeStyle = { width: `${size}px`, height: `${size}px` };
  
  return (
    <span
      onClick={readonly ? undefined : onClick}
      onMouseEnter={readonly ? undefined : onMouseEnter}
      onMouseLeave={readonly ? undefined : onMouseLeave}
      style={sizeStyle}
      className={`
        cursor-${readonly ? 'default' : 'pointer'}
        text-${filled ? 'yellow-400' : 'gray-300'}
        transition-colors duration-150
      `}
    >
      <svg 
        viewBox="0 0 24 24" 
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor" 
        strokeWidth="2"
        className="w-full h-full"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </span>
  );
}