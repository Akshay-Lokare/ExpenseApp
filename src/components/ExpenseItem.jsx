import { TrashIcon } from "@heroicons/react/24/solid";
import { formatCurrency, formatDateToLocaleString, getAllMatchingItems } from "../helpers";
import {Link, useFetcher} from "react-router-dom";

const ExpenseItem = ({ expense, showBudget }) => {

    const fetcher = useFetcher();

    //helper function to get the colors for that budget
    //Here, we are taking the expense that we have passed in
    //It can be anything passed in the row we can see in the table (Name, Amount, Date)
    //When you create a new EXPENSE then it will create a budget id for each of your expense
    //Hence we can access it by using expense.budgetId

    //So we are calling this functiom, and telling it to look under the 'budgets' (categiry: budgets)
    //And the 'key' that u should look in is the 'id', key: 'id'
    //Then i wanna see which ever one matches my id, value: expense.budgetId

        const budget = getAllMatchingItems({
        category: 'budgets',
        key: 'id',
        value: expense.budgetId
    })[0];
    // console.log(budget)

    return (
        <>
            <td>{ expense.name }</td>
            <td>{ formatCurrency(expense.amount) }</td>
            <td>{ formatDateToLocaleString(expense.createDate) }</td>
            {
                showBudget && 
                (
                <td> <Link to={ `/budget/${budget.id}` } style={{ '--accent': budget.color }} > {budget.name}  </Link></td>
                ) }
            <td>
                <fetcher.Form method="post">    {/* if method not given it wont delete */}
                    {/* We use this bcz it can submit multiples at the same time. So if the user clicks this button one after another 
                    we will bundle these requests up and send them all at once.

                    We are passing two inputs. One tells us what to do with the form (_action)
                        other gives the actual data or id of the item we wanna delete
                    */}

                        <input type="hidden" name="_action" value="deleteExpense" />

                        <input type="hidden" name="expenseId" value={expense.id} />

                        <button
                            type="submit" 
                            className="btn btn--warning" 
                            aria-label={`Delete ${expense.name} expense`}
                        >
                            <TrashIcon width={20} />
                        </button>

                </fetcher.Form>

                
            </td>
        </>
    )
}

export default ExpenseItem;