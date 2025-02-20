import { Mail, MapPin } from "lucide-react";

export default function ContactCard() {
  function getEmail() {
    const email = ['Amadeo', '.', 'Pavazza', '.', '00', '@', 'fesb', '.', 'hr'];
    return email.join('');
  }

  return(
    <div className="bg-white dark:bg-[#121212] shadow-lg rounded-lg overflow-hidden w-full max-w-md">
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-200">Amadeo Pavazza</h2>
        <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">B. Sc. Comp.</p>
      </div>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Mail className="mr-4 text-gray-700 dark:text-gray-300" size={24} />
          <a href={`mailto:${getEmail()}`} className="text-gray-700 hover:text-brand-primary dark:text-gray-300 dark:hover:text-gray-200">
          {getEmail()}
          </a>
        </div>
        <div className="flex items-center">
          <MapPin className="mr-4 text-gray-700 dark:text-gray-300" size={24} />
          <p className="text-gray-700 dark:text-gray-300">Split, Croatia</p>
        </div>
      </div>
    </div>
  )
}