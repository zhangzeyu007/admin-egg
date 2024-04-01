const renderVueApp = require("../web/entry-server");

module.exports = (options, app) => {
  return async function vueSSR(ctx, next) {
    ctx.state.renderVueApp = renderVueApp;
    await next();
  };
};
