import { Icon } from '@iconify/react';
import "../styles/logo.scss"

const Logo = () => {
  return (
    <div className="logo-container">
      <div className="logo">
      <div className="small-gear">
        <Icon icon="bi:gear-fill" color="#457D9F" height="38" />
      </div>
      <div className="bulb">
        <Icon icon="eva:bulb-outline" color="#A9DADC" height="86" />
      </div>
      <div className="big-gear">
        <Icon icon="bi:gear-fill" color="#183457" height="47" />
      </div>
      </div>
      <div className="title">
        <p>PiNiON <span>GAMES</span></p>
      </div>
    </div>
  )
}

export default Logo