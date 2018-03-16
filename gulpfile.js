const rootpath			= 'htdocs/';
const cmnpath				= rootpath + 'common/';

const gulp 					= require('gulp');
const sass 					= require('gulp-sass');
const browserSync 	= require('browser-sync').create();
const autoprefixer	= require('gulp-autoprefixer');
const plumber 			= require('gulp-plumber');



gulp.task('browser-sync', () => {
	browserSync.init({
		server: {
			baseDir: rootpath
		}
		//proxy: "http://localhost/"
	});
});

gulp.task("browser-reload", () => {
  browserSync.reload();
});

gulp.task('sass', () =>{
	gulp.src(cmnpath + 'sass/*.scss')
	.pipe(plumber())
	.pipe(sass())
	.pipe(autoprefixer({
		browsers: [
			'last 2 versions'
		],
		grid: false,
		cascade: false
	}))
	.pipe(gulp.dest(cmnpath + 'css'))
	.pipe(browserSync.stream());
});


gulp.task('watch', () =>{
	gulp.watch(cmnpath + 'sass/**/*.scss', ['sass']);
	gulp.watch(rootpath	+	'**/*.html', ['browser-reload']);
});


gulp.task('default', ['browser-sync','watch']);
