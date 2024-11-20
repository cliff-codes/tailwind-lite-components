export default {
    input: 'src/index.js', // Source file
    output: [
        {
            file: 'dist/index.cjs.js', // CommonJS output
            format: 'cjs',
        },
        {
            file: 'dist/index.esm.js', // ES module output
            format: 'esm',
        },
    ],
    plugins: [],
};
