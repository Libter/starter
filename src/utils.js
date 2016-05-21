/*
 This file is part of LVL UP Starter. LVL UP Starter is free software: you can
 redistribute it and/or modify it under the terms of the GNU General Public
 License as published by the Free Software Foundation, version 2.
 
 This program is distributed in the hope that it will be useful, but WITHOUT
 ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 details.
 
 You should have received a copy of the GNU General Public License along with
 this program; if not, write to the Free Software Foundation, Inc., 51
 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 
 Copyright (C) 2015 Michał Frąckiewicz
 */
 
function done(txt)
{
    console.log("Done " + txt);
}

function checkInternet(cb)
{
    require('dns').lookup('google.com', function (err) {
        if (err && err.code == "ENOTFOUND") {
            cb(false);
        } else {
            cb(true);
        }
    })
}

/**
 * Add quotes to string
 * @param str
 */
function quote(str) {
    return '"' + str + '"';
} 

function openLinksInRealBrowser() {
    $('a[target=_blank]').on('click', function () {
        require('nw.gui').Shell.openExternal(this.href);
        return false;
    });
}

function preventSelection() {
    var allowedTags = ["input", "textarea", "select"];
    
    if (typeof document.onselectstart == "undefined") {
        document.onmousedown = function() {
            return allowedTags.indexOf(e.target.tagName.toLowerCase()) != -1;
        };
        document.onmouseup = function() { 
            return true; 
        };
    } else {
        document.onselectstart = function() { 
            return false; 
        };
    }
}

function initFeedbackButton() {
    var h = document.getElementsByTagName('head')[0];
    (function () {
        var fc = document.createElement('link');
        fc.type = 'text/css';
        fc.rel = 'stylesheet';
        fc.href = 'https://product.feedbacklite.com/feedbacklite.css';
        h.appendChild(fc);
    })();
    fbl = {'campaign': {'id': 638, 'type': 2, 'size': 1, 'position': 9, 'tab': 2, 'control': 2}};
    (function () {
        var fj = document.createElement('script');
        fj.type = 'text/javascript';
        fj.async = true;
        fj.src = 'https://product.feedbacklite.com/feedbacklite.js';
        h.appendChild(fj);
    })();
}
