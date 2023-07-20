import React, { PureComponent } from 'react'
import twitter from '../../../images/twitter.png'
import appplay from '../../../images/appplay.png'
import insta from '../../../images/insta.png'
import whatsapp from '../../../images/whatsapp.png'
import pixelmart from '../../../images/pixelmart.png'
import './footer.css';

export class Footer extends PureComponent {
  render() {
    return (
      <footer id="footer">
        <div className = "leftfooter">
            <h2 id="downloadoutapp">DOWNLOAD OUR MOBILE-APP</h2>
            <img id="appplay" src={appplay}></img>
        </div>
        <div className = "midfooter">
            <img id="pixelmart" src={pixelmart}></img>
            <h2>"EMBRACE THE JOY OF SHOPPING: UNVEIL OUR E-COMMERCE WONDERLAND"</h2>
            <h4>Copyright 2023 Ⓒ All Rights Reserved</h4>
            <h4>Developed by Prathmesh Pawar</h4>
        </div>
        <div className = "rightfooter">
            <h2>CONNECT US ON</h2>
            <img id="twit" src={twitter}></img>
            <img id="insta" src={insta}></img>
            <img id="whatsapp" src={whatsapp}></img>

        </div>
      </footer>
    )
  }
}

export default Footer