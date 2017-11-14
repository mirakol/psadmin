"use strict";

var keyMirror = require('react/lib/keyMirror'); //copies the key to the value so we do not have ty type it every time

module.exports = keyMirror({
    INITIALIZE: null,    
    CREATE_AUTHOR: null,
    UPDATE_AUTHOR: null,
    DELETE_AUTHOR: null
});