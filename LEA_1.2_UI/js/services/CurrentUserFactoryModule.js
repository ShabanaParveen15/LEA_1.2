(
function () {
    var CurrentUserFactoryModule = angular.module("CurrentUserFactoryModule", []);
    angular.module("CurrentUserFactoryModule").factory("CurrentUser", CurrentUser);
    function CurrentUser() {
        var profile = {
            isLoggedIn: false,
            username: "",
            token: ""
        };
        var setProfile = function (username, token) {
            profile.username = username;
            profile.token = token;
            localStorage.setItem("access_token", token);
            profile.isLoggedIn = true;
        };
        var getProfile = function () {
            return profile;
        }
        return {
            setProfile: setProfile,
            getProfile: getProfile
        }
    }
}());