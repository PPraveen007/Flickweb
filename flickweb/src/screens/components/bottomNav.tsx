import { Link } from 'react-router-dom'
import { RiAccountCircleFill } from 'react-icons/ri'
import { AiFillHome } from 'react-icons/ai';
import { MdMovie } from 'react-icons/md'
import { BiCameraMovie } from 'react-icons/bi'
import { useState } from 'react';

export default function BottomNav() {
    const [activeLink, setActiveLink] = useState<string>('home');

    return (
        <div className="base-flex bottom-nav">
            <div className="base-flex bottom-nav-link-holder">
                <Link onClick={() => setActiveLink("home")} to={{ pathname: "/" }} className={`base-flex bottom-nav-links ${activeLink === "home" ? "activeLink" : ""}`}> <AiFillHome size={25} color={activeLink === "home" ? "white" : "grey"} /></Link>
                <Link onClick={() => setActiveLink("movies")} to={{ pathname: "/movies" }} className={`base-flex bottom-nav-links ${activeLink === "movies" ? "activeLink" : ""}`}> <MdMovie size={25} color={activeLink === "movies" ? "white" : "grey"} /></Link>
                <Link onClick={() => setActiveLink("shows")} to={{ pathname: "/shows" }} className={`base-flex bottom-nav-links ${activeLink === "shows" ? "activeLink" : ""}`}> <BiCameraMovie size={25} color={activeLink === "shows" ? "white" : "grey"} /></Link>
                <Link onClick={() => setActiveLink("profile")} to={{ pathname: "/profile" }} className={`base-flex bottom-nav-links ${activeLink === "profile" ? "activeLink" : ""}`}> <RiAccountCircleFill size={26} color={activeLink === "profile" ? "white" : "grey"} /></Link>
            </div >
        </div >
    )
}