import { Metadata } from 'next';
import Projects from './components/Projects';

export const metadata: Metadata = {
  title: "Home | Amadeo Pavazza",
}

export default function HomePage() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-brand-primary">My Projects</h1>
        <Projects />
    </div>
  )
}