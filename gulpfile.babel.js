//Constantes para el automatizador de tareas
const gulp = require('gulp')
const sass = require('gulp-sass')
const pug = require('gulp-pug')
const babel = require("gulp-babel")
const uglify = require("gulp-uglify")
const plumber = require('gulp-plumber')

const browserSync = require('browser-sync')

const server = browserSync.create()

gulp.task('sass', function () {
  return gulp
    .src('./dev/scss/index.scss')
    .pipe(plumber())
    .pipe(
      sass({
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
  return gulp.src('./dev/components/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./public/'))
})

gulp.task("babel", () => {
  return gulp
    .src("./dev/js/*.js")
    .pipe(plumber())
    .pipe(
      babel({ presets: [ "@babel/preset-env" ] })
    )
    .pipe(concat("scripts-min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./public/js/"))
})

gulp.task('default', () => {
  server.init({
    server: './public'
  })

  //SCSS
  gulp.watch('./dev/scss/**/*.scss', gulp.series('sass'))

  //PUG
  gulp.watch('./dev/components/**/*.pug', gulp.series('pug')).on('change', server.reload)

  //JS
  gulp.watch("./dev/js/*.js", gulp.series('babel')).on('change', server.reload)
})