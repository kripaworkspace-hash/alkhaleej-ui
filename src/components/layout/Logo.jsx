import logoUrl from '../../assets/images/logo-alkhaleej.png'

function Logo({ className = '' }) {
  return (
    <img
      src={logoUrl}
      alt="Al Khaleej Sugar"
      width={239}
      height={60}
      className={className}
    />
  )
}

export default Logo
