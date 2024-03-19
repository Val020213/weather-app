import React from 'react';
import {
  IconDroplet,
  IconEye,
  IconSunrise,
  IconSunset,
  IconThermometer,
  IconWind,
} from '@tabler/icons-react';
import {
  SingleWeatherDetailProps,
  WeatherDetailProps,
} from '@/lib/definitions';
import { cn } from '@/lib/utils/cn';

export default function WeatherDetails(props: WeatherDetailProps) {
  const {
    visibility = '25km',
    humidity = '61%',
    windSpeed = '7 km/h',
    airPressure = '1012 hPa',
    sunrise = '6.20',
    sunset = '18:48',
  } = props;

  return (
    <>
      <SingleWeatherDetail
        icon={<IconEye />}
        information='Visibility'
        value={visibility}
      />
      <SingleWeatherDetail
        icon={<IconDroplet />}
        information='Humidity'
        value={humidity}
      />
      <SingleWeatherDetail
        icon={<IconWind />}
        information='Wind speed'
        value={windSpeed}
      />
      <SingleWeatherDetail
        icon={<IconThermometer />}
        information='Air Pressure'
        value={airPressure}
      />
      <SingleWeatherDetail
        icon={<IconSunrise />}
        information='Sunrise'
        value={sunrise}
      />
      <SingleWeatherDetail
        icon={<IconSunset />}
        information='Sunset'
        value={sunset}
      />
    </>
  );
}

function SingleWeatherDetail(props: SingleWeatherDetailProps) {
  return (
    <div
      className={cn(
        'flex',
        'flex-col',
        'justify-between ',
        'gap-2 ',
        'items-center',
        'text-xs',
        'font-semibold',
        'text-black/80'
      )}
    >
      <p className='whitespace-nowrap'>{props.information}</p>
      <div className='text-3xl'>{props.icon}</div>
      <p>{props.value}</p>
    </div>
  );
}
