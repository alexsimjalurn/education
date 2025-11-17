import Image from 'next/image';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

const teamMembers = [
  {
    id: 'phonesai-1',
    name: 'Phonesai',
    surname: 'KEOMANIBONG',
    phone: '+856 20 9704 6394',
    image: '/images/Phonesai.png',
  },
  {
    id: 'alexsavanh',
    name: 'Alexsavanh',
    surname: 'SIMJALURN',
    phone: '+856 20 5679 2661',
    image: '/images/Alexsavanh.png',
  },
  {
    id: 'oven',
    name: 'Southisuk',
    surname: 'VILAITHONG',
    phone: '+856 20 9573 1644',
    image: '/images/Oven.png',
  },
  {
    id: 'phonesai-2',
    name: 'Sonesavanh',
    surname: 'XOUANSOUANDAO',
    phone: '+856 20 7683 7785',
    image: '/images/Heng.png',
  },
  {
    id: 'mou',
    name: 'Salongxay',
    surname: 'SAIYUNTHONE',
    phone: '+856 20 5984 6420',
    image: '/images/Mou.png',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <section className="relative min-h-[80vh] bg-white py-16 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/BG.png')] bg-cover bg-center opacity-60" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 right-10 w-96 h-96 bg-[#E0F0FF] rounded-full opacity-40 blur-3xl" />
            <div className="absolute bottom-16 left-16 w-[28rem] h-[28rem] bg-[#F1F5FF] rounded-full opacity-50 blur-3xl" />
          </div>

          <div className="container relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-sans">
                ກ່ຽວກັບພວກເຮົາ
              </h1>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                ພວກເຮົາເປັນທີມງານທີ່ມຸ່ງຫມັ້ນໃນການພັດທະນາການສຶກສາ, ການແບ່ງປັນຄວາມຮູ້
                ແລະສ້າງໂອກາດໃຫ້ນັກຮຽນ-ນັກສຶກສາລາວສາມາດປັບຕົນໃຫ້ທັນກັບໂລກທີ່ປ່ຽນແປງ.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map(member => (
                <div
                  key={member.id}
                  className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-white/40"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 shadow">
                    <Image
                      src={member.image}
                      alt={`${member.name} ${member.surname}`}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 text-center">
                    <span className="whitespace-nowrap inline-flex justify-center gap-2">
                      <span>{member.name}</span>
                      <span>{member.surname}</span>
                    </span>
                  </h3>
                  <p className="text-gray-700 mt-2">ເບີໂທ: {member.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

