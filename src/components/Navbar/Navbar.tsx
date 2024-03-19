'use client';
import { Logo } from './Logo';
import { IconCurrentLocation, IconMapPin } from '@tabler/icons-react';
import { SearchBar } from './SearchBar';
import { cn } from '@/lib/utils/cn';
import { useState } from 'react';
import axios from 'axios';
import { SuggestionBox } from './SuggestionBox';
import { loadingCityAtom, placeAtom } from '@/app/atom';
import { useAtom } from 'jotai';

export const Navbar = ({ location }: { location?: string }) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [place, setPlace] = useAtom(placeAtom);
  const [_, setLoadingCity] = useAtom(loadingCityAtom);

  async function handleInputChange(value: string) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
        );

        const suggestions = response.data.list.map((item: any) => item.name);
        setSuggestions(suggestions);
        setError('');
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  function handleSuggestionClick(value: string) {
    setCity(value);
    setShowSuggestions(false);
  }

  function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    setLoadingCity(true);
    e.preventDefault();
    if (suggestions.length == 0) {
      setError('Location not found');
      setLoadingCity(false);
    } else {
      setError('');
      setTimeout(() => {
        setLoadingCity(false);
        setPlace(city);
        setShowSuggestions(false);
      }, 500);
    }
  }

  function handleCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          setLoadingCity(true);
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
          );
          setTimeout(() => {
            setLoadingCity(false);
            setPlace(response.data.name);
          }, 500);
        } catch (error) {
          setLoadingCity(false);
        }
      });
    }
  }

  const SearchComponent = ({ className }: { className?: string }) => {
    return (
      <div className={cn('relative', className)}>
        <SearchBar
          value={city}
          onSubmit={handleSubmitSearch}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <SuggestionBox
          {...{
            showSuggestions,
            suggestions,
            handleSuggestionClick,
            error,
          }}
        />
      </div>
    );
  };

  return (
    <nav
      className={cn(
        'shadow-sm',
        'sticky',
        'top-0',
        'z-50',
        'bg-white',
        'w-full',
        'px-1',
        'sm:px-4',
        'py-2',
        'gap-2',
        'flex',
        'flex-col',
        'justify-start'
      )}
    >
      <div
        className={cn('flex', 'flex-row', 'items-center', 'justify-between')}
      >
        <Logo />
        <section className={cn('flex', 'gap-2', 'items-center')}>
          <button onClick={handleCurrentLocation}>
            <IconCurrentLocation
              className={cn(
                'text-gray-500',
                'opacity-60',
                'hover:opacity-100',
                'cursor-pointer'
              )}
            />
          </button>
          <IconMapPin />
          <p>{location}</p>
          <SearchComponent className='hidden sm:block' />
        </section>
      </div>
      <SearchComponent className='sm:hidden' />
    </nav>
  );
};
