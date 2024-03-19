import React from 'react';
import { cn } from '@/lib/utils/cn';
import Container from './Container';
import WeatherIcon from './WeatherIcon';
import { ForecastWeatherDetailProps } from '@/lib/definitions';
import { convertKelvinToCelsius } from '@/lib/utils/convertKelvinToCelsius';
import WeatherDetails from './WeatherDetails';

export default function ForecastWeatherDetail(
  props: ForecastWeatherDetailProps
) {
  const {
    weatherIcon = '02d',
    date = '19.09',
    day = 'Tuesday',
    temp,
    feels_like,
    temp_min,
    temp_max,
    description,
  } = props;
  return (
    <Container className={cn('gap-4')}>
      <section className={cn('flex', 'gap-4', 'items-center', 'px-4')}>
        <div className={cn('flex', 'flex-col', 'gap-1', 'items-center')}>
          <WeatherIcon iconName={weatherIcon} />
          <p>{date}</p>
          <p className={cn('text-sm')}>{day} </p>
        </div>

        {/*  */}
        <div className={cn('flex', 'flex-col', 'px-4')}>
          <span className={cn('text-5xl')}>
            {convertKelvinToCelsius(temp ?? 0)}°
          </span>
          <p className={cn('text-xs', 'space-x-1', 'whitespace-nowrap')}>
            <span> Feels like</span>
            <span>{convertKelvinToCelsius(feels_like ?? 0)}°</span>
          </p>
          <p className={cn('capitalize')}> {description}</p>
        </div>
      </section>
      <section
        className={cn(
          'overflow-x-auto',
          'flex',
          'justify-between',
          'gap-4',
          'px-4',
          'w-full',
          'pr-10'
        )}
      >
        <WeatherDetails {...props} />
      </section>
    </Container>
  );
}
