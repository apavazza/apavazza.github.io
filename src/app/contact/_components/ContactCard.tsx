import { Mail, MapPin } from "lucide-react";

export default function ContactCard() {
  function getEmail() {
    const email = ['Amadeo', '.', 'Pavazza', '.', '00', '@', 'fesb', '.', 'hr'];
    return email.join('');
  }

  return(
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md">
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-900">Amadeo Pavazza</h2>
        <p className="text-sm mt-2 text-gray-700">B. Sc. Comp.</p>
      </div>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Mail className="mr-4 text-gray-700" size={24} />
          <a href={`mailto:${getEmail()}`} className="text-gray-700 hover:text-brand-primary">
          {getEmail()}
          </a>
        </div>
        <div className="flex items-center">
          <MapPin className="mr-4 text-gray-700" size={24} />
          <p className="text-gray-700">Split, Croatia</p>
        </div>
      </div>
    </div>
  )
}