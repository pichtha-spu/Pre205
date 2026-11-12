'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { Bell1, Pencil1, Plus, Search1, Trash1 } from '@tailgrids/icons';

interface RequestCategory {
    id: string;
    name: string;
    description: string;
    usageCount: number;
    color: string;
    active: boolean;
}

const CATEGORY_COLORS = ['#0284c7', '#7c3aed', '#dc2626', '#d97706', '#16a34a', '#4f46e5'];

const INITIAL_CATEGORIES: RequestCategory[] = [
    {
        id: 'new-feature',
        name: 'พัฒนาใหม่',
        description: 'ระบบหรือฟีเจอร์ใหม่ที่ยังไม่มี',
        usageCount: 41,
        color: '#0284c7',
        active: true,
    },
    {
        id: 'improvement',
        name: 'ปรับปรุง',
        description: 'แก้ไขหรือเพิ่มความสามารถของระบบเดิม',
        usageCount: 49,
        color: '#7c3aed',
        active: true,
    },
    {
        id: 'bug',
        name: 'แก้ bug',
        description: 'ระบบทำงานผิดจากที่ควรเป็น',
        usageCount: 36,
        color: '#dc2626',
        active: true,
    },
    {
        id: 'support',
        name: 'แก้ปัญหา',
        description: 'ปัญหาการใช้งานทั่วไป สิทธิ์ ข้อมูล',
        usageCount: 22,
        color: '#d97706',
        active: true,
    },
];

