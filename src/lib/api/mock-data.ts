// api calls should be here - tho for authentication purposes there are plenty of libraries for frontend, also you can use rtk query type of things
// there is also a clear distinction between using rtk query, fetch on the server side and fetch requests made on the client side to the rest api
// there are also cases when you need to implement specific functionality on the next js server, that said you can invoke next js api directly - for example handling aws s3 buckets or next js cache revalidate funcionality
// so the exact implementation would depend on the results you would like to achieve, your goals, project timelines and many other factors


import { Order } from '@/types/orders';

type MockUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

// Mock users for authentication
export const mockUsers: MockUser[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123'
  }
];

// Mock orders
export const mockOrders: Order[] = [
  {
    id: 'order-1',
    orderNumber: 'ORD-2023-001',
    date: '2023-11-01',
    status: 'delivered',
    totalAmount: 111.97,
    currency: 'USD'
  },
  {
    id: 'order-2',
    orderNumber: 'ORD-2023-002',
    date: '2023-11-05',
    status: 'processing',
    totalAmount: 89.99,
    currency: 'USD'
  },
  {
    id: 'order-3',
    orderNumber: 'ORD-2023-003',
    date: '2023-11-07',
    status: 'shipped',
    totalAmount: 156.50,
    currency: 'USD'
  },
  {
    id: 'order-4',
    orderNumber: 'ORD-2023-004',
    date: '2023-11-10',
    status: 'pending',
    totalAmount: 49.99,
    currency: 'USD'
  }
];

// Mock language options for dropdown
export const languageOptions = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'ja', name: 'Japanese' }
];

// Mock currency options for dropdown
export const currencyOptions = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' }
];