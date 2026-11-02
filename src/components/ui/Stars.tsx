/** Five small stars. Empty (outline) by default, like the template. */
export default function Stars({ rating = 0, size = 10 }: { rating?: number; size?: number }) {
  return (
    <div className="flex gap-[2px]" role="img" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= Math.round(rating);
        return (
          <svg
            key={n}
            width={size}
            height={size}
            className={filled ? 'text-[#f5a623]' : 'text-[#ccc]'}
            viewBox="0 0 24 24"
            fill={filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      })}
    </div>
  );
}