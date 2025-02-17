"use client"

import ProjectCard from "@/components/ProjectCard"
import { useEffect, useState } from "react"

interface Project {
  name: string
  description: string
  url: string
  icon: string
  tags: string[]
}

export default function Projects(){
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch('/data/projects.json')
      const data = await response.json()
      setProjects(data)
    }
    fetchProjects()
  }, [])

  return(
    <>
      <h2 className="text-3xl font-bold mb-6 text-brand-primary">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </>
  )
}