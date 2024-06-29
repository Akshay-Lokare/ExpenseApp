import { useRouteError, Link, useNavigate } from "react-router-dom";
import { HomeIcon, ArrowUturnLeftIcon  } from "@heroicons/react/24/solid"; 

export default function Error() {

    const error = useRouteError();  //gives us access to the error msgs
    //console.log(error);
    const navigate = useNavigate();

    return(
        <div className="error">
            <h1>Oops, an <span className="accent">Error</span> occured</h1>
            <p> {error.message || error.statusText} </p>

            {/* actions for users */}
            <div className="flex-md">

                <button 
                    className="btn btn--dark"
                    onClick={() => navigate(-1)} //-1 means go back one page, -2 means go back 2 pages etc                   
                >
                    <ArrowUturnLeftIcon width={20} />
                    <span>Go Back</span>
                </button>

                <Link to='/' className="btn btn--dark" > 
                    <span>Home</span> 
                    <HomeIcon width={20} />    
                </Link>

            </div>

        </div>
    );
}