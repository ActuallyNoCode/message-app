import Image from "next/image";

interface Contact {
  id: number;
  name: string;
  message: string;
  profileImage: string;
}

const contacts: Contact[] = [
  {
    id: 1,
    name: "Brayan Suarez",
    message: "Hola, ¿cómo estás?",
    profileImage: "/profile/23.svg",
  },
  {
    id: 2,
    name: "Maria López",
    message: "¿Nos vemos hoy?",
    profileImage: "/profile/24.svg",
  },
  {
    id: 3,
    name: "Juan Pérez",
    message: "Te mando la info...",
    profileImage: "/profile/25.svg",
  },
  {
    id: 4,
    name: "Carla Gómez",
    message: "Gracias por el apoyo",
    profileImage: "/profile/26.svg",
  },
  {
    id: 5,
    name: "Luis Rodríguez",
    message: "Nos vemos en la tarde",
    profileImage: "/profile/27.svg",
  },
];

enum ContactStatus {
  Online = "bg-green-500",
  Offline = "hidden",
  DonotDisturb = "bg-red-500",
  Inactive = "bg-yellow-400",
}

export default function ContactList() {
  return (
    <div className="flex flex-col items-start justify-start rounded-lg shadow-lg overflow-y-auto h-[calc(100vh-3.5rem)]">
      <div className="flex flex-col w-full">
        {contacts.map((contact, index) => (
          <div
            key={contact.id + index}
            className="odd:bg-white h-20 relative gap-1 w-full flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors duration-75"
          >
            <div className="h-12 w-12 rounded-2xl shadow-lg relative">
              <Image
                src={contact.profileImage}
                alt={contact.name}
                width={48}
                height={48}
                className="object-cover rounded-2xl"
              />
              {/* Status circle */}
              <div
                className={`absolute bottom-0 right-0 h-4 w-4 ${ContactStatus.Offline} border-2 border-white rounded-full`}
              ></div>
            </div>
            <div className="flex flex-col justify-center ml-2">
              <span className="text-black font-semibold">{contact.name}</span>
              <span className="text-gray-500 text-sm">{contact.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
