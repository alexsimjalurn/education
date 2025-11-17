import Image from 'next/image';
import Link from 'next/link';

/**
 * Footer Component
 *
 * Consistent footer layout used across all pages.
 * Uses Tailwind CSS classes, no inline styles.
 */
export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-[#FDF8EE] text-gray-900 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/images/logo.png"
                alt="Education Logo"
                width={720}
                height={270}
                className="h-32 w-auto object-contain"
              />
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ຂ່າວສານ</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  ກ່ຽວກັບພວກເຮົາ
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  ວິທີການເຮັດວຽກ
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">
                  ຄອສຮ້ອນ
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  ບໍລິການ
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ກ່ຽວກັບພວກເຮົາ</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">
                  ໝວດໝູ່ການຮຽນ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ສະໜັບສະໜູນໂດຍ</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  ຄໍາຖາມທີ່ພົບເປັນປະຈໍາ
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  ສູນຊ່ວຍເຫຼືອ
                </Link>
              </li>
              <li>
                <Link href="/career" className="hover:text-white transition-colors">
                  ໂອກາດການຮ່ວມງານ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  ນະໂຍບາຍຄວາມປອດໄພ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-200 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-brandBlue"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>+856 20 9704 6394</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-brandBlue"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>phonesaikeomanibong@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-brandBlue"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Dongdok Village, Xaythany District, Vientiane, Lao PDR</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
            <div className="border-t border-gray-200 pt-8 mt-8 text-center text-gray-600 text-sm">
              <p className="flex items-center justify-center gap-3">
                Education-ການສຶກສາ. 2024
                <Link
                  href="https://github.com/alexsimjalurn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <Image
                    src="/images/github_icon.png"
                    alt="GitHub Logo"
                    width={28}
                    height={28}
                    className="w-7 h-7"
                  />
                </Link>
              </p>
        </div>
      </div>
    </footer>
  );
};
