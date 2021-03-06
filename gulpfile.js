const gulp = require('gulp');
const babel = require('gulp-babel');
const less = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const through2 = require('through2')
const tsConfig = require('./tsconfig.json')

const paths = {
  dest: {
    lib: tsConfig.compilerOptions.declarationDir, // commonjs 文件存放的目录名
    esm: 'esm', // ES module 文件存放的目录名
    dist: 'dist', // umd文件存放的目录名
  },
  styles: ['src/**/*.less', '!src/**/demo/*.less'],
  scripts: ['src/**/*.{ts,tsx,js,jsx}', '!src/**/demo/**', '!src/.umi', '!src/.umi-production'], // 脚本文件路径
  otherFile: ['src/**/**.*', '!src/**/*.{ts,tsx,js,jsx}'], // 非
};
/**
 * 当前组件样式 import './index.less' => import './index.less'
 * 依赖的其他组件样式 import '../test-comp/style' => import '../test-comp/style/css.js'
 * 依赖的其他组件样式 import '../test-comp/style/index.tsx' => import '../test-comp/style/css.js'
 * @param {string} content
 */
function cssInjection(content) {
    return content
        .replace(/\/style\/?'/g, "/style/css'")
        .replace(/\/style\/?"/g, '/style/css"')
        .replace(/\.less/g, '.css')
}

function lessImportToCss(content){
  return content.replace('.less', '.css')
}


/**
 * 编译脚本文件
 * @param {*} babelEnv babel环境变量
 * @param {*} destDir 目标目录
 */
function compileScripts(babelEnv, destDir) {
    const { scripts } = paths;
    process.env.BABEL_ENV = babelEnv;
    return gulp
        .src(scripts)
        .pipe(babel()) // 使用gulp-babel处理
        .pipe(
            through2.obj(function z(file, encoding, next) {
                this.push(file.clone());
                // 找到目标
                if (file.path.endsWith('.js')) {
                    const content = file.contents.toString(encoding)
                    // 将less的导入转成css的导入
                    file.contents = Buffer.from(lessImportToCss(content)); // 文件内容处理
                    this.push(file); // 新增该文件
                    next();
                } else {
                    next();
                }
            }),
        )
        .pipe(gulp.dest(destDir));
}

/**
 * 编译cjs
 */
function compileCJS() {
    const { dest } = paths;
    return compileScripts('cjs', dest.lib);
}

/**
 * 编译esm
 */
function compileESM() {
    const { dest } = paths;
    return compileScripts('esm', dest.esm);
}

/**
 * 拷贝less文件
 */
function copyLess() {
    return gulp.src(paths.styles).pipe(gulp.dest(paths.dest.lib))
}


function less2css() {
    return gulp
        .src(paths.styles)
        .pipe(less()) // 处理less文件
        .pipe(autoprefixer()) // 根据browserslistrc增加前缀
        .pipe(cssnano({ zindex: false, reduceIdents: false })) // 压缩
        .pipe(gulp.dest(paths.dest.lib))
}
function copyOtherFile() {
  return gulp.src(paths.otherFile).pipe(gulp.dest(paths.dest.lib));
}



// 串行执行编译脚本任务（cjs,esm） 避免环境变量影响
const buildScripts = gulp.series(compileCJS);

// 整体并行执行任务
const build = gulp.parallel(buildScripts, copyLess, less2css, copyOtherFile);

function watch(){
  function firstCb(){
    console.log('watch...')
  }
  build(firstCb)
  gulp.watch(['src'], function (cb){
    let start = new Date().getTime()
    console.log('文件改变')
    function finishCb(){
      let end = new Date().getTime()
      console.log('watching...', `耗时: ${end - start}ms`)
      cb()
    }
    build(finishCb)
  })
}

exports.default = build;
exports.watchTask = watch;
