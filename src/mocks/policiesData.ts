import type { Policy } from '~/types/data'

export const policies: Policy[] = [
  {
    id: 'p-1',
    name: 'Team admin',
    description: 'All CRUD operations of this team',
    lastUpdated: 'Jun 22, 2025 12:24 PM',
    applied: 'Y',
  },
  {
    id: 'p-2',
    name: 'Team access',
    description: 'Can log in to this team and view public details',
    lastUpdated: 'Jun 22, 2025 12:24 PM',
    applied: 'Y',
  },
  {
    id: 'p-3',
    name: 'Dev lead',
    description: 'Can invite and manage members',
    lastUpdated: 'Jun 22, 2025 12:24 PM',
    applied: 'Y',
  },
  {
    id: 'p-4',
    name: 'VZ Public API 1',
    description: 'See documentation and use credentials for VZ publ',
    lastUpdated: 'Jun 22, 2025 12:24 PM',
    applied: 'Y',
  },
  {
    id: 'p-5',
    name: 'VZ Public API 2',
    description: 'See documentation and use credentials for VZ publ',
    lastUpdated: 'Jun 22, 2025 12:24 PM',
    applied: 'Y',
  },
]
