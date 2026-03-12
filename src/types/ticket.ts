export type TicketPriority = 'High' | 'Medium' | 'Low';

export type TicketStatus = 'Open' | 'In Progress' | 'Cleared' | 'Completed' | 'Closed';

export type TicketCategory = 
  | 'Attendance Module'
  | 'Employee Information'
  | 'Income Tax'
  | 'Leave Module'
  | 'Loans'
  | 'Others'
  | 'Salary/Payroll Module';

export interface Ticket {
  id: string;
  subject: string;
  category: TicketCategory | string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  assignee: string;
  date: string;
  attachments?: string[];
}