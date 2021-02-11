//Constantes para el automatizador de tareas
const gulp = require('gulp')
const sass = require('gulp-sass')
const pug = require('gulp-pug')
const plumber = require('gulp-plumber')

const browserSync = require('browser-sync')

const server = browserSync.create()

gulp.task('sass', function () {
  return gulp.src('dev/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'  
    }))
    .pipe(
      sass({
        pretty: true,
      })
    )

    .pipe(gulp.dest('./public/css/'))
    .pipe(server.stream())
})

gulp.task('pug', () => {
  return gulp.src('./dev/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./public/'))
})

gulp.task('default', () => {
  server.init({
    server: './public'
  })
  
  gulp.watch('dev/scss/**/*.scss', gulp.series('sass'))

  //PUG
  gulp.watch('./dev/*.pug', gulp.series('pug')).on('change', server.reload)
})