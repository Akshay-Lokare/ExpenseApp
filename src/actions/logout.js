import { redirect } from 'react-router-dom';
import { deleteItem } from '../helpers';
import { toast } from 'react-toastify';

export async function logoutAction() {

    deleteItem({ key: 'userName' });
    deleteItem({ key: 'budgets' });
    deleteItem({ key: 'expenses' });

    toast.success('Logout Successful');
    // toast("Basic toast msg");
    // toast.success("Success msg");
    // toast.error("Error msg");
    // toast.warn("Warning msg");
    // toast.info("Info msg");

    return redirect('/');
}
