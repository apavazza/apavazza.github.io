"use client";

import { useState, useEffect } from "react"
import { GraduationCap, Calendar } from "lucide-react"

interface EducationItem {
  year: string
  degree: string
  institution: string
  faculty?: string
}

export default function EducationCard() {
  const [educationItems, setEducationItems] = useState<EducationItem[]>([])

  useEffect(() => {
    async function fetchEducationItems() {
      const response = await fetch('/data/education.json')
      const data = await response.json()
      setEducationItems(data)
    }
    fetchEducationItems()
  }, [])
  
  return (
    <div className="bg-white dark:bg-[#121212] shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-brand-primary dark:text-gray-200">Education</h2>
      <div className="space-y-8">
        {educationItems.map((ed, index) => (
          <EducationItemComponent
            key={index}
            year={ed.year}
            degree={ed.degree}
            institution={ed.institution}
            faculty={ed.faculty}
          />
        ))}
      </div>
    </div>
  )
}

function EducationItemComponent({
    year,
    degree,
    institution,
    faculty,
  }: EducationItem) {
    return (
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          <div className="bg-brand-primary text-white dark:text-gray-800 dark:bg-gray-400  p-2 rounded-full">
            <GraduationCap size={24} />
          </div>
        </div>
        <div>
          <div className="flex items-center mb-2">
            <Calendar size={16} className="text-brand-primary dark:text-gray-300 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-300">{year}</span>
          </div>
          <h3 className="text-xl font-semibold text-blue-900 dark:text-gray-200">{degree}</h3>
          <p className="text-gray-700 dark:text-gray-300">{institution}</p>
          {faculty && <p className="text-gray-600 dark:text-gray-400 text-sm">{faculty}</p>}
        </div>
      </div>
    )
  }