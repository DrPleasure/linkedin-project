import React from "react"
import { BsFillQuestionCircleFill } from "react-icons/bs"
export default function SimpleTextMyProfile({ text }) {
  return (
    <div className="m-3 simple-text-component mr-auto">
      {text}

      <span className="float-right">
        <BsFillQuestionCircleFill />
      </span>
    </div>
  )
}
