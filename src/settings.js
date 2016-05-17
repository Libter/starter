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

var settings = [];
var settingsFile = process.cwd() + path.sep + "settings.json";

function loadSettings() {
    try {
        settings = JSON.parse(fs.readFileSync(settingsFile, "utf8"));
    } catch(e) {
        console.log(e);
        settings = [];
    }
}

function saveSettings() {
    fs.writeFileSync(settingsFile, JSON.stringify(settings));
}

function loadLanguage() {
    if (settings.language == undefined) {
        if (navigator.language == 'pl')
            window.t = locale.pl;
        else
            window.t = locale.en;
    } else {
        window.t = locale[settings.language];
    }

    $.each($("t"), function(index, elem) {
       elem = $(elem);
       var key = elem.html();
       elem.replaceWith(t[key]);
    });
    
    $("#locale-pl").click(function() {
        settings.language = 'pl';
        saveSettings();
        location.reload();
    });
    $("#locale-en").click(function() {
        settings.language = 'en';
        saveSettings();
        location.reload();
    });
}