import gulp from "gulp";
import {deleteAsync} from 'del';
import fileinclude from 'gulp-file-include';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import browsersync from 'browser-sync';
import pug from "gulp-pug";
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webp-css';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import webpack from 'webpack-stream';
import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import fs from 'fs';
import fonter from 'gulp-fonter-fix';
import ttf2woff2 from 'gulp-ttf2woff2';
import svgSprite from 'gulp-svg-sprite';
import ifPlugin from 'gulp-if';
import zip from 'gulp-zip';
import * as nodePath from 'path'; 
import vinylFTP from 'vinyl-ftp';
import gutil from 'gulp-util';



const path = {
    build: {
        html: "dist",
        css: "dist/css/",
        js: "dist/js/",
        img: "dist/img",
        fonts: "dist/fonts",
        files: "dist/files"
    },
    src: {
        html: "src/*.html",
        scss: "src/scss/style.scss",
        js: "src/js/app.js",
        img: "src/img/**/*.{jpg,jpeg,png,gif,webp}",
        svg: "src/img/**/*.svg",
        fonts: "src/fonts",
        svgicons: "src/icons/*.svg",
        files: "src/files/*.*" 
    },
    clean: "dist",
    watch: {
        html: 'src/**/*.html',
        scss: "src/**/*.scss",
        js: "src/js/**/*.js",
        img: "src/img/**/*.{jpg,jpeg,png,gif,webp,svg}",
        svg: "src/icons/*.svg",
        files: "src/files/*.*"

    }
};
const root = nodePath.basename(nodePath.resolve())
const isBuild = process.argv.includes('--build');
const isDev = !process.argv.includes('--build');


async function del() {
  return await deleteAsync([path.clean])  
}

function copyFiles() {
    return gulp.src(path.src.files)
    .pipe(gulp.dest(path.build.files))
}

function html() {
    return gulp.src(path.src.html)
        .pipe(plumber(
            notify.onError({
                title: "HTML",
                massage: "Error: <%= error.message %>"
        })))
        // .pipe(pug())
        // .pipe(ifPlugin(
        //     isBuild, webpHtmlNosvg()
        //     )
        // )
        .pipe(fileinclude())
        .pipe(gulp.dest(path.build.html))
        .pipe(browsersync.stream())
}

function scss() {
    return gulp.src(path.src.scss, {sourcemaps: isDev})
    .pipe(plumber(
        notify.onError({
            title: "SCSS",
            massage: "Error: <%= error.message %>"
    })))
    .pipe(sass().on('error', sass.logError))
    .pipe(groupCssMediaQueries())
    // .pipe(ifPlugin(
    //     isBuild, webpcss({
    //         webpClass: ".webp",
    //         noWebpClass: ".no-webp"
    //     })
    //     )
    // )
    .pipe(ifPlugin(
        isBuild, autoprefixer({
            drid: true,
            cascade:true,
            overrideBrowserslist: ["last 3 versions"]
        })
        )
        
    )
    // Раскоментировать если файл не нужно сжимать
    // .pipe(gulp.dest(path.build.css))
    .pipe(ifPlugin(isBuild, cleanCss()))
    .pipe(rename({
        extname: ".min.css"
    }))
    .pipe(gulp.dest(path.build.css))
    .pipe(browsersync.stream())
}

function js() {
    return gulp.src(path.src.js, {sourcemaps: isDev})
    .pipe(plumber(
        notify.onError({
            title: "JS",
            massage: "Error: <%= error.message %>"
    })))
    .pipe(webpack({
        mode: isBuild ? 'production' : 'development',
        output: {
            filename: 'app.min.js',
        }
    }))
    .pipe(gulp.dest(path.build.js))
    .pipe(browsersync.stream())
}

function img() {
    return gulp.src(path.src.img)
    .pipe(plumber(
        notify.onError({
            title: "IMG",
            massage: "Error: <%= error.message %>"
    })))
    .pipe(newer(path.build.img))
    // .pipe(ifPlugin(isBuild, webp()))
    // .pipe(ifPlugin(isBuild, gulp.dest(path.build.img)))
    // .pipe(ifPlugin(isBuild, gulp.src(path.src.img)))
    .pipe(ifPlugin(isBuild, 
        imagemin({
            progressive: true,
            svgPluggins: [{removeViewBox: false}],
            interlaced: true,
            optimizationLevel: 3
        })
        )
    )
    .pipe(gulp.dest(path.build.img))
    .pipe(gulp.src(path.src.svg))
    .pipe(gulp.dest(path.build.img))
    .pipe(browsersync.stream())
}

