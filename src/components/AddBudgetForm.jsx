import { Form, useFetcher } from "react-router-dom";
import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";


export default function AddBudgetForm() {

//We want to clear the form when we submit the budget data
//To do this we need to find a way to track the state of the submitted form
//For this we can use a hook called useFetcher
//Replace <Form> to <fetcher.Form>
//With this fetcher we get access to the state of the Form 

    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === 'submitting';

    const formRef = useRef();  //point it to Form tag
    const focusRef = useRef();  //point it to the input field

    useEffect(() => {
        if(!isSubmitting){
        //if its done submitting then...    

        formRef.current.reset();    //this function will reset the form to empty
        focusRef.current.focus();   //this will focus on the input field after submitting

        }
    }, [isSubmitting]);
    //the dependencies tells when this hook should run...so run anytime isSubmitting changes

    return (
        <div className="form-wrapper">
            <h2>Create a Budget</h2>
           
            <fetcher.Form method="post" className="gird-sm" ref={formRef} >
           
            <div className="grid-xs">
                <label>Budget</label>
                <input 
                    type="text" 
                    name="newBudget" 
                    id="newBudget"
                     placeholder="eg: 
                     Groceries" 
                     required 
                     ref={focusRef}
                />
            </div>
            <div className="grid-xs">
                <label>Amount</label>
                <input 
                    type="number" 
                    name="newBudgetAmount" 
                    id="newBudgetAmount" 
                    placeholder="eg: Rs 100" 
                    required 
                    step='1'            //step 1 means 1 increment, here it increases by 10 Rs
                    inputMode="decimal" //opens the numerics keypad on cell phones
                />
            </div>
            <input type="hidden" name="_action" value="createBudget" />
            <button 
                type="submit"
                className="btn btn--dark"
                disabled={isSubmitting}
            >
            {
                isSubmitting ? <span>Submitting...</span> : <><span>Create Budget</span> <CurrencyRupeeIcon width={20} /> </>
            }
            </button>

            </fetcher.Form>
        </div>
    )
}