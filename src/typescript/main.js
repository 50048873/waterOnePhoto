// import {TT, say} from "en";
define(["require", "exports"], function (require, exports) {
    "use strict";
    var User = /** @class */ (function () {
        // tt: TT;
        function User(options) {
            //
            if (options) {
                //
                this.options = options;
            }
            //
            // this.tt = new TT();
            // this.tt.skipToMapView("wangsl");
            // say("kao");
            console.log("tsts");
        }
        //
        User.prototype.showInfo = function (msg) {
            //
            console.log("hello.  " + msg);
        };
        return User;
    }());
    var btnTest = document.getElementById("btn-test");
    //
    if (btnTest) {
        //
        btnTest.onclick = function () {
            //
            var user = new User();
            //
            user.showInfo("kaop");
        };
    }
    return User;
});
//# sourceMappingURL=testindex.js.map