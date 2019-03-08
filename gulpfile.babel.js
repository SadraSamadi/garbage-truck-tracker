import {dest, parallel, series, src, watch} from 'gulp';
import del from 'del';
import eslint from 'gulp-eslint';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import nodemon from 'nodemon';
import jest from 'gulp-jest';
import {Observable} from 'rxjs';

const paths = {
	src: {
		root: 'src',
		assets: 'src/**/*.{txt,json}',
		scripts: 'src/**/*.js'
	},
	dest: {
		root: 'dist'
	},
	test: {
		root: 'test'
	}
};

function clean() {
	return del(paths.dest.root);
}

function copy() {
	return src(paths.src.assets)
		.pipe(dest(paths.dest.root));
}

function lint() {
	return src(paths.src.scripts)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
}

function compile() {
	return src(paths.src.scripts)
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(sourcemaps.write('.'))
		.pipe(dest(paths.dest.root));
}

const scripts = parallel(
	lint,
	compile
);

export function serve() {
	return new Observable(observer => {
		watch(paths.src.assets, copy);
		watch(paths.src.scripts, scripts);
		nodemon({watch: paths.dest.root});
		// eslint-disable-next-line no-console
		nodemon.on('log', log => console.log(log.colour));
		nodemon.on('quit', code => {
			observer.complete();
			process.exit(code);
		});
	});
}

export const build = series(
	clean,
	parallel(
		copy,
		scripts
	)
);

export const dev = series(
	build,
	serve
);

export const test = function () {
	return src(paths.test.root)
		.pipe(jest());
};
