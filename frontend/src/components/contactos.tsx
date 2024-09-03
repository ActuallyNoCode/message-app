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

export default function ContactList() {
  return (
    <div className="bg-blue-600 flex flex-col items-start justify-start h-[560px] w-[263px] rounded-lg p-4 overflow-y-auto">
      <div className="flex flex-col gap-3 w-full">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white h-16 w-full flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <div className="h-12 w-12 rounded-full overflow-hidden">
              <Image
                src={contact.profileImage}
                alt="Profile Picture"
                width={48}
                height={48}
                className="h-full w-full"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-black font-semibold">{contact.name}</span>
              <span className="text-gray-400 text-sm">{contact.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
