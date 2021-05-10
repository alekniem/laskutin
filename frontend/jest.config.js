module.exports = {
    moduleFileExtensions: ["js", "jsx", "json", "vue"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^UT/(.*)$": "<rootDir>/tests/unit/$1",
    },
    setupFilesAfterEnv: ["<rootDir>/tests/unit/lsk_test_setup.js"],
    snapshotSerializers: ["jest-serializer-html"],
    testEnvironment: "jest-environment-jsdom-fifteen",
    testMatch: ["**/tests/unit/**/*.spec.[jt]s?(x)", "**/__tests__/*.[jt]s?(x)"],
    testURL: "http://localhost/",
    transform: {
        "^.+\\.vue$": require.resolve("vue-jest"),
        ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": require.resolve("jest-transform-stub"),
        "^.+\\.jsx?$": require.resolve("babel-jest"),
        "vee-validate/dist/rules": require.resolve("babel-jest"),
    },
    transformIgnorePatterns: ["/node_modules/(?!vee-validate/dist/rules)"],
    watchPlugins: [require.resolve("jest-watch-typeahead/filename"), require.resolve("jest-watch-typeahead/testname")],
};
