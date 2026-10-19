interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md';
  color?: string;
}

export default function StarRating({ rating, reviewCount, size = 'sm', color = '#EFAE32' }: StarRatingProps) {
  const starSize = size === 'sm' ? 12 : 14;
  const filled = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg key={star} width={starSize} height={starSize} viewBox="0 0 16 16" fill="none">
            {star <= filled ? (
              <path
                d="M8 1l1.854 3.757L14 5.52l-3 2.924.708 4.13L8 10.5l-3.708 2.073L5 8.443 2 5.52l4.146-.763L8 1z"
                fill={color}
              />
            ) : star === filled + 1 && hasHalf ? (
              <>
                <defs>
                  <linearGradient id={`half-${star}`}>
                    <stop offset="50%" stopColor={color} />
                    <stop offset="50%" stopColor="#E6E8F1" />
                  </linearGradient>
                </defs>
                <path
                  d="M8 1l1.854 3.757L14 5.52l-3 2.924.708 4.13L8 10.5l-3.708 2.073L5 8.443 2 5.52l4.146-.763L8 1z"
                  fill={`url(#half-${star})`}
                />
              </>
            ) : (
              <path
                d="M8 1l1.854 3.757L14 5.52l-3 2.924.708 4.13L8 10.5l-3.708 2.073L5 8.443 2 5.52l4.146-.763L8 1z"
                fill="#E6E8F1"
              />
            )}
          </svg>
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-[12px] text-[#6F7489]">
          {rating.toFixed(1)} ({reviewCount})
        </span>
      )}
    </div>
  );
}
