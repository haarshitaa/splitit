import { toast } from 'react-toastify';

export function showToast(message, type = 'info') {
    toast[type](message); // Types can be 'info', 'success', 'error', etc.
}
