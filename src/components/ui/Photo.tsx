import Image from "next/image";
import { photos, type PhotoKey } from "@/content/photos";

type Props = {
  k: PhotoKey;
  sizes: string;
  ratio?: string; // CSS aspect-ratio, e.g. "4/5". Omit to use the photo's own.
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  reveal?: boolean; // clip-path wipe + settle on scroll
  parallax?: number; // 0–0.15
  position?: string;
};

export function Photo({ k, sizes, ratio, className = "", imgClassName = "", priority, reveal = true, parallax = 0, position = "50% 50%" }: Props) {
  const p = photos[k];
  return (
    <div
      className={`photo-frame ${className}`}
      style={{ aspectRatio: ratio ?? `${p.w}/${p.h}` }}
      data-clip={reveal ? "" : undefined}
    >
      <div className="absolute -inset-y-[8%] inset-x-0" data-parallax={parallax || undefined} data-settle={reveal ? "" : undefined}>
        <Image
          src={p.src}
          alt={p.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imgClassName}`}
          style={{ objectPosition: position }}
        />
      </div>
    </div>
  );
}
