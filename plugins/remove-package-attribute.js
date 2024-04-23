const { withAndroidManifest } = require('@expo/config-plugins');

module.exports = config => {
    return withAndroidManifest(config, async config => {
        config.modResults = removePackageAttribute(config.modResults);
        return config;
    });
};

function removePackageAttribute(androidManifest) {
    delete androidManifest.manifest.$.package;
    return androidManifest;
}