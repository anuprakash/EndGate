/// <reference path="../Assets/Vectors/Helpers/Vector2dHelpers.ts" />
/// <reference path="../Assets/Sizes/Size2d.ts" />

module EndGate.Core.BoundingObject {

    import Assets = module(EndGate.Core.Assets);

    export class BoundingRectangle implements ITyped extends Bounds2d {
        public _type: string = "BoundingRectangle";

        public Size: Assets.Size2d;

        constructor(size: Assets.Size2d);
        constructor(width: number, height: number);
        constructor(first: any, second?: any) {
            super();

            if (typeof second !== "undefined") {
                this.Size = new Assets.Size2d(first, second);
            }
            else {
                this.Size = first;
            }
        }

        public Vertices(): Assets.Vector2d[] {
            return [this.TopLeft(), this.TopRight(), this.BotLeft(), this.BotRight()];
        }

        public TopLeft(): Assets.Vector2d {
            var v = new Assets.Vector2d(this.Position.X - this.Size.HalfWidth(), this.Position.Y - this.Size.HalfHeight());
            if (this.Rotation == 0) {
                return v;
            }

            return v.RotateAround(this.Position, this.Rotation);
        }

        public TopRight(): Assets.Vector2d {
            var v = new Assets.Vector2d(this.Position.X + this.Size.HalfWidth(), this.Position.Y - this.Size.HalfHeight());
            if (this.Rotation == 0) {
                return v;
            }

            return v.RotateAround(this.Position, this.Rotation);
        }

        public BotLeft(): Assets.Vector2d {
            var v = new Assets.Vector2d(this.Position.X - this.Size.HalfWidth(), this.Position.Y + this.Size.HalfHeight());
            if (this.Rotation == 0) {
                return v;
            }

            return v.RotateAround(this.Position, this.Rotation);
        }

        public BotRight(): Assets.Vector2d {
            var v = new Assets.Vector2d(this.Position.X + this.Size.HalfWidth(), this.Position.Y + this.Size.HalfHeight());
            if (this.Rotation == 0) {
                return v;
            }

            return v.RotateAround(this.Position, this.Rotation);
        }

        public IntersectsCircle(circle: BoundingCircle): bool {
            return circle.IntersectsRectangle(this);
        }

        public IntersectsRectangle(rectangle: BoundingRectangle): bool {
            if (this.Rotation == 0 && rectangle.Rotation == 0) {
                var myTopLeft = this.TopLeft(),
                    myBotRight = this.BotRight(),
                    theirTopLeft = rectangle.TopLeft(),
                    theirBotRight = rectangle.BotRight();

                return theirTopLeft.X <= myBotRight.X && theirBotRight.X >= myTopLeft.X && theirTopLeft.Y <= myBotRight.Y && theirBotRight.Y >= myTopLeft.Y;

            }
            else if (rectangle.Position.Distance(this.Position).Magnitude() <= rectangle.Size.Radius() + this.Size.Radius()) {// Check if we're somewhat close to the rectangle ect that we might be colliding with
                var axisList: Assets.Vector2d[] = [this.TopRight().Subtract(this.TopLeft()), this.TopRight().Subtract(this.BotRight()), rectangle.TopLeft().Subtract(this.BotLeft()), rectangle.TopLeft().Subtract(this.TopRight())];
                var myVertices = this.Vertices();
                var theirVertices = rectangle.Vertices();

                for (var i: number = 0; i < axisList.length; i++) {
                    var axi = axisList[i];
                    var myProjections = Assets.Vector2dHelpers.GetMinMaxProjections(axi, myVertices);
                    var theirProjections = Assets.Vector2dHelpers.GetMinMaxProjections(axi, theirVertices);

                    // No collision
                    if (theirProjections.Max < myProjections.Min || myProjections.Max < theirProjections.Min) {
                        return false;
                    }
                }

                return true;
            }

            return false;
        }

        public ContainsPoint(point: Assets.Vector2d): bool {
            var savedRotation: number = this.Rotation;

            if (this.Rotation != 0) {
                this.Rotation = 0;
                point = point.RotateAround(this.Position, -savedRotation);
            }

            var myTopLeft = this.TopLeft(),
                myBotRight = this.BotRight();

            this.Rotation = savedRotation;

            return point.X <= myBotRight.X && point.X >= myTopLeft.X && point.Y <= myBotRight.Y && point.Y >= myTopLeft.Y;
        }

    }

}