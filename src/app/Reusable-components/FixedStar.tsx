import StarIcon from "@/app/Reusable-components/starticon";

// Define the props interface
interface StarRatingProps {
  totalStars?: number;
  rating: number; // Dynamically pass rating
}

const StarRatingfixed: React.FC<StarRatingProps> = ({ totalStars = 5, rating }) => {
  return (
    <div className="flex space-x-2">
      {Array.from({ length: totalStars }, (_, index) => (
        <StarIcon
          key={index}
          filled={index < rating} // Fill stars up to the given rating
          size={30}
        />
      ))}
    </div>
  );
};

export default StarRatingfixed;
