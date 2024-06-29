import { useLoaderData } from "react-router-dom";
import { deleteItem, getAllMatchingItems, createExpense } from "../helpers";
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";
import { toast } from "react-toastify";

//loader
export async function budgetLoader({ params }) {
    const budget = await getAllMatchingItems({
        category: 'budgets',
        key: 'id',
        value: params.id    
        //This is used to check if it matches the value. This gives back an array, hence using [0] to get the first value
        //We are looking the params that we haved passed and the id
        //This 'id' is what we mentioned in the App.js
        //If we wrote the path as budget/:abc then we will write the value as params.abc    
    })[0];

    const expenses = await getAllMatchingItems({
        category: 'expenses',
        key: 'budgetId',
        value: params.id    //The budgetid should match the params.id    
    }); //Here no [0] bcz we want all the items in the array and not just the first

    if(!budget) {
        throw new Error('Could not find that budget');  
    }

    return { budget, expenses }
}

//action
export async function budgetAction ({ request }) {    //pull the action in App.js

    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data)

    if(_action === 'createExpense'){  
        try{
          createExpense({
            name: values.newExpense,
            amount: values.newExpenseAmount,
            budgetId: values.newExpenseBudget
          })
          return toast.success(`Expense for ${values.newExpense} created!`)
        } catch (e) {
          throw new Error("There was a problem creating your Expense.")
        }
      } 

    if (_action === "deleteExpense") {
        try {
          deleteItem({
            key: "expenses",
            id: values.expenseId,
          });
          return toast.success("Expense deleted!");
        } catch (e) {
          throw new Error("There was a problem deleting your expense.");
        }
      }
}

const BudgetPage = () => {

    const { budget, expenses } = useLoaderData();
 
    return <div className="grid-lg" style={{ "--accent": budget.color }}> //using style to set the color of the budget in all the page
        <h1 className="h2"> <span className="accent"> {budget.name} </span> Overview </h1>

        <div className="flex-lg">
            <BudgetItem budget={budget} showDelete = {true} />  
            {/* When set to true it hides the button */}
            <AddExpenseForm budgets={[budget]} />
            {/* This normally should be an array of all of our budgets, but if we pass just one budget as passed above
            then it will show only the form of that budget in the form
            Say, the bidget name is 'Groceries' then the expense form's header will have 'Groceries' written in the accent color
            Otherwise it will not scope to a specific budget, and display 'Add New Expense' without showing the name of the budget
            */}

            {expenses && expenses.length > 0 && (
                <div className="grid-md">
                    <h2><span className="accent">{budget.name}</span> Expenses </h2>
                    <Table expenses={expenses} showBudget = {false} />
                </div>
            )}

        </div>

    </div>
}

export default BudgetPage;