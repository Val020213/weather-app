import { cn } from '@/lib/utils/cn';
import { IconSearch } from '@tabler/icons-react';
import React from 'react';

type Props = {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export const SearchBar = (props: Props) => {
  return (
    <form
      onSubmit={props.onSubmit}
      className={cn(
        'flex',
        'justify-between',
        'items-center',
        'rounded-md',
        'border-2',
        'border-gray-100',
        'overflow-clip',
        'focus-within:border-blue-500',
        props.className
      )}
    >
      <input
        value={props.value}
        onChange={props.onChange}
        type='text'
        placeholder='Search location...'
        className={cn(
          'px-4',
          'py-2',
          'w-full',
          'sm:w-60',
          'focus:outline-none'
        )}
      />
      <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4'>
        <IconSearch />
      </button>
    </form>
  );
};
