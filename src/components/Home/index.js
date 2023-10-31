import { Link } from 'react-router-dom';
import './index.scss'

const Home = () => {



    return(
        <div className="container home-page">
            <div className="text-zone">
                <h1>Hi, 
                    <br /> I'm 
                    <br /> Your
                    <br /> Web Developer.
                </h1>
                <h2>Backend Developer | .NET c# | JavaScript</h2>
                <Link to='/contact' className='flat-button'>
                    CONTACT ME
                </Link>
            </div>
            
        </div>
    )
}

export default Home;