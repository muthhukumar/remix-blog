const compress_images = require('compress-images')

compress_images(
  'images/**/*.{jpg,JPG,jpeg,JPEG,gif,png}',
  'public/images/',
  {compress_force: true, statistic: true, autoupdate: true},
  false,
  {jpg: {engine: 'mozjpeg', command: ['-quality', '10']}},
  {png: {engine: 'pngquant', command: ['-quality=8-10', '-o']}},
  {svg: {engine: false, command: false}},
  {
    gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web']},
  },
  function (error, completed, statistic) {
    console.log('-------------')
    console.log(error)
    console.log(completed)
    console.log(statistic)
    console.log('-------------')
  },
)
