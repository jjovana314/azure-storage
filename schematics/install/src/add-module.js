"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAzureStorageModuleToImports = addAzureStorageModuleToImports;
const core_1 = require("@angular-devkit/core");
const ast_1 = require("../utils/ast");
const nest_module_import_1 = require("../utils/nest-module-import");
function addAzureStorageModuleToImports(options) {
    return (tree, context) => {
        const MODULE_WITH_CONFIG = `AzureStorageModule.withConfig({sasKey: process.env['AZURE_STORAGE_SAS_KEY'], accountName: process.env['AZURE_STORAGE_ACCOUNT'], containerName: 'nest-demo-container' })`;
        const appModulePath = (0, core_1.normalize)(options.rootDir + `/` + options.rootModuleFileName + `.ts`);
        if ((0, nest_module_import_1.hasNestModuleImport)(tree, appModulePath, MODULE_WITH_CONFIG)) {
            return context.logger.warn(`>> Skiping importing "AzureStorageModule.withConfig()" because it is already imported in "${appModulePath}".`);
        }
        (0, ast_1.addModuleImportToRootModule)(options)(tree, MODULE_WITH_CONFIG, '@nestjs/azure-storage');
        return tree;
    };
}
