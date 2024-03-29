"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateComponent = exports.makeFileSync = exports.makeDirSync = exports.findDir = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const vue_1 = require("./templates/vue");
const vue_2 = require("./templates/vue-component");
const vue_3_class_components = require("./templates/vue3-class-component");
const vuex = require("./templates/vuex");
const constants_1 = require("./constants");
exports.findDir = (filePath) => {
    if (fs.statSync(filePath).isFile()) {
        return path.dirname(filePath);
    }
    return filePath;
};
exports.makeDirSync = (dir) => {
    if (fs.existsSync(dir)) {
        return;
    }
    if (!fs.existsSync(path.dirname(dir))) {
        exports.makeDirSync(path.dirname(dir));
    }
    fs.mkdirSync(dir);
};
exports.makeFileSync = (filename, content) => {
    if (!fs.existsSync(filename)) {
        exports.makeDirSync(path.dirname(filename));
        fs.createWriteStream(filename).write(content);
    }
};
exports.generateComponent = (file) => {
    const frameworkOptionSelection = [
        constants_1.CONSTANTS.FRAMEWORKS.VUECOMPONENTS,
        constants_1.CONSTANTS.FRAMEWORKS.VUE3COMPONENTS,
        constants_1.CONSTANTS.FRAMEWORKS.VUEJS,
        constants_1.CONSTANTS.FRAMEWORKS.VUEX
    ];
    const featureSelection = [
        constants_1.CONSTANTS.FEATURES.TS
    ];
    const featureSelectionVuex = [
        constants_1.CONSTANTS.FEATURES.TS,
        constants_1.CONSTANTS.FEATURES.NS
    ];
    const featureSelectionOptions = {
        canPickMany: true,
        placeHolder: "Select features to be included",
        ignoreFocusOut: true
    };
    vscode.window.showQuickPick(frameworkOptionSelection).then(selectedFramework => {
        vscode.window.showQuickPick(selectedFramework === constants_1.CONSTANTS.FRAMEWORKS.VUEX ? featureSelectionVuex : featureSelection, featureSelectionOptions).then(selectedFeatures => {
            console.log(selectedFeatures);
            if (selectedFramework === constants_1.CONSTANTS.FRAMEWORKS.VUEJS) {
                vscode.window
                    .showInputBox({
                    value: "",
                    prompt: "Component name",
                    ignoreFocusOut: true,
                    valueSelection: [-1, -1],
                })
                    .then((name) => {
                    if (!name) {
                        return;
                    }
                    const componentName = name.charAt(0).toUpperCase() + name.slice(1);
                    const dir = exports.findDir(file.fsPath);
                    if (selectedFeatures.includes(constants_1.CONSTANTS.FEATURES.TS)) {
                        exports.makeFileSync(`${dir}/${componentName}.vue`, vue_1.TS_TEMPLATE.replace(/{componentName}/g, componentName));
                    } else {
                        exports.makeFileSync(`${dir}/${componentName}.vue`, vue_1.JS_TEMPLATE.replace(/{componentName}/g, componentName));
                    }
                });
            } else if (selectedFramework === constants_1.CONSTANTS.FRAMEWORKS.VUECOMPONENTS) {
                vscode.window
                    .showInputBox({
                    value: "",
                    prompt: "Component name",
                    ignoreFocusOut: true,
                    valueSelection: [-1, -1],
                })
                    .then((name) => {
                    if (!name) {
                        return;
                    }
                    const componentName = name.charAt(0).toUpperCase() + name.slice(1);
                    const dir = exports.findDir(file.fsPath);
                    if (selectedFeatures.includes(constants_1.CONSTANTS.FEATURES.TS)) {
                        exports.makeFileSync(`${dir}/${componentName}.vue`, vue_2.TS_TEMPLATE.replace(/{componentName}/g, componentName));
                    } else {
                        exports.makeFileSync(`${dir}/${componentName}.vue`, vue_2.JS_TEMPLATE.replace(/{componentName}/g, componentName));
                    }
                });
            } else if (selectedFramework === constants_1.CONSTANTS.FRAMEWORKS.VUE3COMPONENTS) {
                vscode.window
                    .showInputBox({
                    value: "",
                    prompt: "Component name",
                    ignoreFocusOut: true,
                    valueSelection: [-1, -1],
                })
                    .then((name) => {
                    if (!name) {
                        return;
                    }
                    const componentName = name.charAt(0).toUpperCase() + name.slice(1);
                    const dir = exports.findDir(file.fsPath);
                    if (selectedFeatures.includes(constants_1.CONSTANTS.FEATURES.TS)) {
                        exports.makeFileSync(`${dir}/${componentName}.vue`, vue_3_class_components.TS_TEMPLATE.replace(/{componentName}/g, componentName));
                    } else {
                        exports.makeFileSync(`${dir}/${componentName}.vue`, vue_3_class_components.JS_TEMPLATE.replace(/{componentName}/g, componentName));
                    }
                });
            } else if (selectedFramework === constants_1.CONSTANTS.FRAMEWORKS.VUEX) {
                vscode.window
                    .showInputBox({
                    value: "",
                    prompt: "Store name",
                    ignoreFocusOut: true,
                    // valueSelection: [-1, -1],
                })
                    .then((name) => {
                    if (!name) {
                        return;
                    }
                    const storeName = name.charAt(0).toUpperCase() + name.slice(1);
                    const dir = exports.findDir(file.fsPath);
                    if (selectedFeatures.includes(constants_1.CONSTANTS.FEATURES.TS) && selectedFeatures.includes(constants_1.CONSTANTS.FEATURES.NS)) {
                        exports.makeFileSync(`${dir}/${storeName}.ts`, vuex.MODULE_TEMPLATE);
                    } else if (selectedFeatures.includes(constants_1.CONSTANTS.FEATURES.NS)) {
                        exports.makeFileSync(`${dir}/${storeName}.js`, vuex.MODULE_TEMPLATE);
                    } else if (selectedFeatures.includes(constants_1.CONSTANTS.FEATURES.TS)) {
                        exports.makeFileSync(`${dir}/${storeName}.ts`, vuex.VUEX_TEMPLATE);
                    } else {
                        exports.makeFileSync(`${dir}/${storeName}.js`, vuex.VUEX_TEMPLATE);
                    }
                });
            }
        })
    })
};
//# sourceMappingURL=generate.js.map