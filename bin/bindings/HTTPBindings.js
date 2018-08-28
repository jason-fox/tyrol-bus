/*
 * Copyright 2016 Telefonica Investigación y Desarrollo, S.A.U
 *
 * This file is part of iotagent-ul
 *
 * iotagent-ul is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * iotagent-ul is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with iotagent-ul.
 * If not, seehttp://www.gnu.org/licenses/.
 *
 * For those usages not covered by the GNU Affero General Public License
 * please contact with::[iot_support@tid.es]
 */


const context = {
        op: 'Web.HTTP.Binding'
    };
const  config = require('../configService');
const _ = require('underscore');
const iotAgentLib = require('../../iotagent-node-lib/lib/fiware-iotagent-lib');



function annotateResults(items){
  const arr = [];

  _.forEach(items, item => {
    _.forEach(item, (value, key)  => {
      if(Array.isArray(value)){
        _.forEach(value, (obj)  => {
          obj.parent =  function() {return item;}
          arr.push(obj)  
        });
      }
    });
  });
  return arr;
}



/**
 * Handles a command execution request coming from the Context Broker. This handler should:
 *  - Identify the device affected by the command.
 *  - Send the command to the HTTP endpoint of the device.
 *  - Update the command status in the Context Broker while pending.
 *  - Update the command status when the result from the device is received.
 *
 * @param {Object} device           Device data stored in the IOTA.
 * @param {String} attributes       Command attributes (in NGSIv1 format).
 */
function commandHandler(webService, attributes, callback) {
    console.log('commandHandler');
    callback();
}


/**
 * Device provisioning handler. This handler just fills in the transport protocol in case there is none.
 *
 * @param {Object} webService           webService object containing all the information about the provisioned webService.
 */
function webServiceProvisioningHandler(webService, callback) {
    console.log('webServiceProvisioningHandler');
     iotAgentLib.dataPlugins.webserviceProcess.initWebEntities(webService,annotateResults, callback);
}

function start(callback) {
    callback();
}

function stop(callback) {
    callback();
}


function notificationHandler(webService, values, callback) {
    console.log('notificationHandler');
    callback();
}

exports.start = start;
exports.stop = stop;
exports.webServiceProvisioningHandler = webServiceProvisioningHandler;
exports.notificationHandler = notificationHandler;
exports.commandHandler = commandHandler;
exports.protocol = 'HTTP';
