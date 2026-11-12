'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { Bell1, Close, Pencil1, Plus, Search1, UserMultiple4 } from '@tailgrids/icons';

interface TeamMember {
  id: string;
  name: string;
}

interface Team {
  id: string;
  name: string;
  department: string;
  leader: string;
  description: string;
  members: TeamMember[];
}

type ModalState =
  | { type: 'create' }
  | { type: 'edit'; teamId: string }
  | { type: 'member'; teamId: string }
  | null;

const INITIAL_TEAMS: Team[] = [
  {
    id: 'team-sales-system',
    name: 'ทีมพัฒนาระบบขาย',
    department: 'IT',
    leader: 'ต้น',
    description: 'พัฒนาและดูแลระบบขาย รวมถึงเครื่องมือที่ช่วยให้ฝ่ายขายทำงานได้สะดวกขึ้น',
    members: [
      { id: 'sales-member-ton', name: 'ต้น' },
      { id: 'sales-member-ploy', name: 'พลอย' },
    ],
  },
  {
    id: 'team-infrastructure',
    name: 'ทีมโครงสร้างพื้นฐาน',
    department: 'IT',
    leader: 'เก่ง',
    description: 'ดูแลเซิร์ฟเวอร์ เครือข่าย และความพร้อมใช้งานของระบบภายใน',
    members: [
      { id: 'infra-member-keng', name: 'เก่ง' },
      { id: 'infra-member-ton', name: 'ต้น' },
    ],
  },
  {
    id: 'team-support',
    name: 'ทีมสนับสนุนผู้ใช้',
    department: 'IT',
    leader: 'เก่ง',
    description: 'ช่วยเหลือสมาชิกและประสานงานแก้ไขปัญหาด้านระบบ',
    members: [
      { id: 'support-member-keng', name: 'เก่ง' },
      { id: 'support-member-nid', name: 'นิด' },
    ],
  },
];

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [search, setSearch] = useState('');
  const [limitToMyTeams, setLimitToMyTeams] = useState(false);
  const [modal, setModal] = useState<ModalState>(null);
  const [teamName, setTeamName] = useState('');
  const [department, setDepartment] = useState('');
  const [leader, setLeader] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [memberName, setMemberName] = useState('');

  const filteredTeams = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('th');

    return teams.filter((team) => {
      const matchesScope = !limitToMyTeams || team.members.some((member) => member.name === 'ต้น');
      const searchableText = [
        team.name,
        team.department,
        team.leader,
        team.description,
        ...team.members.map((member) => member.name),
      ]
        .join(' ')
        .toLocaleLowerCase('th');

      return matchesScope && searchableText.includes(query);
    });
  }, [limitToMyTeams, search, teams]);

  const openCreateModal = () => {
    setTeamName('');
    setDepartment('IT');
    setLeader('');
    setTeamDescription('');
    setModal({ type: 'create' });
  };

  const openEditModal = (team: Team) => {
    setTeamName(team.name);
    setDepartment(team.department);
    setLeader(team.leader);
    setTeamDescription(team.description);
    setModal({ type: 'edit', teamId: team.id });
  };

  const openMemberModal = (team: Team) => {
    setMemberName('');
    setModal({ type: 'member', teamId: team.id });
  };

  const closeModal = () => setModal(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!modal) return;

    if (modal.type === 'create') {
      setTeams((currentTeams) => [
        ...currentTeams,
        {
          id: `team-${Date.now()}`,
          name: teamName.trim(),
          department: department.trim(),
          leader: leader.trim(),
          description: teamDescription.trim(),
          members: [],
        },
      ]);
    } else if (modal.type === 'edit') {
      setTeams((currentTeams) =>
        currentTeams.map((team) =>
          team.id === modal.teamId
            ? {
                ...team,
                name: teamName.trim(),
                department: department.trim(),
                leader: leader.trim(),
                description: teamDescription.trim(),
              }
            : team,
        ),
      );
    } else {
      const newMemberName = memberName.trim();
      setTeams((currentTeams) =>
        currentTeams.map((team) =>
          team.id === modal.teamId &&
          !team.members.some((member) => member.name.toLocaleLowerCase('th') === newMemberName.toLocaleLowerCase('th'))
            ? {
                ...team,
                members: [...team.members, { id: `member-${Date.now()}`, name: newMemberName }],
              }
            : team,
        ),
      );
    }

    closeModal();
  };

  const modalTeam = modal?.type === 'member' ? teams.find((team) => team.id === modal.teamId) : undefined;
  const memberCount = new Set(teams.flatMap((team) => team.members.map((member) => member.name))).size;
  const departmentCount = new Set(teams.map((team) => team.department.trim()).filter(Boolean)).size;
  const modalTitle =
    modal?.type === 'create'
      ? 'สร้างทีมใหม่'
      : modal?.type === 'edit'
        ? 'แก้ไขข้อมูลทีม'
        : 'เพิ่มสมาชิกในทีม';

  return (
    <main className="min-h-screen min-w-0 bg-[#f6f8fb] px-6 py-7 text-slate-800 lg:px-8">
      <div className="mx-auto w-full max-w-[1440px] space-y-6">
        {/* Header - สไตล์เดียวกับ Dashboard */}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold leading-tight tracking-tight text-slate-900">ทีม</h1>
          </div>

          <div className="flex items-center gap-2.5">
            <label className="relative block w-[280px] max-w-[calc(100vw-110px)]">
              <span className="sr-only">ค้นหาทีมหรือสมาชิก</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="ค้นหาทีมหรือสมาชิก"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-4 pr-10 text-sm text-slate-700 shadow-xs outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
              <Search1 className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </label>
            <button
              type="button"
              aria-label="การแจ้งเตือน"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-xs transition-colors hover:bg-slate-50"
            >
              <Bell1 className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* กล่องควบคุมและแถบแจ้งเตือน - ถอดแบบจากกล่อง "ช่วงเวลา" ในหน้า Dashboard */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-sm font-medium text-slate-500">มุมมอง:</span>
              <button
                type="button"
                onClick={() => setLimitToMyTeams(false)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  !limitToMyTeams
                    ? 'border border-indigo-600 bg-indigo-50 text-indigo-700'
                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                ทีมทั้งหมด
              </button>
              <button
                type="button"
                onClick={() => setLimitToMyTeams(true)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  limitToMyTeams
                    ? 'border border-indigo-600 bg-indigo-50 text-indigo-700'
                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                เฉพาะทีมของฉัน
              </button>
            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              สร้างทีมใหม่
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-indigo-50/70 px-4 py-3 text-sm font-medium text-indigo-700">
            <div className="flex items-center gap-2.5">
              <UserMultiple4 className="h-4 w-4 shrink-0 text-indigo-600" />
              <p>ทีมย่อยเป็นฟีเจอร์เสริม · คนหนึ่งอยู่ได้หลายทีม · คำขอจำกัดการมองเห็นสมาชิกจะเห็นเฉพาะคำขอของทีมตัวเอง</p>
            </div>
            <label className="flex shrink-0 cursor-pointer items-center gap-2 text-xs font-medium text-slate-600 sm:text-sm">
              <input
                type="checkbox"
                checked={limitToMyTeams}
                onChange={(event) => setLimitToMyTeams(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              จำกัดการมองเห็นตามทีม
            </label>
          </div>
        </section>

        {/* แถวการ์ดสรุปตัวเลข - สไตล์เดียวกับ KPI Cards ในหน้า Dashboard */}
        <section aria-label="สรุปทีม" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: 'ทีมทั้งหมด', value: teams.length, detail: 'ทีมที่จัดการในระบบ', dot: 'bg-indigo-500' },
            { label: 'สมาชิกในทีม', value: memberCount, detail: 'นับสมาชิกที่ไม่ซ้ำกัน', dot: 'bg-emerald-500' },
            { label: 'แผนกที่ดูแล', value: departmentCount, detail: 'แผนกที่มีทีมรับผิดชอบ', dot: 'bg-sky-500' },
          ].map((item) => (
            <article key={item.label} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <span className={`h-2 w-2 rounded-full ${item.dot}`} />
                <span>{item.label}</span>
              </div>
              <p className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">{item.value}</p>
              <p className="mt-1.5 text-xs text-slate-400">{item.detail}</p>
            </article>
          ))}
        </section>

        {/* รายชื่อทีม */}
        <section aria-label="รายชื่อทีม" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">รายชื่อทีม</h2>
              <p className="text-xs text-slate-500">
                แสดง {filteredTeams.length} จาก {teams.length} ทีม
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredTeams.map((team) => (
              <article
                key={team.id}
                className="flex min-h-[320px] flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-bold text-slate-900">{team.name}</h3>
                    <p className="mt-1 text-xs text-slate-500">
                      แผนก {team.department} · หัวหน้าทีม: <span className="font-medium text-slate-700">{team.leader || 'ยังไม่กำหนด'}</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={`แก้ไข${team.name}`}
                    onClick={() => openEditModal(team)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200/70 text-slate-500 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <Pencil1 className="h-4 w-4" />
                  </button>
                </div>

                <p className="mt-3.5 min-h-10 text-sm leading-relaxed text-slate-600">{team.description}</p>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <h4 className="text-sm font-semibold text-slate-800">สมาชิกในทีม</h4>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                    {team.members.length} คน
                  </span>
                </div>

                <ul className="mt-3.5 space-y-3">
                  {team.members.map((member) => {
                    const teamCount = teams.filter((item) =>
                      item.members.some((teamMember) => teamMember.name === member.name),
                    ).length;

                    return (
                      <li key={member.id} className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-sm font-bold text-indigo-600">
                          {member.name.slice(0, 1)}
                        </span>
                        <span className="text-sm font-medium text-slate-800">{member.name}</span>
                        {teamCount > 1 && (
                          <span className="ml-auto rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-600">
                            อยู่ {teamCount} ทีม
                          </span>
                        )}
                      </li>
                    );
                  })}
                  {team.members.length === 0 && (
                    <li className="py-2 text-sm text-slate-400">ยังไม่มีสมาชิกในทีม</li>
                  )}
                </ul>

                <button
                  type="button"
                  onClick={() => openMemberModal(team)}
                  className="mt-auto inline-flex items-center gap-1.5 self-start rounded-lg px-3 py-2 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-50"
                >
                  <Plus className="h-4 w-4" />
                  เพิ่มสมาชิก
                </button>
              </article>
            ))}
          </div>
        </section>

        {filteredTeams.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-500">
            ไม่พบทีมที่ตรงกับเงื่อนไข
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-[1px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-modal-title"
            className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 id="team-modal-title" className="text-lg font-bold text-slate-900">
                {modalTitle}
                {modalTeam ? ` · ${modalTeam.name}` : ''}
              </h2>
              <button
                type="button"
                aria-label="ปิด"
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <Close className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {modal.type === 'member' ? (
                <label className="block space-y-1.5 text-sm font-medium text-slate-700">
                  ชื่อสมาชิก
                  <input
                    autoFocus
                    required
                    value={memberName}
                    onChange={(event) => setMemberName(event.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    placeholder="ระบุชื่อสมาชิก"
                  />
                </label>
              ) : (
                <>
                  <label className="block space-y-1.5 text-sm font-medium text-slate-700">
                    ชื่อทีม
                    <input
                      autoFocus
                      required
                      value={teamName}
                      onChange={(event) => setTeamName(event.target.value)}
                      className="h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      placeholder="เช่น ทีมพัฒนาระบบ"
                    />
                  </label>
                  <label className="block space-y-1.5 text-sm font-medium text-slate-700">
                    รายละเอียดทีม
                    <textarea
                      required
                      rows={3}
                      value={teamDescription}
                      onChange={(event) => setTeamDescription(event.target.value)}
                      className="w-full resize-y rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      placeholder="อธิบายหน้าที่หรือความรับผิดชอบของทีม"
                    />
                  </label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <label className="block space-y-1.5 text-sm font-medium text-slate-700">
                      แผนก
                      <input
                        required
                        value={department}
                        onChange={(event) => setDepartment(event.target.value)}
                        className="h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </label>
                    <label className="block space-y-1.5 text-sm font-medium text-slate-700">
                      หัวหน้าทีม
                      <input
                        required
                        value={leader}
                        onChange={(event) => setLeader(event.target.value)}
                        className="h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </label>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  บันทึก
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}