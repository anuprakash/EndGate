(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), spriteBuilder, rotationSlider, xPositionSlider, yPositionSlider, opacitySlider, widthSlider, heightSlider, syncSliders, ensureValue = function (val, min, max) {
        return Math.min(Math.max(val, min), max);
    }, slidersAnimationMappings = {
        Position: function () {
            xPositionSlider.UpdateSlider(ensureValue(spriteBuilder.Sprite.Position.X, 0, canvas.width / 2));
            yPositionSlider.UpdateSlider(ensureValue(spriteBuilder.Sprite.Position.Y, 0, canvas.height / 2));
        },
        Rotation: function () {
            rotationSlider.UpdateSlider(ensureValue(spriteBuilder.Sprite.Rotation * 100, -628, 628));
        },
        Size: function () {
            var newWidth, newHeight;
            newWidth = spriteBuilder.Sprite.Size.Width;
            newHeight = spriteBuilder.Sprite.Size.Height;
            widthSlider.UpdateSlider(ensureValue(newWidth, 0, canvas.width));
            heightSlider.UpdateSlider(ensureValue(newHeight, 0, canvas.height));
        },
        Opacity: function () {
            opacitySlider.UpdateSlider(ensureValue(spriteBuilder.Sprite.Opacity() * 100, 0, 100));
        }
    };
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);
    syncSliders = function (animation) {
        slidersAnimationMappings[animation]();
    };
    spriteBuilder = new SpriteBuilder(canvas, $(".spriteAnimator"), new eg.Vector2d(canvas.width / 2, canvas.height / 2), new eg.Size2d(100, 100), 0, 1, syncSliders);
    rotationSlider = new CustomSlider($("#rotationSlider"), -628, 628, 0, function (newrotation) {
        spriteBuilder.Sprite.Rotation = newrotation / 100;
    });
    xPositionSlider = new CustomSlider($("#positionXSlider"), 0, canvas.width, spriteBuilder.Sprite.Position.X, function (newX) {
        spriteBuilder.Sprite.Position.X = newX;
    });
    yPositionSlider = new CustomSlider($("#positionYSlider"), 0, canvas.height, spriteBuilder.Sprite.Position.Y, function (newY) {
        spriteBuilder.Sprite.Position.Y = newY;
    });
    opacitySlider = new CustomSlider($("#opacitySlider"), 0, 100, 100, function (newAlpha) {
        spriteBuilder.Sprite.Opacity(newAlpha / 100);
    });
    widthSlider = new CustomSlider($("#widthSlider"), 0, canvas.width, spriteBuilder.Sprite.Size.Width, function (newWidth) {
        spriteBuilder.Sprite.Size.Width = newWidth;
    });
    heightSlider = new CustomSlider($("#heightSlider"), 0, canvas.height, spriteBuilder.Sprite.Size.Height, function (newHeight) {
        spriteBuilder.Sprite.Size.Height = newHeight;
    });
})($, window);
//@ sourceMappingURL=mainSprites.js.map
