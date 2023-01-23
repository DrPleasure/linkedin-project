import React from "react"
import SimpleTextMyProfile from "./SimpleTextMyProfile"

import MorePeople from "./MorePeople"
import MorePeopleYouKnow from "./MorePeopleYouKnow"
import Promoted from "./Promoted"

export default function SideComponentsMyProfile() {
  return (
    <>
      {/* 2 components with same basic structure in SimpleTextMyProfile, text passed as props */}
      <div className=" border side-component-border bg-white">
        <SimpleTextMyProfile text="Edit public profile & URL" />
        <hr style={{ width: "90%" }} />
        <SimpleTextMyProfile text="Add profile in another language" />
      </div>
      {/* promoted section component */}
      <Promoted />
      {/* People also viewed component */}
      <MorePeople heading="People also viewed" />
      {/* People you may know section, component */}
      <MorePeopleYouKnow heading="People you may know" />
      {/* <PeopleYouMayKnow /> */}
    </>
  )
}
