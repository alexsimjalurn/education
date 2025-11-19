import Image from 'next/image';
import Link from 'next/link';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';

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
    id: 'icon-lightbulb',
    className: 'absolute top-56 right-16 w-9 h-9 text-gray-200 opacity-40',
    path: 'M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z',
  },
  {
    id: 'icon-pencil',
    className: 'absolute top-48 left-40 w-9 h-9 text-gray-200 opacity-30',
    path: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
  },
  {
    id: 'icon-globe',
    className: 'absolute top-24 left-24 w-10 h-10 text-gray-200 opacity-30',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 17.93c-3.94-.49-7-3.85-7-7.93s3.06-7.44 7-7.93c3.94.49 7 3.85 7 7.93s-3.06 7.44-7 7.93z',
  },
];

const trackCourses = [
  {
    id: 'track-1',
    badge: 'UI/UX Design',
    title: 'UI/UX Design for Beginners',
    image: '/images/course-1.webp',
    price: '1,960,000 ₭',
    duration: '22 ຊົ່ວໂມງ 30 ນາທີ',
    lessons: '34 ຄອສ',
    sales: '250 ການຂາຍ',
    rating: '4.9',
  },
  {
    id: 'track-2',
    badge: 'Web Development',
    title: 'Next.js & React From Zero',
    image: '/images/course-2.webp',
    price: '2,400,000 ₭',
    duration: '18 ຊົ່ວໂມງ 15 ນາທີ',
    lessons: '28 ຄອສ',
    sales: '480 ການຂາຍ',
    rating: '4.8',
  },
  {
    id: 'track-3',
    badge: 'Data Science',
    title: 'Data Science Essentials',
    image: '/images/course-3.webp',
    price: '3,000,000 ₭',
    duration: '26 ຊົ່ວໂມງ 40 ນາທີ',
    lessons: '40 ຄອສ',
    sales: '510 ການຂາຍ',
    rating: '4.7',
  },
];

const premiumHighlights = [
  {
    id: 'accessible',
    title: 'Easily Accessible',
    description:
      'ການຮຽນຮູ້ຈະຮູ້ສຶກສະດວກສະບາຍຫຼາຍຂຶ້ນດ້ວຍ Education.',
    icon: '/images/hearts_.webp',
  },
  {
    id: 'fun',
    title: 'Fun Learning Experience',
    description: 'ບົດຮຽນແບບໂຕ້ຕອບ ທີ່ຊ່ວຍໃຫ້ນັກຮຽນມີສ່ວນຮ່ວມທຸກມື້.',
    icon: '/images/jigsaw_.webp',
  },
];

const testimonials = [
  {
    id: 'finlay',
    quote:
      '“ການຮຽນຮູ້ທີ່ດີສຸດມັກເກີດຈາກປະສົບການທີ່ແທ້ຈິງ ແລະ Education ຊ່ວຍຂ້ອຍໄດ້ດີ.”',
    name: 'Finlay Kirk',
    role: 'Web Developer',
  },
  {
    id: 'danette',
    quote:
      '“ບົດຮຽນຖືກອອກແບບຢ່າງປະນີດ ການໃຊ້ງານງ່າຍ ແລະຄອບຄຸມເນື້ອຫາສໍາຄັນຄົບຖ້ວນ.”',
    name: 'Danette P. Cervantes',
    role: 'Web Design',
  },
  {
    id: 'clara',
    quote:
      '“ຕັ້ງແຕ່ເລີ່ມຮຽນ ຂ້ອຍຮູ້ສຶກມີກໍາລັງໃຈ ເນື່ອງຈາກຄໍາແນະນໍາຈາກໂຄດແລະຊຸມຊົນ.”',
    name: 'Clara R. Altman',
    role: 'UI/UX Design',
  },
];

const mentorTracks = [
  {
    id: 'mentor-1',
    name: 'Phonesai KEOMANIBONG',
    title: 'ອາຈານ @ Education-ການສຶກສາ',
    description:
      'ສອນແນວຄິດວິສະວະກໍາແບບເຂົ້າໃຈງ່າຍ ແລະໃຊ້ໄດ້ຈິງ.',
    topic: 'AI Modeling',
    image: '/images/Phonesai.webp',
  },
  {
    id: 'mentor-2',
    name: 'Southisuk VILAITHONG',
    title: 'ອາຈານ @ Education-ການສຶກສາ',
    description:
      'ເນັ້ນທັກສະການນໍາສະເຫນີ ແລະການໃຊ້ຄວາມຄິດເຊິ່ງ.',
    topic: 'AI Modeling',
    image: '/images/Oven.webp',
  },
  {
    id: 'mentor-3',
    name: 'Sonesavanh XOUANSOUANDAO',
    title: 'ອາຈານ @ Education-ການສຶກສາ',
    description:
      'ຊ່ວຍໃຫ້ນັກຮຽນວາງແຜນການຮຽນແບບເປັນຂັ້ນຕອນ ແລະປະຕິບັດໄດ້.',
    topic: 'AI Modeling',
    image: '/images/Heng.webp',
  },
];

