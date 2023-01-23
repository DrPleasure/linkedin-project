import React from "react"
import { RiSendPlaneFill } from "react-icons/ri"

export default function ButtonMessage() {
  return (
    <div className="connect-button">
      <span>
        <RiSendPlaneFill className="mb-1" />
      </span>
      <span> Message</span>
    </div>
  )
}
