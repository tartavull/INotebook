module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        nodewebkit: {
            options: {
                build_dir: './dist',
                // choose what platforms to compile for here
                mac: true,
                win: true,
                linux32: true,
                linux64: true
            },
            src: ['./app/**/*']
        }
    })

    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.registerTask('default', ['nodewebkit']);
};