/**
 * Home Page
 *
 * Main landing page with hero section, features, courses, and more.
 * Static generation enabled for fast loading.
 */
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-white pt-20 pb-0 overflow-hidden">
          {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Background Image - ใช้ Next.js Image แทน CSS background */}
          {/* Fallback CSS background ถ้า image โหลดไม่ได้ */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-60" />
          <div className="absolute inset-0 opacity-60">
            <Image
              src="/images/BG.webp"
              alt=""
              fill
              className="object-cover"
              priority={false}
              quality={75}
              sizes="100vw"
              onError={(e) => {
                // Hide image on error, fallback to CSS gradient
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
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
                    src="/images/hero-people.webp"
                    alt="People learning together"
                    width={600}
                    height={600}
                    className="w-full h-auto object-contain"
                    priority
                    quality={85}
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
                        src="/images/online-test.webp"
                        alt="Online test"
                        width={48}
                        height={48}
                        className="w-10 h-10"
                        loading="lazy"
                        quality={80}
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
                        src="/images/exam.webp"
                        alt="Exam"
                        width={48}
                        height={48}
                        className="w-10 h-10"
                        loading="lazy"
                        quality={80}
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
                        src="/images/certification.webp"
                        alt="Certification"
                        width={48}
                        height={48}
                        className="w-10 h-10"
                        loading="lazy"
                        quality={80}
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

        {/* Our Tracks Section */}
        <section className="bg-white py-20">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-primary-600 font-semibold uppercase tracking-wide">
                ສາຍການຮຽນຂອງພວກເຮົາ
              </p>
              <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4 font-sans">
                ຄົ້ນພົບເສັ້ນທາງທີ່ເໝາະກັບອະນາຄົດ
              </h2>
              <p className="text-gray-600">
                ພວກເຮົາມີຫຼາຍຄອສຮຽນໃຫ້ເລືອກ ເຫມາະກັບທັກສະ ແລະ
                ຈຸດມຸ່ງຫມາຍຂອງທຸກຄົນ.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {trackCourses.map(course => (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow border border-[#F0E6D9]"
                >
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={420}
                    height={280}
                    className="w-full h-56 object-cover rounded-t-3xl"
                    loading="lazy"
                    quality={85}
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-primary-600">
                        {course.badge}
                      </span>
                      <span className="text-sm text-yellow-500 font-semibold">
                        ★ {course.rating}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3M12 6a9 9 0 100 18 9 9 0 000-18z"
                          />
                        </svg>
                        {course.duration}
                      </span>
                      <span>{course.lessons}</span>
                      <span>{course.sales}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">ຄ່າຮຽນ</p>
                        <p className="text-lg font-bold text-gray-900">
                          {course.price}
                        </p>
                      </div>
                      <Button size="sm">ເຂົ້າຮ່ວມຄອສ</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Learning Experience */}
        <section className="bg-[#FFF2E0] py-20 border-t border-[#F5E6D3]">
          <div className="container grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-white shadow-inner" />
              <div className="bg-transparent rounded-none shadow-none p-0 relative z-10">
                <Image
                  src="/images/fullstack.webp"
                  alt="Student working on laptop"
                  width={500}
                  height={420}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  quality={85}
                />
              </div>
            </div>
            <div>
              <p className="text-primary-600 font-semibold uppercase tracking-wide">
                ປະສົບການຊັ້ນພິເສດ
              </p>
              <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4 leading-tight font-sans">
                ປະສົບການຮຽນຮູ້ຊັ້ນພິເສດ
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                ຊ່ວຍອຳນວຍຄວາມສະດວກໃນການຮຽນຮູ້ ແລະ ມີຄວາມມ່ວນຊື່ນ
                ດ້ວຍລະບົບທີ່ອອກແບບມາເພື່ອນັກຮຽນທຸກລະດັບ
                ພ້ອມຊຸມຊົນ ແລະ ອ້າຍລ້ຽງທີ່ຄອຍສະໜັບສະໜູນທ່ານ.
              </p>

              <div className="space-y-4">
                {premiumHighlights.map(item => (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 bg-white rounded-2xl p-4 shadow"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-primary-500 flex items-center justify-center overflow-hidden">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain"
                        loading="lazy"
                        quality={80}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href="https://www.facebook.com/SkyMiniTV/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg">ລົງທະບຽນດຽວນີ້</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials & Mentors */}
        <section className="relative bg-white py-20">
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#FFF2E0] to-transparent pointer-events-none" />
          <div className="container relative z-10 space-y-16">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 font-sans">
                ບົດຄວາມຈາກນັກຮຽນ
              </h2>
              <p className="text-gray-600">
                ສຽງຈາກນັກຮຽນທີ່ໄດ້ປະສົບການກັບ Education.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map(testimonial => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100"
                >
                  <p className="text-gray-600 mb-6">{testimonial.quote}</p>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2">
              {[0, 1, 2, 3].map(index => (
                <span
                  key={`dot-${index}`}
                  className={`h-2 rounded-full transition-all ${
                    index === 1 ? 'w-10 bg-primary-600' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <div className="text-center max-w-2xl mx-auto">
              <p className="text-primary-600 font-semibold uppercase tracking-wide">
                ແນວທາງຂອງພວກເຮົາ
              </p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2 font-sans">
                ກຸ່ມອາຈານແລະທີມງານຜູ້ຊ່ຽວຊານ
              </h3>
              <p className="text-gray-600 mt-3">
                ມີທັງເຄື່ອງມືການຮຽນ ແລະຜູ້ນໍາທາງໃຫ້ຄໍາປຶກສາຢ່າງໃກ້ຊິດ.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentorTracks.map(mentor => (
                <div
                  key={mentor.id}
                  className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  <Image
                    src={mentor.image}
                    alt={mentor.name}
                    width={420}
                    height={280}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                    quality={85}
                  />
                  <div className="p-6 space-y-2">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">
                        {mentor.name}
                      </h4>
                      <p className="text-sm text-gray-500">{mentor.title}</p>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {mentor.description}
                    </p>
                    <div className="flex items-center justify-between pt-3">
                      <span className="text-sm font-semibold text-primary-600">
                        {mentor.topic}
                      </span>
                      <div className="h-4" />
                    </div>
                  </div>
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
