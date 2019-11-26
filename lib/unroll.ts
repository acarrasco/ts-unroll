type TestCaseFunction = () => any;
type FrameworkCaseFunction = (description: string, test: TestCaseFunction) => void;

const templateExpression = /#[^ ]+/g

/**
 * @param descriptionTemplate A template in the style of unroll, where `#prop` will be replaced with the value of `arg[prop]`.
 * @param arg The arguments object.
 * @throws An Error if one of the keywords is not a valid property of arg.
 */
const replaceDescription = (descriptionTemplate: string, arg: any) => {
    return descriptionTemplate.replace(templateExpression, (match: string): string => {
        const key = match.slice(1); //remove the hash
        const anyArg: any = arg;
        const value = anyArg[key];
        if (!value) {
            throw new Error(`Property ${key} not present in ${arg}`);
        }
        return value;
    })

};

export const unrollWith = (it: FrameworkCaseFunction) => {
    return function unroll<T>(descriptionTemplate: string, test: (arg: T) => any, args: T[]): void {
        for (const arg of args) {
            const description = replaceDescription(descriptionTemplate, arg);
            const curriedTestFunction = () => {
                return test(arg);
            };
            it(description, curriedTestFunction);
        }
    };
};
