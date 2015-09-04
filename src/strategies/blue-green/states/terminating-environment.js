var Q = require('q'),
    _ = require('lodash'),
    l = require('../../../lib/logger.js'),
    helpers = require('../../../lib/helpers');

module.exports = function (config, services, args) {

    var eb = new services.AWS.ElasticBeanstalk({
        maxRetries: 10,
        logger: process.stdout
    });

    function terminateEnvironment(applicationName, environmentName) {
        return Q.ninvoke(eb, "terminateEnvironment", {
            EnvironmentName:    environmentName,
            TerminateResources: true
        }).then(function (result) {
            return helpers.waitForEnvironment(eb, applicationName, environmentName, function (env) {
                return env.Status == 'Terminated';
            });
        });
    }

    return {
        activate: function (fsm, data) {
            terminateEnvironment(config.ApplicationName, data.targetEnvironment.name).then(function (env) {
                l.success("Environment %s terminated.", data.targetEnvironment.name);
                fsm.doAction("next", data);
            }).fail(helpers.genericRollback(fsm, data));

        }
    }
};
