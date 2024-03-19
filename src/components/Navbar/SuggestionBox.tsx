import { cn } from '@/lib/utils/cn';

export function SuggestionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error,
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}) {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul
          className={cn(
            'mb-4',
            'bg-white',
            'absolute',
            'border',
            'top-[44px]',
            'left-0',
            'border-gray-300',
            'rounded-md',
            'min-w-[200px]',
            'flex',
            'flex-col',
            'gap-1',
            'py-2',
            'px-2'
          )}
        >
          {error && suggestions.length < 1 && (
            <li className={cn('text-red-500', 'p-1')}> {error}</li>
          )}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className={cn(
                'cursor-pointer',
                'p-1',
                'rounded',
                'hover:bg-gray-200'
              )}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
