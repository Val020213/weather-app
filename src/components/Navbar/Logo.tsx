import Link from 'next/link';
import { IconSunFilled } from '@tabler/icons-react';
import { cn } from '@/lib/utils/cn';

export const Logo = () => {
  return (
    <Link className={cn('flex', 'flex-row', 'items-center', 'gap-2')} href='/'>
      <h2 className={cn('text-gray-500', 'text-3xl')}>Weather</h2>
      <IconSunFilled className='text-yellow-400' />
    </Link>
  );
};
