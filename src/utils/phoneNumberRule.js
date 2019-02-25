const { rule } = require('indicative');
module.exports = [rule('required'), rule('regex', /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/)];
