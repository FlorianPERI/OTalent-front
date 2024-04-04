import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../../store/redux-hook/hook";

export default function Navbar () {
  
  const [isConnected, setIsConnected] = useState(false)
  const [isMember, setIsMember] = useState(false)
  const user = useAppSelector((state) => state.token.user);

  // Gestionnaire de déconnexion
  const handleLogout = () => {
    localStorage.clear();
    setIsConnected(false)
    window.location.href = "/";
};

const checkIsOrganization = () => {
            
  if(user.id && user.member === false) {
    setIsMember(false)
  } else {
    setIsMember(true)
  }
}

useEffect(() => {
  checkIsOrganization()
})



    return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-15 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        {isMember && <li><NavLink to="/edit/member">Voir le profil</NavLink></li>}
        {!isMember && <li><NavLink to="/edit/organization">Voir le profil</NavLink></li>}
        <li><a onClick={handleLogout}>Se deconnecter</a></li>
      </ul>
    </div>
)
}