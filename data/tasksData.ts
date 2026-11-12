export type TaskStatus = 'in_progress' | 'overdue' | 'completed';

export interface TaskItem {
  id: string;
  title: string;
  reqCode: string;
  subCategory: string;
  mainTask: string;
  dueDate: string;
  status: TaskStatus;
  progress: number;
}

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: '1',
    title: 'วิเคราะห์ฟีเจอร์กรองที่ต้องการ',
    reqCode: 'REQ-0152',
    subCategory: 'ตัวกรองลูกค้า CRM',
    mainTask: 'วางแผน',
    dueDate: '14 พ.ย.',
    status: 'in_progress',
    progress: 20,
  },
  {
    id: '2',
    title: 'API รายงานยอดขายรายเดือน',
    reqCode: 'REQ-0148',
    subCategory: 'รายงานยอดขาย',
    mainTask: 'พัฒนา',
    dueDate: '18 พ.ย.',
    status: 'in_progress',
    progress: 40,
  },
  {
    id: '3',
    title: 'แก้การอ่านไฟล์ Excel ภาษาไทย',
    reqCode: 'REQ-0135',
    subCategory: 'นำเข้าข้อมูลลูกค้า',
    mainTask: 'พัฒนา',
    dueDate: '5 พ.ย.',
    status: 'overdue',
    progress: 40,
  },
  {
    id: '4',
    title: 'แก้หน้าใบแจ้งหนี้โหลดค้าง',
    reqCode: 'REQ-0139',
    subCategory: 'ใบแจ้งหนี้',
    mainTask: 'พัฒนา',
    dueDate: '8 พ.ย.',
    status: 'completed',
    progress: 100,
  },
];
