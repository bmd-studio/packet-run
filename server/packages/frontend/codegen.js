/** @type {import('@graphql-codegen/cli').CodegenConfig} */
const codegenConfig = {
    schema: '../backend/src/data/schema.graphql',
    documents: ['src/**/*.tsx'],
    ignoreNoDocuments: true,
    generates: {
        './src/data/generated/index.tsx': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo',
                {
                    add: {
                        content: '/* eslint-disable */'
                    },
                }                    
            ],
        },
    }
};

module.exports = codegenConfig;
