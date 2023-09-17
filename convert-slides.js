// Load Asciidoctor.js and the reveal.js converter
var asciidoctor = require('@asciidoctor/core')()
var asciidoctorRevealjs = require('@asciidoctor/reveal.js')
const fse = require('fs-extra');
const fs = require('fs');

function copyDir(paramSrcDir, paramDestDir) {
    try {
        fse.copySync(paramSrcDir, paramDestDir, {overwrite: true})
    } catch (err) {
        console.error(err)
    }
}

asciidoctorRevealjs.register()

const srcDir = `./src/docs/asciidoc/linux-container/`;
const destDir = `./build/slides/`;

fs.rmSync(destDir, {recursive: true, force: true});

// Convert the document 'presentation.adoc' using the reveal.js converter
var options = {safe: 'safe', backend: 'revealjs', to_dir: destDir, imagesdir: srcDir.concat('images/'), mkdirs: true}
asciidoctor.convertFile(srcDir.concat('linux-container.adoc'), options)

copyDir(srcDir.concat('images/'), destDir.concat('images/'))
copyDir(srcDir.concat('css/'), destDir.concat('css/'))
