import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, logout, signInWithGoogle } from '../firebase'
import '../styles/navbar.css'

const Navbar = () => {

    const [user, loading ] = useAuthState(auth)
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const handleLogout = () => {
        logout();
    }

    const handleLogin = () => {
        signInWithGoogle()
    }


    return (
        <div className="navbar">
            //notes app
            {user?.isAnonymous && <div className="anonymous">Anonymous - all data will be lost</div>}
            {!user || loading ? (
                <button onClick={handleLogin} className="login-button">Login</button>
            ) : (
                <div>
                    <div className="profile-image-container" onClick={toggleDropdown}>
                        <img
                        src={user.photoURL ? user.photoURL : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
                        alt={user.displayName ? user.displayName : "User"}
                        className="profile-image"
                        />
                        <span className={`arrow${showDropdown ? " arrow-up" : ""}`}></span>
                    </div>
                    <div className={`dropdown${showDropdown ? " show-dropdown" : ""}`}>
                        <a onClick={handleLogout}>Logout</a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;