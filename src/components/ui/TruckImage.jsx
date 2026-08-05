import truckClipart from '../../assets/images/truck-clipart.png'

/** Drop-in replacement for a lucide icon — same className/aria-hidden usage, so it slots into existing icon maps.
 * Pass `tint` to recolor the line-art (e.g. status-based green/grey) via a mask, since the source PNG is black-on-transparent. */
function TruckImage({ className, tint, ...props }) {
  if (tint) {
    return (
      <span
        aria-hidden="true"
        className={className}
        style={{
          display: 'inline-block',
          backgroundColor: tint,
          WebkitMaskImage: `url(${truckClipart})`,
          maskImage: `url(${truckClipart})`,
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
        }}
      />
    )
  }

  return <img src={truckClipart} alt="" className={className} {...props} />
}

export default TruckImage
