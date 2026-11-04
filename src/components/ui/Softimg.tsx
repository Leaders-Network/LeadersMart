'use client';

import { useState } from 'react';

/** Plain <img> that turns into a grey box if the file is missing, so the layout never breaks. */
export default function SoftImg({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) return <div className={`bg-[#ececec] ${className}`} role="img" aria-label={alt} />;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}