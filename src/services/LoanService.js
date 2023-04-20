import axios from "axios";
import { BaseURL } from "./index";


export const GetLoans = async () => {
    try {
        const { data } = await axios.get(`${BaseURL}/loans`)
        return data
    } catch (error) {
        return error.message
    }
}

class LoanService {
    getLoans() {
        return axios.get(`${BaseURL}/loans`);
    }

    createLoan(loan) {
        return axios.post(`${BaseURL}`, loan);
    }

    geLoanById(loanId) {
        return axios.get(`${BaseURL}/`+ loanId);
    }

    updateLoan(loan, loanId) {
        return axios.put(`${BaseURL}/`+ loanId, loan);
    }

    updateLoans(loan, loanId) {
        return axios.patch(`${BaseURL}/` + loanId, loan);
    }

    deleteLoan(loanId) {
        return axios.delete(`${BaseURL}/`+ loanId);
    }
}

export default new LoanService();