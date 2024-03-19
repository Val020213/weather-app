'use client';
import { Navbar } from '@/components/Navbar/Navbar';
import { useQuery } from 'react-query';
import axios from 'axios';
import { WeatherDetail, WeatherData } from '@/lib/definitions';
import { cn } from '@/lib/utils/cn';
import { format, fromUnixTime, parseISO } from 'date-fns';
import Container from '@/components/Container';
import {
  convertKelvinToCelsius,
  convertMetersToKilometers,
  convertWindSpeed,
} from '@/lib/utils';
import { getDayOrNightIcon } from '@/lib/utils/getDayNightIcon';
import WeatherIcon from '@/components/WeatherIcon';
import WeatherDetails from '@/components/WeatherDetails';
import ForecastWeatherDetail from '@/components/ForecastWeatherDetail';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { loadingCityAtom, placeAtom } from '@/app/atom';
import { WeatherSkeleton } from '@/components/WeatherSkeleton';

export default function Home() {
  const [place, setPlace] = useAtom(placeAtom);
  const [loadingCity] = useAtom(loadingCityAtom);

  const { isLoading, error, data, refetch } = useQuery<WeatherData>(
    'repoData',
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
    }
  );

  useEffect(() => {
    refetch();
  }, [place, refetch]);

  const firstData = data?.list[0];

  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split('T')[0]
      )
    ),
  ];

  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split('T')[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });

  if (isLoading)
    return (
      <div className='flex items-center min-h-screen justify-center'>
        <p className='animate-bounce'>Loading...</p>
      </div>
    );

  return (
    <main className={cn('flex flex-col gap-4 bg-gray-100 min-h-screen ')}>
      <Navbar location={data?.city.name} />
      {loadingCity ? (
        <WeatherSkeleton />
      ) : (
        <div
          className={cn(
            'px-3',
            'max-w-7xl',
            'mx-auto',
            'flex',
            'flex-col',
            'gap-9',
            'w-full',
            'pb-10',
            'pt-4'
          )}
        >
          <h2 className={cn('flex', 'gap-1', 'text-2xl', 'items-end')}>
            <p>{format(parseISO(firstData?.dt_txt ?? ''), 'EEEE')}</p>
            <p className={cn('text-lg')}>
              ({format(parseISO(firstData?.dt_txt ?? ''), 'dd.MM.yyyy')})
            </p>
          </h2>
          <Container className={cn('gap-10', 'px-6', 'items-center')}>
            <div className={cn('flex', 'flex-col', 'px-4')}>
              <span className={cn('text-5xl')}>
                {convertKelvinToCelsius(firstData?.main.temp ?? 296.37)}°
              </span>
              <p className={cn('text-xs', 'space-x-1', 'whitespace-nowrap')}>
                <span> Feels like</span>
                <span>
                  {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°
                </span>
              </p>
              <p className={cn('text-xs', 'space-x-2')}>
                <span>
                  {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}
                  °↓{' '}
                </span>
                <span>
                  {' '}
                  {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}
                  °↑
                </span>
              </p>
            </div>
            <div
              className={cn(
                'flex',
                'gap-10',
                'sm:gap-16',
                'overflow-x-auto',
                'w-full',
                'justify-between',
                'pr-3'
              )}
            >
              {data?.list.map((d, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex',
                    'flex-col',
                    'justify-between',
                    'gap-2',
                    'items-center',
                    'text-xs',
                    'font-semibold'
                  )}
                >
                  <p className={cn('whitespace-nowrap')}>
                    {format(parseISO(d.dt_txt), 'h:mm a')}
                  </p>
                  <WeatherIcon
                    iconName={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)}
                  />
                  <p>{convertKelvinToCelsius(d?.main.temp ?? 0)}°</p>
                </div>
              ))}
            </div>
          </Container>
          <div className=' flex gap-4'>
            {/* left  */}
            <Container className='w-fit  justify-center flex-col px-4 items-center '>
              <p className=' capitalize text-center'>
                {firstData?.weather[0].description}{' '}
              </p>
              <WeatherIcon
                iconName={getDayOrNightIcon(
                  firstData?.weather[0].icon ?? '',
                  firstData?.dt_txt ?? ''
                )}
              />
            </Container>
            <Container className='bg-yellow-300/80  px-6 gap-4 justify-between overflow-x-auto'>
              <WeatherDetails
                visibility={convertMetersToKilometers(
                  firstData?.visibility ?? 10000
                )}
                airPressure={`${firstData?.main.pressure} hPa`}
                humidity={`${firstData?.main.humidity}%`}
                sunrise={format(data?.city.sunrise ?? 1702949452, 'H:mm')}
                sunset={format(data?.city.sunset ?? 1702517657, 'H:mm')}
                windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
              />
            </Container>
          </div>
          <section className='flex w-full flex-col gap-4  '>
            <p className='text-2xl'>Forecast (7 days)</p>
            {firstDataForEachDate.map((d, i) => (
              <ForecastWeatherDetail
                key={i}
                description={d?.weather[0].description ?? ''}
                weatherIcon={d?.weather[0].icon ?? '01d'}
                date={d ? format(parseISO(d.dt_txt), 'dd.MM') : ''}
                day={d ? format(parseISO(d.dt_txt), 'dd.MM') : 'EEEE'}
                feels_like={d?.main.feels_like ?? 0}
                temp={d?.main.temp ?? 0}
                temp_max={d?.main.temp_max ?? 0}
                temp_min={d?.main.temp_min ?? 0}
                airPressure={`${d?.main.pressure} hPa `}
                humidity={`${d?.main.humidity}% `}
                sunrise={format(
                  fromUnixTime(data?.city.sunrise ?? 1702517657),
                  'H:mm'
                )}
                sunset={format(
                  fromUnixTime(data?.city.sunset ?? 1702517657),
                  'H:mm'
                )}
                visibility={`${convertMetersToKilometers(
                  d?.visibility ?? 10000
                )} `}
                windSpeed={`${convertWindSpeed(d?.wind.speed ?? 1.64)} `}
              />
            ))}
          </section>
        </div>
      )}
    </main>
  );
}
