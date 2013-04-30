/// <reference path="../Interfaces/IDisposable.d.ts" />
/// <reference path="IRenderable.d.ts" />

module EndGate.Rendering {

    export interface IRenderer extends IDisposable {
        Render(renderables: IRenderable[]): CanvasRenderingContext2D;
    }

}