import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createTransactionAction } from "../../redux/slice/transactions/transactionsSlice";
import { useDispatch, useSelector } from "react-redux";

const AddTransaction = () => {
  // Get the account id
  const { id } = useParams(); // Ensure this ID is correct
  console.log("Account ID:", id);
  // Dispatch
  const dispatch = useDispatch();
  const [transaction, setTransaction] = useState({
    name: "",
    amount: "",
    transactionType: "",
    date: "",
    category: "",
    notes: "",
  });
  //---Destructuring---
  const { name, amount, transactionType, category, notes } = transaction;
  //---onchange handler----
  const onChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
    console.log("Transaction Data:", transaction);
  };

  //---onsubmit handler----
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Transaction Data:", { ...transaction, id });
    dispatch(createTransactionAction({ ...transaction, id }));
  };

  const { loading, error, isAdded } = useSelector(
    (state) => state.transactions
  );

  return (
    <section className="py-16 xl:pb-56 bg-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-md mx-auto">
          <h2 className="mb-4 text-4xl md:text-5xl text-center font-bold font-heading tracking-px-n leading-tight">
            Add Transaction
          </h2>
          <p className="mb-12 font-medium text-lg text-gray-600 leading-normal">
            You are adding new transaction to {transaction?.name}
          </p>
          <form onSubmit={onSubmit}>
            <label className="block mb-5">
              <input
                value={name}
                onChange={onChange}
                name="name"
                className="px-4 py-3.5 w-full text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                id="signUpInput2-1"
                type="text"
                placeholder="Name"
              />
            </label>
            <label className="block mb-5">
              <input
                value={amount}
                onChange={onChange}
                name="amount"
                className="px-4 py-3.5 w-full text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                id="signUpInput2-2"
                type="text"
                placeholder="Enter Amount"
              />
            </label>
            <label className="block mb-5">
              <select
                value={transactionType}
                onChange={onChange}
                name="transactionType"
                className="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-200 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none"
              >
                <option value="">-- Select Transaction Type --</option>
                <option value="Income">Income</option>
                <option value="Expenses">Expenses</option>
              </select>
            </label>
            <label className="block mb-5">
              <select
                value={category}
                onChange={onChange}
                name="category"
                className="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-200 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none"
              >
                <option value="">-- Select Category --</option>
                <option value="Personal">Personal</option>
                <option value="Groceries">Groceries</option>
              </select>
            </label>

            <div>
              <div className="mt-3 mb-3">
                <textarea
                  onChange={onChange}
                  value={notes}
                  placeholder="Add Notes"
                  rows={4}
                  name="notes"
                  id="comment"
                  className="block p-2 w-full border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mb-8 py-4 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
            >
              Create Transaction
            </button>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {isAdded && <p>Transaction Added Successfully</p>}

            <p className="font-medium">
              <Link
                to={`/account/${id}`}
                className="text-indigo-600 hover:text-indigo-700"
              >
                Back To Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddTransaction;
