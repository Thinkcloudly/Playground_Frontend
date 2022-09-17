export const createEnvironmentEndpoint = `setup-env`;
export const validateEnvironmentEndpoint = `validate-env`;
export const validateScenerioEndpoint = (envName) => `validate-scenario/${envName}`;
export const deleteEnvironmentEndpoint = `delete-env`;
export const fetchInstructionsModuleEndpoint = (module) => `https://master--thinkcloudly-playground-doc-server.netlify.app/.netlify/functions/server/instructions-module/${module}`;
