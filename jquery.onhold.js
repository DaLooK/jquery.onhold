//OnHold with Velocity
$.fn.extend({
    velocityControlTimeoutId: 0,
    velocitySlowTimeout: 250,
    velocityFastTimeout: 50,
    velocityTicksBeforeFast: 3,
    velocityTicksCount: 0,
    makeTimeout: function () {
        let thisObject = this;
        this.velocityControlTimeoutId = setTimeout(function () {
            thisObject.onHoldCallback();
            if (thisObject.velocityTicksCount<=thisObject.velocityTicksBeforeFast)
                thisObject.velocityTicksCount++;
            thisObject.makeTimeout();
        }, (this.velocityTicksCount>this.velocityTicksBeforeFast?this.velocityFastTimeout:this.velocitySlowTimeout));
        return this;
    },
    onHoldCallback: $.noop(),
    onHold: function (newCallback) {
        let thisObject = this;
        if (newCallback) {
            this.onHoldCallback=newCallback;
            this.on('mousedown', function () {
                thisObject.velocityTicksCount = 0;
                thisObject.makeTimeout();
            }).on('mouseup mouseleave', function() {
                clearTimeout(thisObject.velocityControlTimeoutId);
            });
        } else {
            this.off('mousedown mouseup mouseleave');
            this.onHoldCallback = $.noop();
        }
        return this;
    }
});
