import {useEffect, useState} from 'react'
import {
    faNode,
    faPython,
    faGitAlt,
    faGithub,
    faReact,
  } from '@fortawesome/free-brands-svg-icons'
  import Loader from 'react-loaders'
  import AnimatedLetters from '../AnimatedLetters'
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.scss'
import { faServer } from '@fortawesome/free-solid-svg-icons'
const About = () => {
    const [letterClass, setLetterClass] = useState("text-animate");

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)
    }, []);

  return (
    <>
        <div className='container about-page'>
        <div className='text-zone'>
            <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
              idx={15}
            />
            </h1>
            <p align = 'LEFT'>
                Formerly a mechanical engineer, passionate about technology, and currently a back-end developer.</p>
            <p>
                I am a mechanical engineer with a strong interest in technology. After years of working in the engineering field, I decided to make a career transition to software development. Today, I work as a back-end developer with technologies nodeJS, .NET c#, Python, and MySQL and SQL Server databases
            </p>
            <p>
            In addition to my technical skills, I am also interested in DevOps. Recently, I started studying about the subject and I am excited to apply my knowledge to future projects.
            </p>
        </div>
        <div className='stage-cube-cont'>
            <div className='cubespinner'>
            <div className="face1">
            <FontAwesomeIcon icon={faNode} style={{color: "#1e3050",}} />
            </div>
            <div className="face2">
              <FontAwesomeIcon icon={faGithub} color="#000" />
            </div>
            <div className="face3">
            <FontAwesomeIcon icon={faServer} />
            </div>
            <div className="face4">
              <FontAwesomeIcon icon={faReact} color="#5ED4F4" />
            </div>
            <div className="face5">
              <FontAwesomeIcon icon={faPython} color="#EFD81D" />
            </div>
            <div className="face6">
              <FontAwesomeIcon icon={faGitAlt} color="#EC4D28" />
            </div>
            </div>
        </div>
        </div>
        <Loader type="pacman" />
    </>

    
    
  )
}

export default About