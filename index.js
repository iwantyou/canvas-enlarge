if(process.env.NODE_ENV === 'production'){
    module.exports = require("./cjs/canvas-enlarge.min.js")
}else {
    module.exports = require("./cjs/canvas-enlarge.js")

}