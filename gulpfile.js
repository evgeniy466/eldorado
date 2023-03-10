var gulp       = require('gulp'),
	sass         = require('gulp-sass')(require('sass')),
	browserSync  = require('browser-sync'),
	clean        = require('gulp-clean'),
	cache        = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass())
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		])
		.pipe(gulp.dest('app/js'));
});

gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('clean', function() {
	return gulp.src('dist', {allowEmpty: true}).pipe(clean());
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*')
		.pipe(gulp.dest('dist/img'));
});

gulp.task('prebuild', async function() {
 
	var buildCss = gulp.src([
		'app/css/main.css',
		])
	.pipe(gulp.dest('dist/css'))
 
	var buildFonts = gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))
 
	var buildJs = gulp.src('app/js/**/*')
	.pipe(gulp.dest('dist/js'))
 
	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));
 
});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})
 
gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
	gulp.watch('app/*.html', gulp.parallel('code'));
	gulp.watch(['app/js/common.js', 'app/libs/**/*.js'], gulp.parallel('scripts'));
});
gulp.task('default', gulp.parallel('sass', 'scripts', 'browser-sync', 'watch'));
gulp.task('build', gulp.series('clean', 'prebuild', 'img', 'sass', 'scripts'));