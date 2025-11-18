import Image from 'next/image';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';

const featuredImage = '/images/gallery/featured.jpg';

const galleryItems = [
  '/images/gallery/photo-01.jpg',
  '/images/gallery/photo-02.jpg',
  '/images/gallery/photo-03.jpg',
  '/images/gallery/photo-04.jpg',
  '/images/gallery/photo-05.jpg',
  '/images/gallery/photo-06.jpg',
  '/images/gallery/photo-07.jpg',
  '/images/gallery/photo-08.jpg',
  '/images/gallery/photo-09.jpg',
  '/images/gallery/photo-10.jpg',
  '/images/gallery/photo-11.jpg',
  '/images/gallery/photo-12.jpg',
];

export const dynamic = 'force-static';
export const revalidate = 3600;

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <section className="relative py-16 bg-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/BG.png')] bg-cover bg-center opacity-40" />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 right-10 w-72 h-72 bg-[#E0F0FF] rounded-full opacity-40 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[26rem] h-[26rem] bg-[#F1F5FF] rounded-full opacity-40 blur-3xl" />
          </div>

          <div className="container relative z-10">
            <div className="mb-10 overflow-hidden shadow-xl border border-white/50">
              <Image
                src={featuredImage}
                alt="Featured gallery"
                width={1600}
                height={900}
                className="w-full h-[360px] sm:h-[420px] lg:h-[480px] object-cover"
                priority
              />
            </div>

            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-3 font-sans">ຮູບພາບ</h1>
              <p className="text-gray-700">
                ລວມຮູບພາບກິດຈະກໍາ ແລະ ຜົນງານຂອງພວກເຮົາ
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryItems.map(path => (
                <div
                  key={path}
                  className="bg-white/80 backdrop-blur rounded-2xl shadow-lg overflow-hidden border border-white/40"
                >
                  <Image
                    src={path}
                    alt="Gallery"
                    width={600}
                    height={400}
                    className="w-full h-56 object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-gray-700">
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto min-w-[96px] px-3 py-1 text-xs"
              >
                ຍ້ອນກັບ
              </Button>
              <span className="px-3 py-1.5 rounded-full bg-white/80 shadow text-xs">
                ໜ້າ 1
              </span>
              <Button
                size="sm"
                className="w-full sm:w-auto min-w-[96px] px-3 py-1 text-xs"
              >
                ໜ້າຕໍ່ໄປ
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

