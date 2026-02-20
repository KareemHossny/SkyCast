const themeMap = {
  Clear: {
    bgFrom: '#f6c453',
    bgTo: '#f08d49',
    accent: '#e67e22',
    accentSoft: 'rgba(230,126,34,0.18)'
  },
  Clouds: {
    bgFrom: '#bfc6d1',
    bgTo: '#8e9eab',
    accent: '#6b7280',
    accentSoft: 'rgba(107,114,128,0.18)'
  },
  Rain: {
    bgFrom: '#6b8ba4',
    bgTo: '#4b6b82',
    accent: '#3b82f6',
    accentSoft: 'rgba(59,130,246,0.18)'
  },
  Drizzle: {
    bgFrom: '#6b8ba4',
    bgTo: '#4b6b82',
    accent: '#3b82f6',
    accentSoft: 'rgba(59,130,246,0.18)'
  },
  Thunderstorm: {
    bgFrom: '#3f3d56',
    bgTo: '#1f1b2e',
    accent: '#8b5cf6',
    accentSoft: 'rgba(139,92,246,0.18)'
  },
  Snow: {
    bgFrom: '#e6f3ff',
    bgTo: '#b6d6f5',
    accent: '#38bdf8',
    accentSoft: 'rgba(56,189,248,0.2)'
  },
  Mist: {
    bgFrom: '#a8b0b7',
    bgTo: '#7f8c8d',
    accent: '#64748b',
    accentSoft: 'rgba(100,116,139,0.2)'
  },
  Fog: {
    bgFrom: '#a8b0b7',
    bgTo: '#7f8c8d',
    accent: '#64748b',
    accentSoft: 'rgba(100,116,139,0.2)'
  },
  Haze: {
    bgFrom: '#a8b0b7',
    bgTo: '#7f8c8d',
    accent: '#64748b',
    accentSoft: 'rgba(100,116,139,0.2)'
  }
};

export function getWeatherTheme(condition) {
  return themeMap[condition] || themeMap.Clear;
}
