import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png';



const Logo = () => {
  return(
    <div className='ma4 mt0'>
      <Tilt className="Tilt br2 shadow-2 bg1" options={{ max : 55 }} style={{ height: 115, width: 115 }} >
      <div className="Tilt-inner pa3">
        <img style={{paddingTop: '8px'}} src={brain} alt='brain logo'/>
      </div>
      </Tilt>
    </div>
  );
}



export default Logo;