const viewGenerator = require('./plop-templates2/view/prompt')
const componentGenerator = require('./plop-templates2/component/prompt')
const storeGenerator = require('./plop-templates2/store/prompt.js')

module.exports = function (plop) {
  plop.setGenerator('view', viewGenerator)
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('store', storeGenerator)
}
