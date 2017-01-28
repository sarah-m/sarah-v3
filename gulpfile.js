// on initialise les variable
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
var bourbon = require('node-bourbon');
var critical = require('critical');


//JS
gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children directories
        .pipe(sass({
            includePaths: require('node-bourbon').includePaths
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('useref', function(){
    var assets = useref.assets();
    return gulp.src('app/*.html')
        .pipe(assets)
        // Minifie seulement les fichiers CSS
        .pipe(gulpIf('*.css', minifyCSS()))
        // Minifie seulement les fichiers Javascript
        .pipe(gulpIf('*.js', uglify()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});

gulp.task('watch', ['browserSync', 'sass'], function (){
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
    // Other watchers
})

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
    })
})

gulp.task('critical', function() {
    return  gulp.src('app/*.html')
        .pipe(critical({
            base: app,
            inline: true,
            width: 320,
            height: 480,
            minify: true
        }))
        .pipe(gulp.dest(prod));
});

gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});
gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
})

//Watch task
gulp.task('default',function() {
    gulp.watch('app/scss/**/*.scss',['sass']);
});