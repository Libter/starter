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

var launcherVersion = 100;

var mc_path = process.cwd() + path.sep + "mc";
var profileFile = process.cwd() + path.sep + "profile.json";

var gui = require('nw.gui');

var cmdUsername = "lvlup.pro";
var cmdAccessToken = "offline";
var cmdSession = "offline";
var cmdUuid = "offline";

ga_storage._setAccount(atob("VUEtNDcyODQwODEtNQ=="));
ga_storage._trackPageview("/" + os.platform() + "/" + launcherVersion + '/home/');

initFeedbackButton();
preventSelection();
openLinksInRealBrowser();
checkUpdate();

//start!
$(function () {
    loadSettings();
    loadLanguage();
    downloadVersionList();
    loadProfile(
        //online callback
        function() {
         afterLogin(cmdUsername, "online");
        },
        //offline callback
        function() {
            afterLogin(cmdUsername, "offline");
        },
        //no account callback
        function () {
            $("#signin").show();
        }
    );
    
    $("#non-standard-versions").prop("checked", settings["nonStandardVersions"]);
    
    //listeners
    $("#close").on("click", closeWindow);
    $("#loginFormContainer").on("submit", loginSubmit);
    $("#signin").on("click", loginClick);
    $("#signIn").on("click", loginSubmit);
    $("#signInOffline").on("click", offlineLoginClick);
    $("#logout").on("click", logoutClick);
    $("#start_version").on("click", startClick);
    $("#non-standard-versions").change(function() {
        nonStandardVersionsChange($(this).is(":checked"));
    });
});

function closeWindow() {
    window.close();
}

function loginClick() {
    $('#loginModal').modal('show');
    $("#gameUsername").focus();
}

function offlineLoginClick() {
    offlineLogin($("#gameUsername").val());
}

function loginSubmit(event) {
    if (event != undefined) { 
        event.preventDefault(); 
    }
    
    var username = $("#gameUsername").val();
    var password = $("#gamePassword").val();
    
    if (password == "")
        offlineLogin(username);
    else
        onlineLogin(username, password);
}

function onlineLogin(username, password) {
    if (username.length < 2) { //http://gaming.stackexchange.com/questions/179832/minimum-length-for-minecraft-usernames
        alert(t.loginTooShort.replace('<number>', 2));
        return;
    }
    $("#wrongCredentials").hide();
    $("#signIn").attr("disabled", true).removeClass("btn-success").addClass("btn-default").html(t.working);
    saveProfile(username, password,
        function (err, result) {
            afterLogin(result.selectedProfile.name, "online");
            
            $("#signIn").removeClass("btn-default").addClass("btn-success").text(t.logged);
        },
        function (err, result) {
            $("#wrongCredentials").show();
            $("#signInOffline").show();
            $("#signIn").removeAttr("disabled").removeClass("btn-default").addClass("btn-success").html(t.login);
        }
    );
}

function offlineLogin(username) {
    if (username.length < 3) {
        alert(t.loginTooShort.replace('<number>', 3));
        return;
    }
    saveOfflinetoken(username, function () {
        afterLogin(username, "offline");
    });
}

function afterLogin(username, mode) {
    $("#username").text(username);
    $("#login-mode").text(mode).attr("class", mode);
        
    $("#usernameContainer").show();
    $("#logout").show();
    $("#versionListContainer").show();
    $("#start_version").show();
    
    $("#signin").hide();
    $(".modal.in").modal("hide");
}

function startClick() {
    $("#start_version").hide();
        
    var ver = $("#versions option:selected").val();
    settings["version"] = ver;
    saveSettings();
    
    $("div .progress").show();
    
    downloadVersionFiles(ver, function () {
        downloadLibs(ver, function () {
            downloadAssets(ver, function () {
                generateCmd(ver, function () {
                    $("div .progress").hide();
                    $("#start_version").show();
                });
            });
        });
    });
}

function logoutClick() {
    logout(function () {
        $("#versionListContainer").hide();
        $("#start_version").hide();
        $("#logout").hide();
        $("#username").val("");
        $("#usernameContainer").hide();
        $("#signin").show();
        $("#signIn").attr("disabled", false).val(t.login);
    });
}

function nonStandardVersionsChange(checked) {
    $("#versionsList option").each(function(index, element) {
        element = $(element);
        if (element.data("type") != "release") {
            if (checked)
                element.show();
            else
                element.hide();
        }
    });
    settings["nonStandardVersions"] = checked;
    saveSettings();
}

function checkUpdate() {
    httpreq.get("https://launcherminecraft.pl/update.json", function (err, res) {
        if (!err && res.statusCode == 200) {
            var result = JSON.parse(res.body);
            if (result.latest_version > launcherVersion) {
                $("#updateMsg").text(result.msg);
                $("#updateTitle").text(result.title);
                $("#updateHref").attr("href", result.href);
            }
        }
    });
}
