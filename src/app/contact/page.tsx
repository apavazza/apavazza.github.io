import { Metadata } from "next"
import Contact from "./_components/Contact"

export const metadata: Metadata = {
  title: "Contact"
}

export default function ContactPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Contact />
    </div>
  )
}