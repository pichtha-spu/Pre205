'use client';

import { useState } from 'react';
import { Bell1, Calendar, Search1 } from '@tailgrids/icons';

const periods = ['ปีนี้', 'ไตรมาสนี้', 'เดือนนี้', 'กำหนดเอง'];

const summary = [
  { label: 'คำขอทั้งหมด', value: '148', detail: 'ในช่วงที่เลือก', color: 'bg-slate-400' },
  { label: 'อนุมัติแล้ว', value: '112', detail: 'ผ่านขั้นถัดไป', color: 'bg-green-600' },
  { label: 'ปฏิเสธ/ส่งกลับ', value: '14', detail: 'พร้อมเหตุผล', color: 'bg-red-600' },
  { label: 'กำลังดำเนินการ', value: '23', detail: 'มีงานย่อยค้าง', color: 'bg-indigo-600' },
  { label: 'เสร็จสิ้น', value: '89', detail: 'ตรวจรับแล้ว', color: 'bg-sky-600' },
  { label: 'เกินกำหนด', value: '6', detail: 'ต้องติดตาม', color: 'bg-amber-600' },
];

const monthlyRequests = [
  { month: 'ม.ค.', count: 9 },
  { month: 'ก.พ.', count: 12 },
  { month: 'มี.ค.', count: 15 },
  { month: 'เม.ย.', count: 11 },
  { month: 'พ.ค.', count: 14 },
  { month: 'มิ.ย.', count: 16 },
  { month: 'ก.ค.', count: 13 },
  { month: 'ส.ค.', count: 17 },
  { month: 'ก.ย.', count: 15 },
  { month: 'ต.ค.', count: 14 },
  { month: 'พ.ย.', count: 12 },
];

const categories = [
  { name: 'พัฒนาใหม่', count: 41, color: 'bg-sky-600' },
  { name: 'ปรับปรุง', count: 49, color: 'bg-violet-600' },
  { name: 'แก้ bug', count: 36, color: 'bg-red-600' },
  { name: 'แก้ปัญหา', count: 22, color: 'bg-amber-600' },
];

const departments = [
  { name: 'ฝ่ายขาย', count: 52 },
  { name: 'ฝ่ายทะเบียน', count: 38 },
  { name: 'ฝ่ายบัญชี', count: 31 },
  { name: 'ฝ่าย IT', count: 27 },
];

const overdueTasks = [
  { title: 'นำเข้าข้อมูลลูกค้าจาก Excel ไม่ได้', code: 'REQ-0135', date: '5 พ.ย.' },
  { title: 'ปรับรูปแบบใบเสร็จฝ่ายบัญชี', code: 'REQ-0129', date: '8 พ.ย.' },
];

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0]);

  return (
    <main className="min-h-screen min-w-0 bg-[#f7f9fc] px-2 py-6 text-slate-800 sm:px-3 sm:py-8 lg:px-4">
      <div className="w-full">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-[30px] font-bold leading-9 tracking-tight text-slate-900">Dashboard</h1>
          </div>

          <div className="flex items-center gap-2">
            <label className="relative block w-[260px] max-w-[calc(100vw-100px)]">
              <span className="sr-only">ค้นหารหัสหรือชื่อคำขอ</span>
              <input
                type="search"
                placeholder="ค้นหารหัสหรือชื่อคำขอ"
                className="h-11 w-full rounded-lg border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
              <Search1 className="pointer-events-none absolute right-2.5 top-2 h-4 w-4 text-slate-400" />
            </label>
            <button
              type="button"
              aria-label="การแจ้งเตือน"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50"
            >
              <Bell1 className="h-5 w-5" />
            </button>
          </div>
        </header>

        <section
          aria-label="ตัวกรองช่วงเวลา"
          className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-medium text-slate-500">ช่วงเวลา:</span>
              {periods.map((period) => (
                <button
                  key={period}
                  type="button"
                  aria-pressed={selectedPeriod === period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                    selectedPeriod === period
                      ? 'border-indigo-500 bg-indigo-50 font-semibold text-indigo-700'
                      : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="inline-flex h-11 min-w-[260px] items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-600"
            >
              <span>1 ม.ค. 2569 – 11 พ.ย. 2569</span>
              <Calendar className="h-4 w-4 text-slate-400" />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2.5 rounded-lg bg-indigo-50 px-4 py-3 text-xs font-semibold text-indigo-700">
            <Calendar className="h-4 w-4 shrink-0" />
            <span>กำลังแสดง: {selectedPeriod} 2569 (ค่าเริ่มต้น) · 1 ม.ค. – 11 พ.ย. 2569 · ทุกแผนก</span>
          </div>
        </section>

        <section aria-label="สรุปคำขอ" className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {summary.map((item) => (
            <article key={item.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <span className={`h-2 w-2 rounded-full ${item.color}`} />
                {item.label}
              </div>
              <p className="mt-2 text-[28px] font-bold leading-8 text-slate-900">{item.value}</p>
              <p className="mt-1 text-xs text-slate-400">{item.detail}</p>
            </article>
          ))}
        </section>

        <section className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-12">
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-7">
            <h2 className="text-lg font-semibold text-slate-800">คำขอรายเดือน</h2>
            <p className="mt-1 text-xs text-slate-400">ม.ค. – พ.ย. 2569</p>
            <div className="mt-6 flex h-[175px] items-end justify-between gap-1">
              {monthlyRequests.map((item, index) => (
                <div key={item.month} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end">
                  <span className="mb-1 text-[11px] font-semibold text-slate-500">{item.count}</span>
                  <div
                    className={`w-full max-w-[30px] rounded-t-[4px] ${
                      index === monthlyRequests.length - 1 ? 'bg-indigo-600' : 'bg-indigo-50'
                    }`}
                    style={{ height: `${(item.count / 18) * 128}px` }}
                  />
                  <span className="mt-2 text-[10px] text-slate-400">{item.month}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-5">
            <h2 className="text-lg font-semibold text-slate-800">ตามหมวดคำขอ</h2>
            <div className="mt-5 space-y-4">
              {categories.map((category) => (
                <div key={category.name} className="flex items-center gap-2.5">
                  <span className="w-[100px] shrink-0 text-sm text-slate-500">{category.name}</span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${category.color}`}
                      style={{ width: `${(category.count / 49) * 100}%` }}
                    />
                  </div>
                  <span className="w-7 text-right text-xs font-semibold text-slate-700">{category.count}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-12">
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-6">
            <h2 className="text-lg font-semibold text-slate-800">ตามแผนกที่ส่งคำขอ</h2>
            <div className="mt-5 space-y-4">
              {departments.map((department) => (
                <div key={department.name} className="flex items-center gap-2.5">
                  <span className="w-[110px] shrink-0 text-sm text-slate-500">{department.name}</span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-indigo-600"
                      style={{ width: `${(department.count / 52) * 100}%` }}
                    />
                  </div>
                  <span className="w-7 text-right text-xs font-semibold text-slate-700">{department.count}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm xl:col-span-6">
            <div className="flex items-center justify-between bg-slate-100/90 px-5 py-4 text-xs font-semibold text-slate-500">
              <h2>งานเกินกำหนด</h2>
              <span>เลยกำหนด</span>
            </div>
            <div className="divide-y divide-slate-100">
              {overdueTasks.map((task) => (
                <div key={task.code} className="flex items-center justify-between gap-3 px-5 py-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">{task.title}</p>
                    <p className="mt-1 text-xs text-slate-400">{task.code} · {task.date}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-[11px] font-semibold text-white">
                    <span className="h-2 w-2 rounded-full bg-white" />
                    เกินกำหนด
                  </span>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
