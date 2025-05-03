export default {
  async getConfig(ctx) {
    const pluginConfig = strapi.config.get('plugin.strapi-custom-action-perform-page');

    ctx.send({
      title: pluginConfig?.title || "Perform Action",
      downloadButtons: pluginConfig?.downloadButtons || [],
      someSetting: pluginConfig?.someSetting,
      secretKey: pluginConfig?.secretKey,
    });
  },
};
