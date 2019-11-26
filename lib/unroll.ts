type TestCaseFunction = () => any;
type FrameworkCaseFunction = (description: string, test: TestCaseFunction) => void;

export const unrollWith = (framework: FrameworkCaseFunction) => {
    return function unroll<T>(makeDescription: (arg: T) => string, userTest: (arg: T) => any, args: T[]): void {
        for (const arg of args) {
            const description = makeDescription(arg);
            const curriedTestFunction = () => {
                return userTest(arg);
            };
            framework(description, curriedTestFunction);
        }
    };
};
