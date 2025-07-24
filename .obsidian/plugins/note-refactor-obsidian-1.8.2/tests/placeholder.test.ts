import {describe, expect, beforeAll} from '@jest/globals';
import { NotePlaceholders } from '../src/placeholder';
let placholders = new NotePlaceholders();
let input:string = '';
let replacement:string = '';
let output: string = '';

describe("Regression - Issue 28", () => {

    beforeAll(async () => {
        input = `{{new_note_content}}`;
        replacement = 
`# Issue 28 - New Note
$$\frac{a}{b}$$

$$a^2 + b^2 = c^2$$

$\sqrt{2}$`;
    });
    
    it("Should preserve double $$ (case 1)", () => {
        output = placholders.newNoteContent.replace(input, replacement);
        expect(lineAt(output, 1)).toBe("$$\frac{a}{b}$$");
    });

    it("Should preserve double $$ (case 2)", () => {
        output = placholders.newNoteContent.replace(input, replacement);
        expect(lineAt(output, 3)).toBe("$$a^2 + b^2 = c^2$$");
    });

    it("Should preserve single $", () => {
        output = placholders.newNoteContent.replace(input, replacement);
        expect(lineAt(output, 5)).toBe("$\sqrt{2}$");
    });

});

describe("New note path", () => {

});

function lineAt(input: string, index: number): string {
    return input.split('\n')[index];
}