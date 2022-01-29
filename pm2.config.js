module.exports = {
  apps: [
    // {
    //   name: 'Remix',
    //   script: 'remix dev',
    //   ignore_watch: ['.'],
    //   env: {
    //     FORCE_COLOR: '1',
    //     NODE_ENV: process.env.NODE_ENV ?? 'development',
    //   },
    // },
    {
      name: 'Server',
      script: 'cross-env NODE_ENV=development run-p dev:*',
      ignore_watch: ['.'],
      env: {
        FORCE_COLOR: '1',
      },
    },
    {
      name: 'Post css',
      script: 'npm run watch:css',
      watch: ['styles'],
      autorestart: false,
      env: {
        NODE_ENV: process.env.NODE_ENV ?? 'development',
        FORCE_COLOR: '1',
      },
    },
  ],
}
