import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Intro from "../components/Intro";
import { createBudget, createExpense, deleteItem, fetchData, waitt } from "../helpers"
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";


// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses }
}

// action - add it in routes
export async function dashboardAction({ request }) {
  await waitt(); //to simulate a delay manually for testing

  const data = await request.formData();
    // console.log({ data, request })

    //to work with formData
    //by using formEntries we get access to the entire formData object
    //We can then use to get data like, formData.userName
    //We are extracting the action and spreading the rest of the values thatdont include the action
    const { _action, ...values } = Object.fromEntries(data);

    //Here, when we are submitting the forms, react dosent know which form to handle when
    //So, we have to tell it which form to handle by using the name of the form
    //In Intro we add a hidden input field with name as '_action'

    if(_action ==='newUser'){
      try {
        localStorage.setItem("userName", JSON.stringify(values.userName))
        return toast.success(`Welcome, ${values.userName}`)
      } catch (e) {
        throw new Error("There was a problem creating your Account.")
      }
    }

    //This will save the value in the key and pass it down the useLoaderData() which then we can use to render it
    // localStorage.setItem('userName', JSON.stringify(formData.userName));
    // return toast.success(`Welcome ${userName}!`);
    if(_action === 'createBudget'){
      try{
        createBudget({
          name: values.newBudget,
          amount: values.newBudgetAmount
        })
        return toast.success(`Budget for ${values.newBudget} created!`)
      } catch (e) {
        throw new Error("There was a problem creating your Budget.")
      }
    } 

    if(_action === 'createExpense'){  //This is the 'hidden' input field name
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

const Dashboard = () => {

//from above, once u get the key (userName) the below condition will not show <Intro /> and direct us to the dashboard page
  const { userName, budgets, expenses } = useLoaderData()

  return (
    <>
      {userName ? (
        <div className="dashboard">

          <h1>Welcome back, <span className="accent">
            {userName}</span>
          </h1>

          <div className="grid-sm">
          {
          budgets && budgets.length > 0
          ? (
          <div className="grid-lg">
            <div className="flex-lg">
              <AddBudgetForm />
              <AddExpenseForm budgets={budgets} />
            </div>

            <h2>Existing Budgets</h2>
            <div className="budgets">
                {
                  budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))
                }
            </div>

                {
                  expenses && expenses.length > 0 && (
                    <div className="grid-md">
                      <h2>Recent Expenses</h2>
                      {/* Show you expenses */}
                      <Table 
                        expenses={
                          expenses
                            .sort((a, b) => b.createdAt - a.createdAt)
                            .slice(0, 8)
                        }
                      />
                      {expenses.length > 8 && (
                        <Link to='expenses' className="btn btn--dark"> View All Expenses </Link>
                      )}
                    </div>
                  )
                }

          </div>
          )
          : (
          <div className="grid-sm">
            <p>Personal budgeting is the secret to financial freedom.</p>
            <p>Create a budget to get started!</p>
            <AddBudgetForm />
          </div>
          )
          }
          </div>
          
        </div>
      ) : <Intro />}
    </>
  )
}
export default Dashboard;