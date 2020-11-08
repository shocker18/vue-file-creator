"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildVueTemplate = void 0;
const fs = require("fs");
const path = require("path");
const mustache = require("mustache");
const vue_1 = require("../templates/vue");
const constants_1 = require("../constants");
exports.buildVueTemplate = (config, componentName, cPath) => {
    let componentExtension = `.vue`;
    const FILE_NAMES = {
        component: `${componentName}${componentExtension}`
    };
    const COMPONENT_TEMPLATE = config.includes(constants_1.CONSTANTS.FEATURES.TS) ? vue_1.default.TS_TEMPLATE : vue_1.default.JS_TEMPLATE;
    // Writing main component file
    fs.writeFileSync(path.join(cPath, FILE_NAMES.component), mustache.render(COMPONENT_TEMPLATE, { componentName }));
};
//# sourceMappingURL=vue.js.map