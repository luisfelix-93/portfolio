import React from 'react'
import './index.scss'
import { Link, NavLink } from 'react-router-dom'
import LogoS from '../../assets/images/logo_felix.jpeg'
import LogoSubtitle from '../../assets/images/logo_sub_felix.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDisplay, faEnvelope, faHome, faUser } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Sidebar = () => (
    <div className='nav-bar'>
        <Link className='logo' to='/portfolio/'>
            <img src={LogoS} alt='logo' />
            <img className="sub-logo" src={LogoSubtitle} alt='slobodan' />
        </Link>
        <nav>
            <ul>
                <li>
                    <NavLink exact="true" activeclassname="active" to="/portfolio/">
                    <FontAwesomeIcon icon={faHome} color='#4d4d4e'/>
                </NavLink>
                </li>
                <li>
                    <NavLink exact="true" activeclassname="active" className='about-link' to="/portfolio/about">
                    <FontAwesomeIcon icon={faUser} color='#4d4d4e'/>
                </NavLink>
                </li>
                <li>
                    <NavLink exact="true" activeclassname = "active" className='skills-link' to="/portfolio/skills">
                    <FontAwesomeIcon icon={faDisplay} color='#4d4d4e' />
                    </NavLink>
                </li>
                <li>
                    <NavLink exact="true" activeclassname="active" className='contact-link' to="/portfolio/contact">
                    <FontAwesomeIcon icon={faEnvelope} color='#4d4d4e'/>
                </NavLink>
                </li>
            </ul>


        </nav>
        <ul>
            <li>
                <a
                target='_blank'
                rel='noreferrer'
                href='https://www.linkedin.com/in/luis-felix-filho/'>
                    <FontAwesomeIcon icon={faLinkedin} color='#4d4d4e'/>
                </a>
            </li>
            <li>
                <a
                target='_blank'
                rel='noreferrer'
                href='https://github.com/luisfelix-93'>
                    <FontAwesomeIcon icon={faGithub} color='#4d4d4e'/>
                </a>
            </li>
        </ul>
    </div>
)

export default Sidebar