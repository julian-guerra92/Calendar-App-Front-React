import { useAuthStore } from '../../hooks/useAuthStore';

export const NavBar = ({ onChangeLenguage }) => {

   const { startLogout, user } = useAuthStore();

   return (
      <div className="navbar navbar-dark bg-dark mb-4 px-4">
         <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp;
            {user.name}
         </span>

         <button
            className="btn btn-outline-primary"
            onClick={onChangeLenguage}
         >
            <i className="fas fa-wand-magic-sparkles"></i>
            &nbsp;
            <span>Change Lenguage</span>
         </button>

         <button className="btn btn-outline-danger" onClick={startLogout}>
            <i className="fas fa-sign-out-alt"></i>
            &nbsp;
            <span>Exit</span>
         </button>
      </div>
   )
}
