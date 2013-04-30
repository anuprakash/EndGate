var EndGate;
(function (EndGate) {
    (function (_) {
        (function (Loopers) {
            var RepaintLooper = (function () {
                function RepaintLooper() {
                    this._type = "RepaintLooper";
                    this._running = false;
                    this._callbacksModified = false;
                    this._callbacks = [];
                }
                RepaintLooper.prototype.Start = function () {
                    this._running = true;
                    this.Run();
                };
                RepaintLooper.prototype.Run = function () {
                    var _this = this;
                    if(this._running) {
                        this._callbacksModified = false;
                        for(var i = 0; i < this._callbacks.length; i++) {
                            this._callbacks[i].Callback();
                            if(this._callbacksModified) {
                                break;
                            }
                        }
                        window.OnRepaintCompleted(function () {
                            _this.Run();
                        });
                    }
                };
                RepaintLooper.prototype.AddCallback = function (looperCallback) {
                    this._callbacksModified = true;
                    this._callbacks.push(looperCallback);
                };
                RepaintLooper.prototype.RemoveCallback = function (looperCallback) {
                    for(var i = 0; i < this._callbacks.length; i++) {
                        if(this._callbacks[i].ID === looperCallback.ID) {
                            this._callbacksModified = true;
                            this._callbacks.splice(i, 1);
                            return;
                        }
                    }
                };
                RepaintLooper.prototype.Dispose = function () {
                    this._callbacksModified = true;
                    this._callbacks = [];
                    this._running = false;
                };
                return RepaintLooper;
            })();
            Loopers.RepaintLooper = RepaintLooper;            
        })(_.Loopers || (_.Loopers = {}));
        var Loopers = _.Loopers;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=RepaintLooper.js.map
