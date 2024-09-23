import { useState } from 'react';
import { StarOutlined, StarFilled } from '@ant-design/icons';

interface StarRatingProps {
  totalStars?: number; // Общее количество звезд, по умолчанию 5
}

export const StarRating: React.FC<StarRatingProps> = ({ totalStars = 5 }) => {
  const [rating, setRating] = useState<number>(0);

  const handleClick = (index: number) => {
    setRating(index + 1); // Устанавливаем рейтинг, начиная с 1
  };

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          className="star"
          onClick={() => handleClick(index)}
        >
          {index < rating ? <StarFilled className="filled" /> : <StarOutlined className="outlined" />}
        </span>
      ))}
    </div>
  );
};