export default function CategoriesPage() {
    const [categories, setCategories] = useState(INITIAL_CATEGORIES);
    const [search, setSearch] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState(CATEGORY_COLORS[0]);
    const [active, setActive] = useState(true);
    const [formError, setFormError] = useState('');

    const filteredCategories = useMemo(() => {
        const query = search.trim().toLocaleLowerCase('th');
        return categories.filter((category) =>
            `${category.name} ${category.description}`.toLocaleLowerCase('th').includes(query),
        );
    }, [categories, search]);

    const resetForm = () => {
        setEditingId(null);
        setName('');
        setDescription('');
        setColor(CATEGORY_COLORS[0]);
        setActive(true);
        setFormError('');
    };

    const handleEdit = (category: RequestCategory) => {
        setEditingId(category.id);
        setName(category.name);
        setDescription(category.description);
        setColor(category.color);
        setActive(category.active);
        setFormError('');
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const normalizedName = name.trim().toLocaleLowerCase('th');
        const duplicate = categories.some(
            (category) =>
                category.name.toLocaleLowerCase('th') === normalizedName && category.id !== editingId,
        );

        if (duplicate) {
            setFormError('มีหมวดคำขอนี้อยู่แล้ว');
            return;
        }

        if (editingId) {
            setCategories((current) =>
                current.map((category) =>
                    category.id === editingId
                        ? { ...category, name: name.trim(), description: description.trim(), color, active }
                        : category,
                ),
            );
        } else {
            setCategories((current) => [
                ...current,
                {
                    id: `category-${Date.now()}`,
                    name: name.trim(),
                    description: description.trim(),
                    usageCount: 0,
                    color,
                    active,
                },
            ]);
        }

        resetForm();
    };

    const handleDelete = (category: RequestCategory) => {
        if (category.usageCount > 0) return;
        setCategories((current) => current.filter((item) => item.id !== category.id));
        if (editingId === category.id) resetForm();
    };

    return (
        <main className="min-h-screen min-w-0 bg-[#f7f9fc] px-2 py-6 text-slate-800 sm:px-3 sm:py-8 lg:px-4">
            <div className="w-full">
                <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-[30px] font-bold leading-9 tracking-tight text-slate-900">หมวดคำขอ</h1>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="relative block w-[260px] max-w-[calc(100vw-100px)]">
                            <span className="sr-only">ค้นหาหมวดคำขอ</span>
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
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
                            <Bell1 className="h-4 w-4" />
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.65fr_1fr]">
                    <section aria-label="หมวดคำขอทั้งหมด" className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800">หมวดคำขอทั้งหมด</h2>
                        <p className="mt-1.5 text-sm text-slate-400">จัดการ เพิ่ม แก้ไข และลบหมวดคำขอ</p>

                        <div className="mt-2 divide-y divide-slate-200">
                            {filteredCategories.map((category) => (
                                <div
                                    key={category.id}
                                    className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5 py-4 sm:grid-cols-[100px_minmax(0,1fr)_auto_auto_auto]"
                                >
                                    <span
                                        className="w-fit rounded border px-3 py-1.5 text-xs font-semibold"
                                        style={{ color: category.color, borderColor: category.color }}
                                    >
                                        {category.name}
                                    </span>
                                    <p className="truncate text-sm text-slate-500">{category.description}</p>
                                    <span className="col-start-2 text-xs text-slate-400 sm:col-start-auto">
                                        ใช้ {category.usageCount} คำขอ
                                    </span>
                                    <button
                                        type="button"
                                        aria-label={`แก้ไขหมวด ${category.name}`}
                                        onClick={() => handleEdit(category)}
                                        className="row-start-1 flex h-9 w-9 items-center justify-center rounded text-slate-500 transition-colors hover:bg-slate-100 hover:text-indigo-600 sm:row-auto"
                                    >
                                        <Pencil1 className="h-5 w-5" />
                                    </button>
                                    <button
                                        type="button"
                                        aria-label={`ลบหมวด ${category.name}`}
                                        title={category.usageCount > 0 ? 'ลบได้เมื่อไม่มีคำขอใช้งานหมวดนี้' : 'ลบหมวดคำขอ'}
                                        disabled={category.usageCount > 0}
                                        onClick={() => handleDelete(category)}
                                        className="row-start-1 flex h-9 w-9 items-center justify-center rounded text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40 sm:row-auto"
                                    >
                                        <Trash1 className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}
                            {filteredCategories.length === 0 && (
                                <p className="py-8 text-center text-xs text-slate-400">ไม่พบหมวดคำขอที่ค้นหา</p>
                            )}
                        </div>

                        <p className="border-t border-slate-200 pt-3 text-xs text-slate-400">
                            ลบได้เฉพาะหมวดที่ยังไม่มีคำขอ · หมวดที่ใช้งานแล้วจะไม่สามารถลบได้
                        </p>
                    </section>

                    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800">
                            {editingId ? 'แก้ไขหมวดคำขอ' : 'เพิ่มหมวดใหม่'}
                        </h2>
                        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                            <label className="block space-y-2 text-sm font-semibold text-slate-700">
                                ชื่อหมวด <span className="text-red-500">*</span>
                                <input
                                    required
                                    value={name}
                                    onChange={(event) => {
                                        setName(event.target.value);
                                        setFormError('');
                                    }}
                                    placeholder="เช่น ขอข้อมูล/รายงาน"
                                    className="h-12 w-full rounded-lg border border-slate-300 px-4 text-sm font-normal outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </label>

                            <label className="block space-y-2 text-sm font-semibold text-slate-700">
                                คำอธิบาย
                                <textarea
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    placeholder="อธิบายว่าคำขอแบบไหนควรใช้หมวดนี้"
                                    rows={4}
                                    className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm font-normal outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </label>

                            <fieldset>
                                <legend className="mb-3 text-sm font-semibold text-slate-700">สีป้าย</legend>
                                <div className="flex items-center gap-3">
                                    {CATEGORY_COLORS.map((option) => (
                                        <button
                                            key={option}
                                            type="button"
                                            aria-label={`เลือกสี ${option}`}
                                            aria-pressed={color === option}
                                            onClick={() => setColor(option)}
                                            className={`h-6 w-6 rounded-full transition-transform hover:scale-110 ${color === option ? 'ring-2 ring-indigo-300 ring-offset-2' : ''
                                                }`}
                                            style={{ backgroundColor: option }}
                                        />
                                    ))}
                                </div>
                            </fieldset>

                            <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
                                <input
                                    type="checkbox"
                                    checked={active}
                                    onChange={(event) => setActive(event.target.checked)}
                                    className="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                เปิดใช้งานทันที
                            </label>

                            {formError && <p className="text-sm text-red-600">{formError}</p>}

                            <div className="flex gap-2">
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="h-11 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                                    >
                                        ยกเลิก
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-indigo-600 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
                                >
                                    <Plus className="h-4 w-4" />
                                    {editingId ? 'บันทึกการแก้ไข' : 'เพิ่มหมวด'}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </main>
    );
}
