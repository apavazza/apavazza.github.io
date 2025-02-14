import { Metadata } from "next"
import EducationCard from "./_components/EducationCard"

export const metadata: Metadata = {
  title: "About"
}

export default function AboutPage() {
  return (
    <div className="container mx-auto">
      <EducationCard />
    </div>
  )
}