import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
const Navbar = () => {
    let auth = localStorage.getItem("users")
    let navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/signup");
    }
    
    return(
        <div>
           { auth ? <ul className='nav-ul'>
                 <li><Link className='links' to="/">Products</Link></li>
                <li><Link className='links' to="/add">Add Products</Link></li>
                <li><Link className='links' to="/update">Update Product</Link></li>
                <li><Link className='links' to="/profile">Profile</Link></li>
                <li><Link className='links'onClick={logout} to="/signup">Logout ({JSON.parse(auth).name}) </Link></li>
                </ul>
                 :
                    <ul className='nav-ul float'>
                    <li><Link className='links' to="/login">Login</Link></li>
                    <li><Link className='links' to="/signup">Signup</Link></li>
                    </ul>
                } 
            
        </div>
    )
}
export default Navbar;