/**
 * This class is used to convert a color string to an RGB color object
 * and to determine if the color is bright or dark.
 * @param color - The color string to convert to an RGB color object.
 */
export class RgbColor {
    r: string;
    g: string;
    b: string;
    a: string;
    readonly black = 'rgb(0,0,0)';
    readonly white = 'rgb(255,255,255)';

    constructor(color: string) {
        let colorVals = color.slice(color.indexOf('(') + 1, color.indexOf(')')).split(',');
        this.r = colorVals[0];
        this.g = colorVals[1];
        this.b = colorVals[2];
        this.a = colorVals[3] || '1';       
    }

    /** Determins if the color is bright
     * @returns true if the color is bright and false otherwise
     */
    isBright(): boolean {
        // Calculate the perceptive luminance (aka luma) - human eye favors green color...
        const luma = ((0.299 * Number(this.r)) + (0.587 * Number(this.g)) + (0.114 * Number(this.b))) / 255;
        // Return true if bright color and false otherwise
        return luma > 0.5;
    }

    /** Returns the color (black or white) that is readable on the color
     * @returns the color that is readable on the color as a string rgb(r,g,b)
     */
    readableFontColor(): string {
        return this.isBright() ? this.black : this.white;
    }
}
