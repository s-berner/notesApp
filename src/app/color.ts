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

    isBright(): boolean {
        // Calculate the perceptive luminance (aka luma) - human eye favors green color...
        const luma = ((0.299 * Number(this.r)) + (0.587 * Number(this.g)) + (0.114 * Number(this.b))) / 255;
        // Return true if bright color and false otherwise
        return luma > 0.5;
    }

    readableFontColor(): string {
        return this.isBright() ? this.black : this.white;
    }
}