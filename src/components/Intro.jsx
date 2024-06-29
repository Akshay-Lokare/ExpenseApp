import { Form } from "react-router-dom";
import illustration from '../assets/illustration.jpg';
import { UserPlusIcon } from "@heroicons/react/24/solid";

const Intro = () => {
    return(
        <div className="intro">
            <div>
                <h1>Take Control of <span className="accent">Your Money</span></h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi, non!</p>

                <Form method="post">
                    <input type="text" name="userName" required placewholder="Your Name" autoComplete="given-name"/>
                
                    {/* 
                    This keep it hidden 
                    This name will be the one we will look for while submitting a form
                    */}
                    <input type="hidden" name="_action" value="newUser" />

                    <button className="btn btn--dark" >
                        <span>Get Started</span>
                        <UserPlusIcon width={20} />
                    </button>

                </Form>

            </div>
            <img src={illustration} alt="Rich Guy" />
        </div>
    );
}

export default Intro;