// deklarujemy użycie gulp oraz dodatku typescript
var gulp = require('gulp');
var ts = require('gulp-typescript');

// funkcja zgłaszająca błędy podczas pracy gulp'a
function errorLog (error) {
	console.error.bind(error);
	this.emit('end');
}

// funkcja kopiująca biblioteki do folderu src\assets\libs
gulp.task('copy_libs', function() {
	return gulp.src([
		'jspm_packages/github/jmcriffey/bower-traceur-runtime@0.0.91/traceur-runtime.min.js',
		'jspm_packages/system.js',
		'bower_components/angular/angular.js',
		'bower_components/jquery/dist/jquery.js',
		'bower_components/pdfmake/build/pdfmake.js',
		'bower_components/pdfmake/build/vfs_fonts.js'])
	.pipe(gulp.dest('src/assets/libs/'));
});

// funkcja kopiująca biblioteki bootstrap do folderu src\assets\bootstrap
gulp.task('copy_bootstrap', function() {
	return gulp.src('bower_components/bootstrap/dist/**/*')
	.pipe(gulp.dest('src/assets/bootstrap/'));
});

// funkcja kompilująca pliki nadrzędnego języka TypeScript
// do zwykłego języka JavaScrip
gulp.task('typescript-compile', function(){
	return gulp.src('src/**/*.ts')
	.pipe(ts({
		module: 'commonjs',
		target : 'ES5',
		emitDecoratorMetadata: true,
		declarationFiles: false,
		noExternalResolve: true
	}))
	.js.pipe(gulp.dest('src'));
});

// funkcja dla trybu "gulp watch". Jeżeli nastąpi zmiana zawartości
// jednego z plików *.ts w folderze \src, gulp automatycznie
// uruchomi funkcję typescript-compile
gulp.task('watch', function () {
	gulp.watch('src/**/*.ts', ['typescript-compile']);
});

// funkcja dla komendy "gulp" wywołanej z linii poleceń
gulp.task('default', ['typescript-compile', 'copy_libs', 'copy_bootstrap']);