function otfToTtf() {
    return gulp.src('src/fonts/*.otf', {})
    .pipe(plumber(
        notify.onError({
            title: "Fonts",
            massage: "Error: <%= error.message %>"
    })))
    .pipe(fonter({
        formats: ['ttf']
    }))
    .pipe(gulp.dest(path.build.fonts))
}

function ttfToWoff () {
    return gulp.src('src/fonts/*.ttf', {})
    .pipe(plumber(
        notify.onError({
            title: "Fonts",
            massage: "Error: <%= error.message %>"
    })))
    .pipe(fonter({
        formats: ['woff']
    }))
    .pipe(gulp.dest(path.build.fonts))
    .pipe(gulp.src('src/fonts/*.ttf', {}))
    .pipe(ttf2woff2())
    .pipe(gulp.dest(path.build.fonts))
}

function fontStyle() {
	let fontsFile = 'src/scss/base/fonts.scss';
    fs.readdir(path.build.fonts, function (err, fontsFiles) {
        if (fontsFile) {
            if(!fs.existsSync(fontsFile)) {
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                    for (var i = 0; i < fontsFiles.length; i++) {
                        let fontFileName = fontsFiles[i].split('.')[0];
                        if (newFileOnly !== fontFileName) {
                            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                            let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                            if (fontWeight.toLowerCase() === 'thin') {
                                fontWeight = 100;
                            } else if (fontWeight.toLowerCase() === 'extralight') {
                                fontWeight = 200;
                            } else if (fontWeight.toLowerCase() === 'light') {
                                fontWeight = 300;
                            } else if (fontWeight.toLowerCase() === 'medium') {
                                fontWeight = 500;
                            } else if (fontWeight.toLowerCase() === 'semibold') {
                                fontWeight = 600;
                            } else if (fontWeight.toLowerCase() === 'bold') {
                                fontWeight = 700;
                            } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                                fontWeight = 800;
                            } else if (fontWeight.toLowerCase() === 'black') {
                                fontWeight = 900;
                            } else {
                                fontWeight = 400;
                            }
                            fs.appendFile(fontsFile,
                                `@font-face {\n\tfont-family: ${fontName};\n\tfont-dispaly: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
                            newFileOnly = fontFileName;
                        }
                    }
                
            }
        }
    });
	return gulp.src('./src/');
    function cb() {}
    
}

export function svgSprive() {
    return gulp.src(path.src.svgicons)
    .pipe(plumber(
        notify.onError({
            title: "SvgSprites",
            massage: "Error: <%= error.message %>"
    })))
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: '../icons/icons.svg',
                example: true
            }
        },
    }))
    .pipe(gulp.dest(path.build.img))
}

function deployZip () {
    return gulp.src('./dist/**/*.*')
    .pipe(plumber(
        notify.onError({
            title: "Zip",
            massage: "Error: <%= error.message %>"
    })))
    .pipe(zip(`${root}.zip`))
    .pipe(gulp.dest('./'))
}

function server() {
    return browsersync.init({
        server: {
            baseDir: `${path.build.html}`
        },
        notify: false,
        port: 3000,
    })
}

// function ftp() {
//     var conn = vinylFTP.create({
//         host: "",
//         user: "",
//         pass: "",
//         parallel: 5,
//         log: gutil.log
//       });
//       return gulp.src(["dist/**"],{base:"./dist/",buffer: false})
//         .pipe(conn.newer(`/test/${root}`))
//         .pipe(conn.dest(`/test/${root}`));
   
// }

function watcher() {
    return gulp.watch(path.watch.html, html),
        gulp.watch(path.watch.scss, scss),
        gulp.watch(path.watch.js, js),
        gulp.watch(path.watch.img, img),
        gulp.watch(path.watch.svg, svgSprive),
        gulp.watch(path.watch.files, copyFiles)
}


const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle)
const maintasks = gulp.series(fonts, gulp.parallel(copyFiles, html, scss, js, img, svgSprive)) 
const dev = gulp.series(del, maintasks, gulp.parallel(watcher, server))
const build = gulp.series(del, maintasks)
const zipArchive = gulp.series(del, maintasks, deployZip)
// const deployFTP = gulp.series(del, maintasks, ftp)

export {dev, build, zipArchive}
// export { deployFTP}

gulp.task('default', dev)