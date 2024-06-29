import { Form, NavLink } from "react-router-dom";

import { TrashIcon } from '@heroicons/react/24/solid';

import logomark from "../assets/logomark.svg";

//If a userName (user) then execute the following
export default function Nav({ userName }) {
    return(
    <nav>
    <NavLink to='/' aria-label="Go to home" >
        <img src={logomark} height={30} />
        <span>Home</span>
    </NavLink>     

    { userName && 
    <Form
        method="post"
        action="logout"
        onSubmit={(event) => {
            if(!confirm("Do you really want to delete your account?")) {
                event.preventDefault();
            }
        }}
    >
        
    <button type="submit" className="btn btn--warning">
        <span>Delete User</span>
        <TrashIcon width={20} />
    </button>

    </Form> }

    </nav>
    );
}