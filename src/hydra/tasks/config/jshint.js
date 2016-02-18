module.exports = function(grunt) {
	grunt.config.set('jshint', {
		files: {
			src:['api/controllers/*.js','api/models/*.js']
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
};
