'use strict';
const gulp = require('gulp'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass'), // SCSS в css
	rename = require("gulp-rename"), //для .min 
	autoprefixer = require('gulp-autoprefixer'), // префиксы автоматически для всех браузеров
	cleanCSS = require('gulp-clean-css'), // для IE8
	del = require("del"),
	imagemin = require('gulp-imagemin'), // сжать картинки
	htmlmin = require('gulp-htmlmin'), // убрать все пробелы в html
	uglify = require('gulp-uglify'), // мнификация js
	// webpack = require('webpack'),
	webpackStream = require('webpack-stream'),
	gcmq = require('gulp-group-css-media-queries'), // Media-запросы сгрупировать вниз файла
	fileInclude = require('gulp-file-include'),
	webp = require('gulp-webp'),
	webphtml = require('gulp-webp-html'),
	webpcss = require('gulp-webpcss'),
	ttf2woff = require('gulp-ttf2woff'),
	ttf2woff2 = require('gulp-ttf2woff2'),
	fonter = require('gulp-fonter'),
	fs = require('fs');

const srcDir = 'src';
const distDir = 'dist';

const dir = {
	src: {
		html: srcDir + '/*.html',
		sass: srcDir + '/scss/**/*.+(scss|sass|css)',
		js: srcDir + '/js/**/*.js',
		fonts: srcDir + '/fonts/**/*',
		img: srcDir + '/img/**/*',
		icons: srcDir + '/icons/**/*',
		mailer: srcDir + '/mailer/**/*',
		views: srcDir + '/views/*.html'
	},
	dist: {
		this: distDir,
		css: distDir + '/css',
		fonts: distDir + '/fonts',
		img: distDir + '/img',
		icons: distDir + '/icons',
		maliler: distDir + '/mailer'
	},
	clean: "./" + distDir + "/",
};

gulp.task('server', function () {
	browserSync.init({
		server: {
			baseDir: dir.dist.this
		}
	});

	gulp.watch(dir.src.html).on('change', browserSync.reload);
});

gulp.task('styles', () =>
	gulp.src(dir.src.sass)
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(webpcss())
		.pipe(autoprefixer('last 5 versions'))
		.pipe(gcmq())
		.pipe(cleanCSS({
			compatibility: 'ie8'
		}))
		.pipe(rename({
			prefix: "",
			suffix: ".min",
		}))
		.pipe(gulp.dest(dir.dist.css))
		.pipe(browserSync.stream())
);

gulp.task('watch', () => {
	gulp.watch(dir.src.views).on('change', gulp.parallel('html', browserSync.reload));
	gulp.watch(dir.src.sass).on('change', gulp.parallel('styles', browserSync.reload));
	gulp.watch(dir.src.html).on('change', gulp.parallel('html', browserSync.reload));
	gulp.watch(dir.src.js).on('change', gulp.parallel('scripts', browserSync.reload));
});

gulp.task('html', () => gulp.src(dir.src.html)
	.pipe(fileInclude({
		prefix: '@@',
		basepath: '@file'
	}))
	.pipe(webphtml())
	.pipe(htmlmin({
		collapseWhitespace: true
	}))
	.pipe(gulp.dest(dir.dist.this))
	.pipe(browserSync.stream())
);

gulp.task('scripts', () => gulp.src("src/js/script.js")
	.pipe(webpackStream({
		mode: 'production',
		output: {
			filename: 'app.js'
		},
		// devtool: "source-map",
		module: {
			rules: [{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', {
								debug: true,
								corejs: 3,
								useBuiltIns: "usage"
							}]
						]
					}
				}
			}]
		}
	}))
	.pipe(uglify())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('dist/js/'))
);

gulp.task('fonts', () => {
	gulp.src(dir.src.fonts)
		.pipe(ttf2woff())
		.pipe(gulp.dest(dir.dist.fonts));
	return gulp.src(dir.src.fonts)
		.pipe(ttf2woff2())
		.pipe(gulp.dest(dir.dist.fonts));
});

gulp.task('icons', () => gulp.src(dir.src.icons)
	.pipe(webp({
		quality: 70
	}))
	.pipe(gulp.dest(dir.dist.icons))
	.pipe(gulp.src(dir.src.icons))
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{
			removeViewBox: false
		}],
		interlaced: true,
		optimizationLevel: 3
	}))
	.pipe(gulp.dest(dir.dist.icons))
	.pipe(browserSync.stream())
);

gulp.task('mailer', () => gulp.src(dir.src.mailer)
	.pipe(gulp.dest(dir.dist.maliler))
	.pipe(browserSync.stream())
);

gulp.task('images', () => gulp.src(dir.src.img)
	.pipe(webp({
		quality: 70
	}))
	.pipe(gulp.dest(dir.dist.img))
	.pipe(gulp.src(dir.src.img))
	.pipe(imagemin({
		interlaced: true,
		progressive: true,
		optimizationLevel: 5,
		svgoPlugins: [{
			removeViewBox: true
		}]
	}))
	.pipe(gulp.dest(dir.dist.img))
	.pipe(browserSync.stream())
);

gulp.task('otf2ttf', () => gulp.src(srcDir + '/fonts/*.otf')
	.pipe(fonter({
		formats: ['ttf']
	}))
	.pipe(gulp.dest(srcDir + '/fonts/'))
);


function clean() {
	return del(dir.clean);
}

const build = gulp.series(clean,
	gulp.parallel(
		'watch',
		'server',
		'styles',
		'scripts',
		'fonts',
		'icons',
		'mailer',
		'images',
		'html',
	)
);

exports.default = build;
