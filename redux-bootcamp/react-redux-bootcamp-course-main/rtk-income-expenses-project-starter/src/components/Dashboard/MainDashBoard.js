import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfileAction } from "../../redux/slice/users/usersSlice";
import AccountList from "./AccountList";
import AccountSummary from "./AccountSummary";

const MainDashBoard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileAction());
  }, [dispatch]);

  // Get data from the store
  const { error, loading, profile } = useSelector((state) => state?.users);

  return (
    <>
      {loading ? (
        <h2 className="text-center text-green-600 mt-5 text-lg">Loading...</h2>
      ) : error ? (
        <h2 className="text-center text-red-600 mt-5 text-lg">{error}</h2>
      ) : (
        <>
          <AccountSummary profile={profile} />
          <AccountList profile={profile} />
        </>
      )}
    </>
  );
};

export default MainDashBoard;
