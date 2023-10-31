import {useState, useEffect} from 'react';
import AnimatedLetters from '../AnimatedLetters';
import { Link } from 'react-router-dom';
import './index.scss'

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const nameArray = ['L','u','i','s',' ', 'F','e','l','i','p','e',',']
    const jobArray = [
      'W',
      'e',
      'b',
      ' ',
      'D',
      'e',
      'v',
      'e',
      'l',
      'o',
      'p',
      'e',
      'r',
      '.',
    ]
  
    useEffect(() => {
      setTimeout(() => {
        setLetterClass('text-animate-hover')
      }, 4000)
    }, [])

    return(
        <>
        <div className="container home-page">
            <div className="text-zone">
            <h1>
            <span className={letterClass}>H</span>
            <span className={`${letterClass} _12`}>i,</span>
            <br />
            <span className={`${letterClass} _13`}>I</span>
            <span className={`${letterClass} _14`}>'m</span>
            <br />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={nameArray}
              idx={15}
            />
            <br />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={jobArray}
              idx={22}
            />
          </h1>
                <h2>Fullstack Developer | .NET c# | NodeJS | MongoDB | React</h2>
                <Link to='/portfolio/contact' className='flat-button'>
                    CONTACT ME
                </Link>
            </div>
        </div>
        </>
        
    )
}

export default Home;