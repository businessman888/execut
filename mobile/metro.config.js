const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// BLOQUEIO: Impede o Metro de criar a pasta "node:sea" que o Windows rejeita
config.resolver.unstable_enablePackageExports = false;

// Configuração para monorepo - prioriza node_modules local
config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
];

module.exports = config;