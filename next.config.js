/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    TELEGRAM_BOT_TOKEN: '7945811630:AAGkcI6sziITz2Joq02tp05eiA1sbDdb3Pc',
    TELEGRAM_ADMIN_ID: '5036849349'
  },
  // Добавляем конфигурацию для Vercel
  async headers() {
    return [
      {
        source: '/api/bot',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST' },
        ],
      },
    ]
  }
}

module.exports = nextConfig 