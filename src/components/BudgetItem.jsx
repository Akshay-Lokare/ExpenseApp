import { Form, Link } from "react-router-dom";
import { calculateSpentByBudget, formatCurrency, formatPercentage } from "../helpers";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";

const BudgetItem = ({ budget, showDelete = false }) => {
    // Instead of typing budget.id, budget.name etc., we just destructure it like this
    const { id, name, amount, color } = budget;
    const spent = calculateSpentByBudget(id);
    
    return (
        <div className="budget" style={{'--accent': color}}>
            <div className="progress-text">
                <h3> { name } </h3>
                <p> { formatCurrency(amount) } Budgeted </p> {/* formatCurrency is a helper function, amt = amount */}
                <progress max={amount} value={spent}>
                    {formatPercentage(spent / amount)}
                </progress>
            </div>
            <div className="progress-text">
                <small> {formatCurrency(spent)} spent </small>
                <small> {formatCurrency(amount - spent)} remaining </small>
            </div>

            { showDelete ? (
                <div className="flex-sm">
                <Form
                    method="post"
                    action='delete'
                    onSubmit={(e) => {
                        if(!confirm('Are you sure you wanna delete the entire budget?')){
                            e.prevetDefault();
                        }
                    }}
                >
                    <button type="submit" className="btn">
                        <span>Delete</span>
                        <TrashIcon width={20} />
                    </button>
                </Form>
                </div>
                
            ) : (
                <div className="flex-sm">
                <Link to={`budget/${id}`} className="btn"> 
                    <span>View Details</span> 
                    <BanknotesIcon width={20} />
                </Link>
                </div>
            ) }

        </div>
    );
};

export default BudgetItem;
