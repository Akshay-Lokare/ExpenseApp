import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import { useFetcher, Form } from "react-router-dom";

const AddExpenseForm = ({ budgets }) =>{

  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting'

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if(!isSubmitting){
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return(
    <div className="form-wrapper">

      <h2 className="h3">Add New {" "} <span className="accent">
          { budgets.length === 1 && `${budgets.map(( budg ) => budg.name )}`}
        </span>{" "} Expense
      </h2>    
      {/* The empty "" are for spaces */}

      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="expense-inputs">

          <div className="grid-xs">
            <label htmlFor="newExpense"> Expense Name </label>
            <input 
              type="text" 
              name="newExpense" 
              id="newExpense" 
              placeholder="eg: Coffee" 
              ref={focusRef} 
              required 
            />
          </div>

          <div className="grid-xs">
            <label htmlFor="newExpenseAmount"> Expense Name </label>
            <input 
              type="number" 
              name="newExpenseAmount" 
              id="newExpenseAmount" 
              step='1' 
              inputMode="decimal" 
              placeholder="eg: Rs 10" 
              ref={focusRef} 
              required 
            />
          </div>

        </div>
        
        {/* If we have only 1 budget then NOT display else display */}
        {/* Hide this when length of budget is equal to 1 */}
        <div className="grid-xs" hidden={budgets.length === 1}>  
          <label htmlFor="newExpenseBudget"> Budget Category</label>
          <select name="newExpenseBudget" id="newExpenseBudget" required >
            {
              //Sorting them based on when they were created. First one created will be at the top
              budgets
                .sort(( a, b ) => a.createdAt - b.createdAt )
                .map(( budget ) => (
                  <option key={budget.id} value={budget.id} >
                    {budget.name}
                  </option>
                ))
            }
          </select>
        </div>
        {/* _action tells us what we should do with the form when this button is pressed */}
        <input type="hidden" name="_action" value="createExpense" />
            <button 
                type="submit"
                className="btn btn--dark"
                disabled={isSubmitting}
            >
            {
                isSubmitting ? <span>Submitting...</span> : <><span>Create Expense</span> <PlusCircleIcon width={20} /> </>
            }
            </button>
      </fetcher.Form>

    </div>
  );
}

export default AddExpenseForm;