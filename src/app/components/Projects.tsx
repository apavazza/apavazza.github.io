"use client"

import ProjectCard from "@/app/components/ProjectCard"
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
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {projects.map((project, index) => (
      <ProjectCard key={index} project={project} />
    ))}
  </div>)
}