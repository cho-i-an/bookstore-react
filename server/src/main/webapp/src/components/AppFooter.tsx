import '../assets/css/AppFooter.css'
import '../assets/css/global.css'
import {Link} from "react-router-dom";
import instaImage from '../assets/images/site/sns-insta.svg';
import twitterImage from '../assets/images/site/sns-twitter.svg';
import facebookImage from '../assets/images/site/sns-facebook.svg';
import youtubeImage from '../assets/images/site/sns-youtube.svg';

function AppFooter(){
return(
    <footer className="container">
        <section className="links">
            <Link to="/">Home</Link>
            <p>｜</p>
            <Link to="/about">About</Link>
            <p>｜</p>
            <Link to="/directions">Directions</Link>
            <p>｜</p>
            <Link to="/contact">Contact</Link>
        </section>
        <section className="social-media-icons-and-copyright">
            <div className="social-media-icons">
                <a className="button">
                    <img src={instaImage} alt="Instagram" />
                </a>
                <a className="button">
                    <img src={twitterImage} alt="Twitter" />
                </a>
                <a className="button">
                    <img src={facebookImage} alt="Facebook" />
                </a>
                <a className="button">
                    <img src={youtubeImage} alt="Youtube" />
                </a>
            </div>
            <p className="copyright">
                Copyright © 2023 Wisdom Wings Online Bookstore. All rights reserved.
            </p>
        </section>
    </footer>
)
}
export default AppFooter;
