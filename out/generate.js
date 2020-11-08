"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateComponent = exports.makeFileSync = exports.makeDirSync = exports.findDir = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const vue_1 = require("./templates/vue");
const vue_2 = require("./templates/vue-component");
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
        constants_1.CONSTANTS.FRAMEWORKS.VUEJS
    ];
    const featureSelection = [
        constants_1.CONSTANTS.FEATURES.TS
    ];
    const featureSelectionOptions = {
        canPickMany: true,
        placeHolder: "Select features to be included",
        ignoreFocusOut: true
    };
    vscode.window.showQuickPick(frameworkOptionSelection).then(selectedFramework => {
        vscode.window.showQuickPick(featureSelection, featureSelectionOptions).then(selectedFeatures => {
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
            }
        })
    })
};
//# sourceMappingURL=generate.js.map