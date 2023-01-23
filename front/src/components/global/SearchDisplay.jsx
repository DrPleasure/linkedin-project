import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiSearch } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import {
  hideUserSearchAction,
  otherUserProfileAction,
} from "../../redux/actions/index";
import { Link } from "react-router-dom";

export default function SearchDisplay() {
  const dispatch = useDispatch();

  let usersFromSearch = useSelector(
    (state) => state.usersFromSearchFilter.searchResults
  );
  const handleClick = (user) => {
    dispatch(hideUserSearchAction());

    dispatch(otherUserProfileAction(user));
  };

  let firstTen = usersFromSearch.slice(0, 10);

  return (
    <div>
      <div
        className="search-overlay"
        onClick={() => dispatch(hideUserSearchAction())}
      ></div>
      <div id="search-results-float" className=" bg-white border">
        {usersFromSearch.length === 0 ? (
          <div className="search-individual-user-display mt-2">
            Search for users
          </div>
        ) : (
          <>
            {firstTen.map((user) => (
              <Link
                to={`/profile/${user._id}`}
                key={user._id}
                className="text-dark"
              >
                <div
                  className="search-individual-user-display mt-2"
                  onClick={handleClick.bind(null, user)}
                >
                  {console.log("logging user in search--->", user)}
                  <div className="search-results-text-wrapper">
                    <span className="mr-3 ml-2">
                      <BiSearch />
                    </span>
                    <span className="small-header-text ">{user.name} </span>
                    <span className="small-header-text">{user.surname}</span>
                    <span>
                      <BsDot />
                    </span>
                    <span className="recommended-user-job-description-text">
                      {user.title}
                    </span>
                  </div>
                  <div className="border recommended-user-image ml-auto">
                    <img src={user.image} alt="" />
                  </div>
                </div>
              </Link>
            ))}
            <div className="border-top p-2 text-center gray-hover text-primary font-weight-bold">
              See all results
            </div>
          </>
        )}
      </div>
    </div>
  );
}
