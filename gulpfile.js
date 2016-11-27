const gulp = require('gulp');
const closureCompiler = require('gulp-closure-compiler');

gulp.task('minify', () => {
    const flags = {
            compilation_level: 'SIMPLE_OPTIMIZATIONS',
            language_in: 'ECMASCRIPT6_STRICT',
            language_out: 'ECMASCRIPT5_STRICT',
            warning_level: 'QUIET'
        };
    gulp.src('./dist/calendar.js')
    .pipe(closureCompiler({
        fileName: 'calendar.min.js',
        compilerFlags: flags
    }))
    .pipe(gulp.dest('./dist/'));
});
gulp.task('default', ['minify']);
