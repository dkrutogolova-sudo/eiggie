/**
 * SVG "gooey" filters — the trick behind the liquid wordmark and the metaball
 * cursor. Render <GooDefs/> once near the root.
 *
 * NOTE: color-interpolation-filters is left at its default (linearRGB) on
 * purpose — that's what gives the blur its soft, smeared halo. Forcing sRGB
 * here makes the blobs crisp and "plain", which is not the look we want.
 * Wide filter regions so the blur isn't clipped on very large / wide type.
 */
export function GooDefs() {
  return (
    <svg
      aria-hidden
      width="0"
      height="0"
      style={{ position: "absolute", pointerEvents: "none" }}
    >
      <defs>
        <filter id="goo-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
        <filter id="goo-hard" x="-50%" y="-90%" width="200%" height="280%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -11"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}
