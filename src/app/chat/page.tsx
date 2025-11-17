'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Paperclip,
  Search,
  BookOpen,
  Mic,
  Menu,
  PlusCircle,
  Folders,
  Bookmark,
  Sparkles,
} from 'lucide-react';

const quickActions = [
  { label: 'ແນບ', Icon: Paperclip },
  { label: 'ຄົ້ນຫາ', Icon: Search },
  { label: 'ຮຽນຮູ້', Icon: BookOpen },
];

const primaryActions = [
  { label: 'ສ້າງແຊັດໃໝ່', Icon: PlusCircle },
  { label: 'ຄົ້ນຫາການສົນທະນາ', Icon: Search },
  { label: 'ຄັງຄວາມຮູ້', Icon: Folders },
];

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSubmit = () => {
    if (!message.trim()) return;
    alert('ແຊັດບັອດກໍາລັງຢູ່ໃນຂັ້ນຕອນການພັດທະນາ ພົບກັນໄວໆນີ້');
    setMessage('');
  };

  return (
    <div className="relative min-h-screen lg:h-screen bg-white text-gray-900">
      <Link
        href="/"
        className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full border border-black px-4 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-100 lg:right-6 lg:top-6"
      >
        <ArrowLeft className="h-4 w-4" />
        ກັບໄປໜ້າຫຼັກ
      </Link>

      <div className="flex min-h-screen lg:h-screen w-full flex-col lg:flex-row lg:items-stretch">
        {sidebarOpen ? (
          <aside className="hidden lg:flex h-full lg:h-screen w-80 flex-col border-r-2 border-gray-200 bg-white px-5 py-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-sm font-semibold text-gray-700">
                  AI
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">ແຊັດບັອດ</p>
                  <p className="text-xs text-gray-500">Education Platform</p>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex items-center rounded-full border border-gray-300 p-2 text-gray-700 transition hover:bg-gray-100"
                onClick={() => setSidebarOpen(false)}
                aria-label="Hide sidebar"
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-1 text-sm">
              {primaryActions.map(action => (
                <button
                  key={action.label}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-gray-700 transition hover:bg-gray-100"
                >
                  <action.Icon className="h-4 w-4 text-gray-500" />
                  {action.label}
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs font-medium uppercase text-gray-500">
              <Bookmark className="h-3.5 w-3.5" />
              ປະຫວັດແນະນໍາ
            </div>
            <div className="mt-3 flex-1" />

            <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-3 py-3 text-xs text-gray-600">
              <div>
                <p className="font-semibold text-gray-900">Education Chat</p>
                <p>ອັບເກຣດເພື່ອສົນທະນາສະບາຍຂຶ້ນ</p>
              </div>
              <Sparkles className="h-4 w-4 text-primary-600" />
            </div>
          </aside>
        ) : (
          <div className="hidden lg:flex w-12 items-start justify-center border-r-2 border-gray-200 pt-6 h-full lg:h-screen">
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-gray-300 p-2 text-gray-700 transition hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
              aria-label="Show sidebar"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        )}

        <section className="flex flex-1 flex-col items-center justify-center px-6 pt-20 pb-12 text-center lg:px-12 lg:pt-12">
          <p className="text-sm font-medium text-gray-500">ແຊັດບັອດ</p>
          <h1 className="mt-4 text-4xl font-semibold text-gray-900 font-sans">
            ມີຫຍັງໃຫ້ຂ້ອຍຊ່ວຍບໍ?
          </h1>

          <div className="mt-12 w-full max-w-3xl rounded-[24px] border border-gray-300 bg-white p-6 text-left shadow-xl space-y-4">
            <div className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3">
              <input
                type="text"
                placeholder="ຖາມຫຍັງກໍໄດ້..."
                className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
                value={message}
                onChange={event => setMessage(event.target.value)}
                onKeyDown={event => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    handleSubmit();
                  }
                }}
              />
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              {quickActions.map(action => (
                <span
                  key={action.label}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-3 py-1 text-gray-600"
                >
                  <action.Icon className="h-4 w-4" />
                  {action.label}
                </span>
              ))}
              {message.trim().length === 0 ? (
                <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-gray-300 px-3 py-1 text-gray-600">
                  <Mic className="h-4 w-4" />
                  ສຽງ
                </span>
              ) : (
                <button
                  type="button"
                  className="ml-auto inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 transition hover:bg-primary-100"
                  onClick={handleSubmit}
                >
                  ສົ່ງ
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

