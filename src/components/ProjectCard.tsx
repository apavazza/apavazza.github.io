import Link from "next/link"
import React, { Suspense } from "react"

interface ProjectCardProps {
  project: {
    name: string
    description: string
    url: string
    icon: string
    tags: string[]
  }
}

type IconModule = {
  [key: string]: React.ComponentType<{ size?: number }>
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const Icon = React.lazy(() => import(`lucide-react`).then(module => ({ default: ((module as unknown) as IconModule)[project.icon] || module.Terminal })))

  return (
    <Link href={project.url} target="_blank" rel="noopener noreferrer" className="block">
      <div className="bg-gray-50 dark:bg-gray-200 border dark:border-gray-400 shadow-md rounded-lg transition duration-300 hover:shadow-lg p-6 h-full flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <div className="text-blue-950 mb-4">
            <Suspense fallback={<div>Loading...</div>}>
              <Icon size={32} />
            </Suspense>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-900 text-center mb-2">{project.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-800 text-center mb-4">{project.description}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-auto">
          {project.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 
                bg-blue-200 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-200 
                text-blue-900 hover:text-blue-200 dark:text-blue-100 dark:hover:text-blue-800 
                text-xs font-semibold rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}