export const createEnvironmentEndpoint = `setup-env`;
export const validateEnvironmentEndpoint = `validate-env`;
export const validateScenerioEndpoint = (envName) => `validate-scenario/${envName}`;
export const deleteEnvironmentEndpoint = `delete-env`;
export const fetchInstructionsModuleEndpoint = (moduleName) => `instructions-module/${moduleName}`;
export const fetchStudentDataEndpoint = `student-data`;