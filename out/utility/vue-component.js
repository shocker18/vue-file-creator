"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildComponentTemplate = void 0;
const fs = require("fs");
const path = require("path");
const mustache = require("mustache");
const vueComponent_1 = require("../templates/vue-component");
const constants_1 = require("../constants");
exports.buildComponentTemplate = (config, componentName, cPath) => {
    let componentExtension = '.vue';
    const FILE_NAMES = {
        component: `${componentName}${componentExtension}`
    };
    const COMPONENT_TEMPLATE = config.includes(constants_1.CONSTANTS.FEATURES.TS) ? vueComponent_1.default.TS_TEMPLATE : vueComponent_1.default.JS_TEMPLATE;
    // Writing main component file
    fs.writeFileSync(path.join(cPath, FILE_NAMES.component), mustache.render(COMPONENT_TEMPLATE, { componentName }));
};
//# sourceMappingURL=react.js.map