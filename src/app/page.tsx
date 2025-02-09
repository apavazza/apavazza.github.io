"use client";

import { useEffect, useState } from 'react'
import ProjectCard from "./components/ProjectCard"

interface Project {
  name: string
  description: string
  url: string
  icon: string
  tags: string[]
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch('/projects.json')
      const data = await response.json()
      setProjects(data)
    }

    fetchProjects()
  }, [])

  return (
    <div className="bg-gray-50 shadow-lg rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-brand-primary">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  )
}