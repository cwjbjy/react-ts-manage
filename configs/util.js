const __DEV__ = process.env.NODE_ENV === "development";
const __PRO__ = process.env.NODE_ENV === 'production';

module.exports = { __DEV__,__PRO__ };
