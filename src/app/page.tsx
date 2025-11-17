import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

const heroBackgroundShapes = [
  {
    id: 'shape-top-right',
    className:
      'absolute top-16 right-10 w-72 h-72 bg-[#E0F0FF] rounded-full opacity-40 blur-3xl',
  },
  {
    id: 'shape-bottom-left',
    className:
      'absolute -bottom-10 -left-10 w-[28rem] h-[28rem] bg-[#F1F5FF] rounded-full opacity-50 blur-3xl',
  },
];

const heroBackgroundIcons = [
  {
    id: 'icon-ruler',
    className: 'absolute top-32 right-32 w-10 h-10 text-gray-200 opacity-40',
    path: 'M1 21h22v2H1v-2zm19-19H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM5 6h14v2H5V6zm0 4h14v2H5v-2zm0 4h14v2H5v-2z',
  },
  {
    id: 'icon-monitor',
    className: 'absolute top-20 left-1/2 w-12 h-12 text-gray-200 opacity-30',
    path: 'M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h3l-1 1v1h12v-1l-1-1h3c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z',
  },
  {
    id: 'icon-lightbulb',
    className: 'absolute top-56 right-16 w-9 h-9 text-gray-200 opacity-40',
    path: 'M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z',
  },
  {
    id: 'icon-atom',
    className: 'absolute bottom-32 right-40 w-12 h-12 text-gray-200 opacity-30',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 6a2 2 0 110 4 2 2 0 010-4zm0 12c-2.67 0-5.08-1.04-6.9-2.74C6.16 15.78 8.9 14.5 12 14.5s5.84 1.28 6.9 2.76C17.08 18.96 14.67 20 12 20z',
  },
  {
    id: 'icon-clock',
    className: 'absolute bottom-40 left-32 w-9 h-9 text-gray-200 opacity-35',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 11h5v-2h-3V7h-2v6z',
  },
  {
    id: 'icon-pencil',
    className: 'absolute top-48 left-40 w-9 h-9 text-gray-200 opacity-30',
    path: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
  },
  {
    id: 'icon-beaker',
    className: 'absolute bottom-24 left-52 w-10 h-10 text-gray-200 opacity-30',
    path: 'M19.8 2l-1.8 1.8c1.1 1.1 1.8 2.6 1.8 4.2v10c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V8c0-1.6.7-3.1 1.8-4.2L4.2 2 2 4.2l1.8 1.8C3.3 7.3 3 8.1 3 9v9c0 1.7 1.3 3 3 3h12c1.7 0 3-1.3 3-3V9c0-.9-.3-1.7-.8-2.4L20.8 4.2 19.8 2zM13 8H7v2h6V8z',
  },
  {
    id: 'icon-globe',
    className: 'absolute top-24 left-24 w-10 h-10 text-gray-200 opacity-30',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 17.93c-3.94-.49-7-3.85-7-7.93s3.06-7.44 7-7.93c3.94.49 7 3.85 7 7.93s-3.06 7.44-7 7.93z',
  },
];

/**
 * Home Page
 *
 * Main landing page with hero section, features, courses, and more.
 */
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-white pt-20 pb-0 overflow-hidden">
          {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[url('/images/BG.png')] bg-cover bg-center opacity-60"></div>
          {heroBackgroundShapes.map(shape => (
            <div key={shape.id} className={shape.className} />
          ))}
          {heroBackgroundIcons.map(icon => (
            <div key={icon.id} className={icon.className}>
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d={icon.path} />
              </svg>
            </div>
          ))}
        </div>

          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight font-sans">
                  <span className="block">
                    <span className="text-gray-900">ການເລືອກທີ່</span>{' '}
                    <span className="text-primary-600">ສະຫຼາດ</span>
                  </span>
                  <span className="block">
                    <span className="text-gray-900">ສໍາລັບ</span>{' '}
                    <span className="text-primary-600">ອະນາຄົດ</span>
                  </span>
                </h1>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Education ສ້າງຂຶ້ນມາເພື່ອການສຶກສາ,ແລກປ່ຽນ,ຮຽນຮູ້ ແລະ<br />
                  ພັດທະນາທັກສະຕ່າງໆຂອງນັກຮຽນ-ນັກສຶກສາ.
                </p>
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="ຄົ້ນຫາທີ່..."
                      className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <Button size="lg">ດໍາເນີນຕໍ່</Button>
                </div>
              </div>
              <div className="relative">
                <div className="relative z-10">
                  <Image
                    src="/images/hero-people.png"
                    alt="People learning together"
                    width={600}
                    height={600}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="pt-0 pb-16 bg-white overflow-hidden">
          <div className="container">
            {/* Blue box container - ยกขึ้นไปติดกับรูปคน */}
            <div className="bg-brandBlue rounded-3xl pt-12 pb-8 lg:pt-16 lg:pb-12 px-8 lg:px-12 shadow-xl -mt-12 lg:-mt-16 relative z-30 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-transparent text-white p-8 hover:bg-brandBlue/80 transition-colors rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Image
                        src="/images/online-test.png"
                        alt="Online test"
                        width={48}
                        height={48}
                        className="w-10 h-10"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white font-sans">
                        ຮຽນຮູ້ທັກສະໃໝ່ລ່າສຸດ
                      </h3>
                      <p className="text-white text-opacity-80 leading-relaxed">
                        ພັດທະນາຕົນເອງດ້ວຍຄວາມຮູ້ໃໝ່ ແລະປັບຕົນໃຫ້ທັນກັບໂລກທີ່ປ່ຽນໄປ.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-transparent text-white p-8 hover:bg-brandBlue/80 transition-colors rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Image
                        src="/images/exam.png"
                        alt="Exam"
                        width={48}
                        height={48}
                        className="w-10 h-10"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white font-sans">
                        ກຽມພ້ອມສໍາລັບອາຊີບ
                      </h3>
                      <p className="text-white text-opacity-80 leading-relaxed">
                        ພັດທະນາຕົນເອງດ້ວຍຄວາມຮູ້ໃໝ່ ແລະປັບຕົນໃຫ້ທັນກັບໂລກທີ່ປ່ຽນໄປ.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-transparent text-white p-8 hover:bg-brandBlue/80 transition-colors rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Image
                        src="/images/certification.png"
                        alt="Certification"
                        width={48}
                        height={48}
                        className="w-10 h-10"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white font-sans">
                        ໄດ້ຮັບການຢັ້ງຢືນ
                      </h3>
                      <p className="text-white text-opacity-80 leading-relaxed">
                        ພັດທະນາຕົນເອງດ້ວຍຄວາມຮູ້ໃໝ່ ແລະປັບຕົນໃຫ້ທັນກັບໂລກທີ່ປ່ຽນໄປ.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
