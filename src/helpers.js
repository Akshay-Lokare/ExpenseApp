//a delay in submitting a form, just to test 
export const waitt = () => new Promise(res => setTimeout(res, Math.random() * 800))


//This will change the color based on the length of the budget
const generateRandomColor = () => {
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`
}

//local Storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

//Get all items from local storgae
export const getAllMatchingItems = ({ category, key, value }) => {
    const data = fetchData(category) ?? [];  //We are fetching the category of the data

    //this will return an array of objects
    return data.filter( (item) => item[key] == value );
}


//delete budget from local storage

export const deleteItem = ({ key, id }) => {
    const existingData = fetchData(key);
    if (id) {
         //As long as the id we passed in is not there then dont delete
      const newData = existingData.filter((item) => item.id !== id);
      return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
  };


//create budget

//passing the names of the input fields
export const createBudget = ({ name, amount }) => {
    const newItem = {
        id: crypto.randomUUID(),    //Gives an id
        name: name,
        amount: +amount,            //+ is used to convert string to number instead of Number()
        createDate: Date.now(),
        color: generateRandomColor()
    }
    //Checking if we have budgets that already exists
    //If no then display []
    const existingBudget = fetchData('budgets') ?? [];
    //Adding your new budget to existing budget
    return localStorage.setItem('budgets', JSON.stringify([...existingBudget, newItem]));
}

//create expense
export const createExpense = ({ name, amount, budgetId }) => {
    const newItem = {
        id: crypto.randomUUID(),    //Gives an id
        name: name,
        amount: +amount,            //+ is used to convert string to number instead of Number()
        createDate: Date.now(),
        budgetId: budgetId
    }
    //Checking if we have budgets that already exists
    //If no then display []
    const existingExpenses = fetchData('expenses') ?? [];
    //Adding your new budget to existing budget
    return localStorage.setItem('expenses', JSON.stringify([...existingExpenses, newItem]));
}

//total spent by budget
export const calculateSpentByBudget = (budgetId) => {
//First passing the budget id in ()

    //first its gonna grab all of our expenses 
    const expenses = fetchData('expenses') ?? [];       //If no data, then pass an empty array

    //then loop through all of our expenses 
    //acc is like
    const budgetSpent = expenses.reduce((acc, expense) => {

        //check if expense.id === budgetId we passed, if not then return acc ie return 0
        //if not equal then dont go ahead
        if(expense.budgetId !== budgetId) return acc;

       //add current amount to my total 
        return acc += expense.amount;

    }, 0 )   
    //reduce method can do multile things in a same loop and can return any value (array, obj, number)
    //the 0 tells that u wanna return a number, and the acc ie the accumulator should start with 0 and end with 0

    return budgetSpent;
}


// Formatting

export const formatDateToLocaleString = (epoch) => new Date(epoch).toLocaleDateString();

//Format Percentage
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 0 });
}

// Format Currency
export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, { style: 'currency', currency: 'INR' });
} 
