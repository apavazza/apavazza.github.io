"use client";

import Image from "next/image"
import Link from "next/link"

export default function Error({ error }: { error: Error, reset: () => void })  {
  return (
    <div className="flex justify-center mt-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-300 mb-4">{error.name}</h1>
        <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-6">Oops! Something went wrong</h2>
        <p className="text-xl text-gray-600 dark:text-gray-100 mb-8">{error.message}</p>
        <Image
          src="/images/robot-3256109_1280.png"
          alt="Confused robot"
          width={300}
          height={300}
          className="mx-auto mb-8"
        />
        <p className="text-lg text-gray-600 dark:text-gray-100 mb-8">
          Our robot is just as confused as you are. Maybe it can help you find your way back?
        </p>
        <Link
          href="/"
          className="bg-brand-primary dark:bg-gray-600 hover:bg-brand-secondary dark:hover:bg-gray-500 active:bg-brand-tertiary dark:active:bg-gray-400 text-white dark:text-gray-100 font-bold py-2 px-4 rounded transition duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}