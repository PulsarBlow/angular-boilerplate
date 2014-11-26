'use strict';

var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
    replaceString: /\bgulp[\-.]/
});
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

// Lint JavaScript
gulp.task('jshint', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe(reload({stream: true, once: true}))
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.if(!browserSync.active, plugins.jshint.reporter('fail')));
});

// Scan html and optimize
gulp.task('html', function() {
   var assets = plugins.useref.assets({searchPath: '{.tmp,app}'});

    return gulp.src('app/**/*.html')
        .pipe(assets)
        .pipe(plugins.if('*.js', plugins.uglify({preserveComments: 'some'})))
        .pipe(plugins.if('*.css', plugins.uncss({
            html: [
                'app/index.html'
            ],
            // CSS selectors to ignore
            ignore: [
                // /.myselector/
            ]
        })))
        .pipe(plugins.if('*.css', plugins.csso()))
        .pipe(assets.restore())
        .pipe(plugins.useref())
        .pipe(plugins.if('*.html', plugins.minifyHtml()))
        .pipe(gulp.dest('dist'))
        .pipe(plugins.size({title: 'html'}));
});

// Optimize images
gulp.task('images', function() {
   return gulp.src('app/images/**/*')
       .pipe(plugins.cache(plugins.imagemin({
           'progressive': true,
           'interlaced': true
       })))
       .pipe(gulp.dest('dist/images'))
       .pipe(plugins.size({title: 'images'}));
});

// Copy fonts to dist
gulp.task('fonts', function(){
   return gulp.src(['app/fonts/**'])
       .pipe(gulp.dest('dist/fonts'))
       .pipe(plugins.size({title: 'fonts'}));
});

// Copy files to dist
gulp.task('copy', function () {
    return gulp.src([
        'app/*'
    ], {dot: true})
        .pipe(gulp.dest('dist'))
        .pipe(plugins.size({title: 'copy'}));
})

// Compile and prefix Stylesheets
gulp.task('styles', function () {
    // For best performance, don't add partial LESS to 'gulp.src' (component directory)
    return gulp.src([
        'app/styles/*.less',
        'app/styles/**/*.css'
    ])
        .pipe(plugins.changed('styles', {extensions: '.less'}))
        .pipe(plugins.less())
        .on('error', console.error.bind(console))
        .pipe(plugins.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        .pipe(gulp.dest('.tmp/styles'))
        // Concatenate and minify styles
        .pipe(plugins.if('*.css', plugins.csso()))
        .pipe(gulp.dest('dist/styles'))
        .pipe(plugins.size({title: 'styles'}));
})

// Clean output directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

// Serve the app directory
gulp.task('serve', ['styles'], function () {
    browserSync({
        notify: false,
        logPrefix: 'SRV',
        server: ['.tmp', 'app']
    });

    gulp.watch(['app/**/*.html'], reload);
    gulp.watch(['app/styles/**/*.{less, css}'], ['styles'], reload);
    gulp.watch(['app/scripts/**/*.js'], ['jshint']);
    gulp.watch(['app/images/**/*'], reload);
});

// Serve the dist directory
gulp.task('serve:dist', ['default'], function () {
    browserSync({
        notify: false,
        logPrefix: 'SRV',
        server: 'dist'
    });
});

// Build production files (default task)
gulp.task('default', ['clean'], function(cb) {
   runSequence('styles', ['jshint', 'html', 'images', 'fonts', 'copy'], cb);
});