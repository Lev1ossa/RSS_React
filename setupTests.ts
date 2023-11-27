import '@testing-library/jest-dom/vitest';
import { beforeAll, vi } from 'vitest';

beforeAll(() => {
  vi.mock('next/router', () => require('next-router-mock'));
  vi.mock('next/navigation', () => {
    const { useRouter } = require('next-router-mock');
    const usePathname = () => {
      const router = useRouter();
      return router.pathname;
    };
    const useSearchParams = () => {
      const router = useRouter();
      return new URLSearchParams(router.query);
    };
    return {
      useRouter,
      usePathname,
      useSearchParams,
    };
  });
});
