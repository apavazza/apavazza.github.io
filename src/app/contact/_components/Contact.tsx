"use client"

import { useEffect, useState } from "react"
import ContactCard from "./ContactCard"
import CaptchaVerification from "./CaptchaVerification"

export default function Contact(){
  const [verified, setVerified] = useState(false)

  useEffect(() => {
  const checkVerification = () => {
    const isVerified = sessionStorage.getItem("captchaVerified") === "true"
    setVerified(isVerified)
  }

  window.addEventListener("storage", checkVerification)
  checkVerification()

  return () => {
    window.removeEventListener("storage", checkVerification)
  }
  }, [])

  const handleVerify = () => {
    setVerified(true)
    sessionStorage.setItem("captchaVerified", "true")
    window.dispatchEvent(new Event("storage"))
  }

  return(
    <>
      {verified ? <ContactCard /> : <CaptchaVerification onVerify={handleVerify} />}
    </>
  )
}