import { useState } from "react";
import StarIcon from "@/app/Reusable-components/starticon";

// Define the props interface
interface StarRatingProps {
  totalStars?: number;
  onRatingSelect?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ totalStars = 5, onRatingSelect }) => {
  const [rating, setRating] = useState<number>(0); // Define state type explicitly

  const handleClick = (star: number) => {
    setRating(star);
    if (onRatingSelect) {
      onRatingSelect(star);
    }
  };

  return (
    <div className="flex space-x-2">
      {Array.from({ length: totalStars }, (_, index) => (
        <StarIcon
          key={index}
          filled={index < rating}
          size={30}
          onClick={() => handleClick(index + 1)}
        />
      ))}
    </div>
  );
};

export default StarRating;

