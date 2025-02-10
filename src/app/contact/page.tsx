"use client"

import { useState, useEffect } from "react"
import ContactCard from "./_components/ContactCard"
import CaptchaVerification from "./_components/CaptchaVerification"

export default function Contact() {
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

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      {verified ? <ContactCard /> : <CaptchaVerification onVerify={handleVerify} />}
    </div>
  )
}