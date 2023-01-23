import React from "react"
import { SlArrowDown, SlArrowUp } from "react-icons/sl"
import { useState } from "react"
import RecommendedUser from "./MoreUsers"
export default function ShowMore({ moreUsers }) {
  const [showUsers, setShowUsers] = useState(false)
  const clickToShowUsers = () => setShowUsers(!showUsers)
  return (
    <>
      {showUsers ? (
        <>
          {moreUsers.map((user, i) => (
            <div key={user._id}>
              <RecommendedUser user={user} />
              <hr style={{ width: "90%" }} />
            </div>
          ))}
          <div
            onClick={clickToShowUsers}
            className=" p-3 d-flex align-items-center justify-content-center show-more mt-n3"
          >
            <span>Show Less</span>
            <span>
              <SlArrowUp className="ml-1" />
            </span>
          </div>
        </>
      ) : (
        <div
          onClick={clickToShowUsers}
          className=" p-3 d-flex align-items-center justify-content-center show-more mt-n3"
        >
          <span className="show-more">Show More</span>
          <span>
            <SlArrowDown className="ml-1" />
          </span>
        </div>
      )}
    </>
  )
}
