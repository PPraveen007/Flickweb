import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { RiAccountCircleFill } from 'react-icons/ri'

export default function NavBar(props: any) {
    return (
        <nav className="base-flex nav-bar">
            <div className="base-flex nav-bar-div logo-holder">
                <img className="logo" src={logo} alt="Ehtrex Logo for top nav bar" />
                <h3>{props.mode}</h3>
            </div>
            <div className="base-flex nav-bar-div nav-link-holder">
                <Link to={{ pathname: "/" }} className="base-flex nav-links"> Home</Link>
                <Link to={{ pathname: "/movies" }} className="base-flex nav-links"> Movies</Link>
                <Link to={{ pathname: "/shows" }} className="base-flex nav-links"> Shows</Link>
            </div>
            <div className="base-flex nav-bar-div logout-holder">
                <Link to={{ pathname: "/profile" }} className="base-flex nav-links user-links"> <RiAccountCircleFill size={28} /></Link>
            </div>
        </nav>
    )
}