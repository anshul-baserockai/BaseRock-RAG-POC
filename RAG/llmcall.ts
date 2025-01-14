import { ChatAnthropic } from "@langchain/anthropic";

async function sendPromptToClaude() {
    // Initialize the ChatAnthropic instance
    const claude = new ChatAnthropic({
        model: "claude-3-5-sonnet-latest",
        maxRetries: 2,
        apiKey: "",
        
    });

    // Define the prompt
    const prompt = `Write basic unit tests for the following react code:

source_code: import React from "react";

import { mergedConnectContextFactory, useMergedConnectedContextFactory } from './connectContext';
import { getProviderContext } from './createContextProvider';

import { CustomProvider, ConnectContextFactory, KeyValue, ConnectContextOptions, ProviderCollection, ContextCollection, OnInit } from "./typings";

type MergedStoreProps = {
    children: React.ReactNode;
    onInit?: OnInit;
}

const DefaultChild = ({ children }: any) => children;

function getContextsFromProviderCollection(providers: ProviderCollection): ContextCollection {
    return Object.keys(providers).reduce((contexts, key) => {
        contexts[key] = getProviderContext(providers[key]);

        return contexts;
    }, {});
}

function createMergedStore(providers: ProviderCollection): [CustomProvider, ConnectContextFactory, Function] {
    const contexts = getContextsFromProviderCollection(providers);
    const withStore = mergedConnectContextFactory(contexts);
    const useStore = useMergedConnectedContextFactory(contexts);

    const MergedStore = ({ children, onInit }: MergedStoreProps) => {

        // onInit is supposed to be run only the first time, so we store a reference to its initial value and never update again
        const [onInitFn] = React.useState(onInit);

        // TODO: this needs to be connected or can just read the merged values from the context similar to createContextProvider onInit
        const Child = React.useMemo(() => onInitFn ?  getConnectedChild(withStore, onInitFn) : DefaultChild, []);

        let wrapper: any = <Child children={children} />;

        Object.values(providers).forEach((Provider) => {
            const previousWrapper = wrapper;

            wrapper = <Provider>{ previousWrapper }</Provider>
        });

        return wrapper;
    };

    return [
        MergedStore,
        withStore,
        useStore,
    ];
}

function getConnectedChild(withStore: ConnectContextFactory, onInit: [ConnectContextOptions, Function]) {
    const [options, onInitFn] = onInit;

    return withStore(({ children, ...selectionResult }: KeyValue) => {
        React.useMemo(() => {
            onInitFn(selectionResult);
        }, []);

        return children
    }, options);
}

export default createMergedStore;

Important Guidelines:

1. Module Type and Imports:
   - Use 'import' statements exclusively to ensure compatibility with TypeScript and avoid using 'require'.
   - **Important**: Do not use 'require' statements directly in TypeScript. Instead, convert any 'require' statements to TypeScript's 'import' syntax for ES modules or CommonJS imports based on the project's module type. This helps prevent module-related errors.
   - First analyze all the imports in the source code. Correctly resolve all the imports path relative to the given root directory. C:\Users\Anshul Ranjan\Downloads\react-connect-context-hooks-1
   - Do not import any external libraries unless explicitly instructed in the source code.
   - Place all required imports at the start of the file (standard library first, then third-party, then local) and maintain consistent import references across main code and test files without duplication.
   - Given a list of relative imports required for the test file import { mergedConnectContextFactory, useMergedConnectedContextFactory } from './connectContext';
import { getProviderContext } from './createContextProvider';
import { CustomProvider, ConnectContextFactory, KeyValue, ConnectContextOptions, ProviderCollection, ContextCollection, OnInit } from "./typings"; "
                                    "Update the test file or function accordingly to include these imports.
2. Type Annotations for Type Safety:
   - Define clear, specific types for all variables, parameters, and return values, especially for variables that previously had implicit 'any' types.
   - Avoid 'any' type usage unless absolutely necessary. Instead, use interfaces or inferred types.
   - Use precise types when defining test data or mocked functions to prevent type safety issues.
   - Explicitly define the expected types of inputs, outputs, and any dependencies in the test cases.
   - Leverage TypeScript's type annotations to enforce strict type-checking. Specify clear types for variables, function parameters, and return values in all test cases.
   - Include detailed type annotations for all input values, expected output, and any function or method under test to minimize type-related errors.
   - When defining test data, ensure it strictly adheres to the expected types or interfaces as declared in the source code.
   - Address any 'any' type issues by defining specific types where necessary. Use interfaces or custom types to ensure type safety.
   - Define types for all function parameters and return values, and use appropriate types for variables within the test code.
   - Avoid excessive use of 'any', as it can bypass TypeScript's strict type-checking.
3. Code Style  and TypeScript Conventions:
   - Ensure the test code is clean, concise, and follows best practices for the specified module type.
   - Take advantage of TypeScript's enhanced autocompletion for typing, mocking setups, and imports to maintain consistency and accuracy.
   - Ensure no 'any' type is used unless strictly necessary, and replace all 'any' instances with precise types.
   - Follow TypeScript conventions throughout,
   - Based on the testing frameworks and assertion libraries used (e.g., Mocha+Supertest for integration, Mocha+Chai for both integration/unit, Jest for both), determine whether the codebase focuses on integration, unit, or end-to-end testing.
3. Analyze dependencies for test strategy:
   - Dependencies:     "@semantic-release/changelog": "^5.0.0",
    "@semantic-release/git": "^9.0.0",
    "@testing-library/react": "^9.4.0",
    "@types/jest": "^23.1.5",
    "@types/memoizee": "^0.4.3",
    "@types/react": "^17.0.44",
    "@types/react-dom": "^17.0.15",
    "acorn": "^7.1.1",
    "babel-core": "^6.26.3",
    "babel-runtime": "^6.26.0",
    "cross-env": "^5.1.4",
    "gh-pages": "^1.2.0",
    "minimist": "^1.2.5",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts-ts": "^2.16.0",
    "rollup": "^0.62.0",
    "rollup-plugin-babel": "^3.0.7",
    "rollup-plugin-commonjs": "^9.1.3",
    "rollup-plugin-node-resolve": "^3.3.0",
    "rollup-plugin-peer-deps-external": "^2.2.0",
    "rollup-plugin-typescript2": "^0.17.0",
    "scheduler": "^0.21.0",
    "semantic-release": "^17.0.4",
    "semantic-release-conventional-commits": "^2.0.1",
    "typescript": "^2.8.3"
   - Identify:
      - Core tech stack
      - Testing tools
      - Critical testing considerations
      - Optimal test approach
   - Outline:
      1. Primary frameworks
      2. Testing libraries
      3. Unique dependency challenges
      4. Test suite design recommendations
4. Source Code Handling:
   - The source code is located at C:\Users\Anshul Ranjan\Downloads\react-connect-context-hooks-1\src\createMergedStore.tsx.
   - Import the application using this specified path.
   - Write tests to verify its functionality.
   - Do not modify or improve the source code itself.
5. Test Case Selection:
   - Do not write test cases for untestable code.
   - Focus on testable portions of the code.
6. Test Coverage:
   - Cover core functionality, edge cases, and error handling.
   - Aim for maximum code coverage.
   - Generate minimal, non-redundant test cases covering:
     - Happy paths
     - Edge cases
     - Common errors
   - Prioritize core functionality, boundary conditions, and likely defects.
   - Explain the rationale for each test case.

7. Testing Behavior, Not Implementation:
    - Focus on testing the behavior of components, hooks, or providers rather than the implementation details. Tests should ensure the component behaves as expected under various conditions (e.g., user interactions, API calls, state changes) rather than how it achieves that behavior.
8. Mocking and Stubbing:
   - Use the extra context provided instead of directly mocking the imported modules provided in the source code.
   -Here is the code got for the imported modules in the source code:
import { mergedConnectContextFactory, useMergedConnectedContextFactory } from './connectContext';
Connectcontext code: import React from 'react';
import { useContextSelector } from 'use-context-selector';

import parseSelectors, { executeParsedSelectors as selectValues } from './parseSelectors';

import {
    ConnectContextOptions,
    ConnectContextFactory,
    KeyValue,
    ComputedSelectors,
    ContextCollection,
} from './typings';

  
function connectContext<T = any>(Context: React.Context<T>, Component: React.ComponentType, options: ConnectContextOptions = {}): React.FunctionComponent {
    return React.memo((props?: KeyValue) => {
        const [selectedState, selectedActions] = getContextSelection(Context, options, props);
        const mergedProps = getMergedProps(selectedState, selectedActions, props, options.computedSelectors);

        return <Component {...mergedProps} />
    });
};

function connectContextFactory<T = any>(Context: React.Context<T>): ConnectContextFactory {
    return (Component: React.ComponentType, options: ConnectContextOptions = {}) => {
        const parsedOptions = normalizedContextOptions(options);
        parsedOptions.stateSelectors = parseSelectors(parsedOptions.stateSelectors);
        parsedOptions.actionSelectors = parseSelectors(parsedOptions.actionSelectors);

        return connectContext(Context, Component, parsedOptions);
    };
};

function useConnectedContextFactory<T = any>(Context: React.Context<T>) {
    return (options: ConnectContextOptions = {}): KeyValue => {
        const parsedOptions = React.useMemo(() => {
            const parsedOptions = normalizedContextOptions(options);
            parsedOptions.stateSelectors = parseSelectors(parsedOptions.stateSelectors);
            parsedOptions.actionSelectors = parseSelectors(parsedOptions.actionSelectors);

            return parsedOptions;
        }, [options]);

        const [selectedState, selectedActions] = getContextSelection(Context, parsedOptions);
        const mergedProps = getMergedProps(selectedState, selectedActions, {}, parsedOptions.computedSelectors);

        return mergedProps;
    }
}

function getContextSelection<T = any>(Context: React.Context<T>, options: ConnectContextOptions = {}, props: KeyValue = {}): [KeyValue, KeyValue] {
    const { stateSelectors, actionSelectors } = React.useMemo(() => normalizedContextOptions(options), [options]);

    const selectedState = useContextSelector(Context, (store: any) => selectValues(stateSelectors, store.state, props));
    const selectedActions = useContextSelector(Context, (store: any) => selectValues(actionSelectors, store.actions, props));

    return [selectedState, selectedActions];
    /*
    return useContextSelector(Context, (store: any) => {
        const selectedState = selectValues(stateSelectors, store.state, props);
        const selectedActions = selectValues(actionSelectors, store.actions, props);
console.log([selectedState, selectedActions])
        return [selectedState, selectedActions];
    });
    */
}

function mergedConnectContextFactory(contexts: ContextCollection): ConnectContextFactory {
    return (Component: React.ComponentType, options: ConnectContextOptions = {}) => {
        const parsedOptions = normalizedContextOptions(options);
        parsedOptions.stateSelectors = parseSelectors(parsedOptions.stateSelectors);
        parsedOptions.actionSelectors = parseSelectors(parsedOptions.actionSelectors);

        return React.memo((props?: KeyValue) => {
            const mergedProps = getMergedPropsFromContexts(contexts, parsedOptions, props);

            // DEPRECATED
            if (parsedOptions.afterMerge) {
                const afterMergeProps = Object.assign({}, mergedProps, parsedOptions.afterMerge(mergedProps) || {});

                return <Component {...afterMergeProps} />;
            }

            return (
                <Component {...mergedProps} />
            );
        });
    };
};

function useMergedConnectedContextFactory(contexts: ContextCollection) {
    return (options: ConnectContextOptions = {}): KeyValue => {
        const parsedOptions = React.useMemo(() => {
            const parsedOptions = normalizedContextOptions(options);
            parsedOptions.stateSelectors = parseSelectors(parsedOptions.stateSelectors);
            parsedOptions.actionSelectors = parseSelectors(parsedOptions.actionSelectors);

            return parsedOptions;
        }, [options]);

        return getMergedPropsFromContexts(contexts, parsedOptions);
    };
}

function getMergedPropsFromContexts(contexts: ContextCollection, options: ConnectContextOptions, props: KeyValue = {}) {
    const mergedContext = Object.keys(contexts).reduce((mergedContext: any, key: string) => {
        /*
        const [selectedState, selectedActions] = useContextSelector(contexts[key], (store: any) => {
            const selectedState = selectValues(options.stateSelectors, { [key]: store.state }, props);
            const selectedActions = selectValues(options.actionSelectors, { [key]: store.actions }, props);
    
            return [selectedState, selectedActions];
        });
        */

        const selectedState = useContextSelector(contexts[key], (store: any) => {
            return selectValues(options.stateSelectors, { [key]: store.state }, props)
        });
        const selectedActions = useContextSelector(contexts[key], (store: any) => selectValues(options.actionSelectors, { [key]: store.actions }, props));

        Object.assign(mergedContext.selectedState, selectedState);
        Object.assign(mergedContext.selectedActions, selectedActions);

        return mergedContext;
    }, { selectedState: {}, selectedActions: {} });

    // TODO: rename getMergedProps to something related with computedSelectors, and create a new getMergedProps that all these 3 steps
    const mergedProps = getMergedProps(mergedContext.selectedState, mergedContext.selectedActions, props, options.computedSelectors);

    return mergedProps
}

function getMergedProps(selectedState: KeyValue, selectedActions: KeyValue, props?: KeyValue, computedSelectors: ComputedSelectors = {}) {
    const mergedProps = {...selectedState, ...selectedActions, ...props};

    Object.entries(computedSelectors).forEach(([key, value]) => {
        const [fn, deps] = value;
        const depValues = deps.map(dep => mergedProps[dep]);
        const memoValues = memoizableValues(depValues);

        mergedProps[key] = React.useMemo(() => fn(...depValues), memoValues);
    });

    return mergedProps;
}

function normalizedContextOptions(options: ConnectContextOptions): ConnectContextOptions {
    const normalized: KeyValue = { ...options };

    // DEPRECATED
    if (options.stateMappers) {
        normalized.stateSelectors = options.stateMappers;
    }
    if (options.actionMappers) {
        normalized.actionSelectors = options.actionMappers;
    }

    return normalized;
}

function memoizableValues(value: any[] | Object): any[] {
    if (value instanceof Array) {
        return value.filter(value => typeof(value) !== 'function');
    }
    return Object.values(value).filter(value => typeof(value) !== 'function');
}

export default connectContext;
export {
    connectContextFactory,
    useConnectedContextFactory,
    mergedConnectContextFactory,
    useMergedConnectedContextFactory,
    getMergedProps,
    getMergedPropsFromContexts,
    normalizedContextOptions,
};

import { getProviderContext } from './createContextProvider';
createContextProvider code: import React from 'react';
import { createContext, Context } from 'use-context-selector';

import {
    KeyValue,
    ActionCreators,
    CreateContextProviderReturn,
    CustomProvider,
} from './typings';
import parseSelectors, { executeParsedSelectors as selectValues } from './parseSelectors';
import { getMergedProps, normalizedContextOptions } from './connectContext';

const providerContextMap = new Map<CustomProvider, Context<any>>();

function createContextProvider(reducer: React.Reducer<any, any>, initialState: KeyValue, actionCreators: ActionCreators): CreateContextProviderReturn;

function createContextProvider(initialState: KeyValue, actionCreators: ActionCreators): CreateContextProviderReturn

function createContextProvider(...args: any[]): CreateContextProviderReturn {
    const Context = createContext<any>({});
    const Provider = ({ onInit, ...props }: KeyValue) => {
        // TODO: add better typing
        const contextValue = React.useRef<any>({});
        let reducer: any, initialState: any, actionCreators: any;
        let state: any, actions: any, dispatch: any, setState: any;

        if (typeof args[0] === 'function') {
            [reducer, initialState, actionCreators] = args;
            [state, dispatch] = React.useReducer(reducer, initialState);
            
        } else {
            [initialState, actionCreators] = args;
            [state, setState] = React.useState(initialState);
            dispatch = React.useMemo(() => createStateSetterDispatch(setState, contextValue), [initialState]);
        }

        actions = React.useMemo(() => getBindedActions(actionCreators, dispatch, contextValue), [actionCreators]);

        contextValue.current.state = Object.freeze(state);
        contextValue.current.actions = Object.freeze(actions);

        if (onInit) {
            const [options, onInitFn] = onInit;

            React.useMemo(() => {
                const parsedOptions = normalizedContextOptions(options);
                parsedOptions.stateSelectors = parseSelectors(parsedOptions.stateSelectors);
                parsedOptions.actionSelectors = parseSelectors(parsedOptions.actionSelectors);
    
                const selectedState = selectValues(parsedOptions.stateSelectors, state, props);
                const selectedActions = selectValues(parsedOptions.actionSelectors, actions, props);
                const mergedProps = getMergedProps(selectedState, selectedActions, props, parsedOptions.computedSelectors);

                onInitFn(mergedProps);
            }, []);
        }

        return (
            <Context.Provider value={{...contextValue.current}} children={props.children} {...props}></Context.Provider>
        );
    };
    providerContextMap.set(Provider, Context);

    return [Provider, Context];
    
}

function getBindedActions(actions: ActionCreators, dispatch: React.Dispatch<any>, contextValue: any): {[key: string]: Function} {
    const bindedActions = {};
    const getState = () => contextValue.current.state;

    Object.entries(actions).forEach(([key, value]) => {
        bindedActions[key] = value(dispatch, getState);
    });

    return bindedActions;
}

function createStateSetterDispatch(dispatch: React.Dispatch<any>, contextValue: any): React.Dispatch<any> {
    return (params: any) => {
        const newState = { ...contextValue.current.state, ...params };

        dispatch(newState);
    }
}

function getProviderContext(Provider: CustomProvider): Context<any> {
    const Context = providerContextMap.get(Provider);

    if (!Context) {
        throw Context not found for Provider;
    }
    return Context;
}

export default createContextProvider;
export {
    getProviderContext,
};

import { CustomProvider, ConnectContextFactory, KeyValue, ConnectContextOptions, ProviderCollection, ContextCollection, OnInit } from "./typings";
typings code: import { Context } from 'use-context-selector';

export type KeyValue = {
    [key: string]: any;
}

export type KeyValueMap = {
    [key: string]: string | ((state: KeyValue, props?: KeyValue) => any);
}

export type Action = (dispatch: React.Dispatch<any>, state?: KeyValue) => Function;

export type ActionCreators = {
    [key: string]: Action;
};

export type CustomComponent = React.ComponentType<any> | React.FC<any>;
export type CustomProvider = CustomComponent;

export type CreateContextProviderReturn = [
    CustomProvider,
    Context<any>
]

export type SelectorFunction = (state: KeyValue, props?: KeyValue) => KeyValue;

export type Selector = string[] | KeyValueMap | SelectorFunction;

export type AfterMergeCallback = (mergedProps: KeyValue) => KeyValue;

export type ComputedSelector = [
    (...args: any) => any,
    string[],
];

export type ComputedSelectors = {
    [key: string]: ComputedSelector;
}

export type ConnectContextOptions = {
    stateSelectors?: Selector;
    actionSelectors?: Selector;
    computedSelectors?: ComputedSelectors;

    stateMappers?: Selector;
    actionMappers?: Selector;
    afterMerge?: AfterMergeCallback;
}

export type ConnectContextFactory = (Component: CustomComponent, options: ConnectContextOptions) => React.FunctionComponent;

export type ProviderCollection = CustomProvider[] | {[key: string]: CustomProvider}
export type ContextCollection = {[key: string]: Context<any>}

export type OnInit = [ConnectContextOptions, (params: any) => void]

Now use these extra information to write the test cases for the source code. It will help after mocking which functions and variables to use. Make sure to cover all the edge cases and provide a detailed explanation for each test case.

   - If there is a dependency other than imported modules, mock it properly to isolate the component's behavior.
9. Simulate User Interactions:
    - Use @testing-library/react's fireEvent or user-event for simulating user interactions like clicks, input changes, form submissions, etc. Testing should reflect what users actually do (e.g., inputting text in a form, clicking buttons).
    - Use user-event over fireEvent for simulating more complex user interactions like typing, which more closely matches how browsers interact with the DOM.
10. Component Structure and Rendered Output:
    - Ensure components render correctly based on different states (loading, error, success).
    - Use getByTestId, getByText, getByRole, or getByLabelText to query elements in a way that mimics user behavior or accessibility considerations.
    - Make sure to test for conditional rendering and UI updates when props or state change.
11. Asynchronous Operations:
    - For components involving API calls, timers, or asynchronous state updates, wrap tests in act() to ensure that all updates to the DOM are completed before assertions.
    - Use waitFor() to wait for asynchronous state changes and to avoid flaky tests.
    - Always mock and test both success and error paths for async operations.
12. Context and Providers:
    - Mock Providers if Necessary: If the provider's logic is complex and irrelevant to the test, mock the provider or its values to isolate the component's behavior. Example: import { render } from '@testing-library/react'; import { I18nextProvider } from 'react-i18next'; import { ThemeProvider } from 'styled-components'; import { MyComponent } from '../MyComponent'; import i18n from '../i18n';  // Assuming you have an i18n instance test('renders component correctly', () => { render( <I18nextProvider i18n={i18n}> <ThemeProvider theme={{ color: 'blue' }}> <MyComponent /> </ThemeProvider> </I18nextProvider> ); // your assertions here });
    - If the component uses a context hook, make sure to mock the useContext hook properly or provide a mocked provider that mimics expected values.
    - Mock Context Values for Isolation: When testing components that rely on contexts like authentication or localization, you might want to mock context values to focus solely on the behavior of the component itself. For example, you can mock useContext or provide mock values for i18n or any other context that your component depends on. jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key) => key }) // Mock translation function })); test('renders translation correctly', () => { render(<MyComponent />); expect(screen.getByText('welcome_message')).toBeInTheDocument(); });
    - Testing Asynchronous Context Behavior: If the context provider fetches data asynchronously (e.g., from an API), make sure to mock the asynchronous behavior for tests. Use async utilities like waitFor, findByText, or findByRole to wait for elements to appear or disappear based on context changes.
    - Test Responsive Behavior with Providers: If your context providers change based on user interactions (e.g., theme switcher or language change), simulate these interactions in your tests to ensure the component updates as expected.
    - Use Mock Services and API Calls: If the context interacts with APIs (e.g., i18n fetches resources), you should mock the API calls and ensure the component behaves correctly without making real network requests during tests. Libraries like jest-fetch-mock can help mock fetch calls.
13. Component Reusability and Isolation:
    - Write tests that ensure components work in isolation. Avoid coupling tests that rely on a large number of other components or complex setups.
    - For reusable components, focus on testing generic logic and avoid assumptions about specific use cases unless they are part of the component’s contract.
14. Edge Cases and Error Boundaries:
    - Test edge cases, such as empty data, incorrect inputs, boundary values, and exceptions.
    - If your component is error-prone, consider testing error boundaries (if using them) to ensure that the app behaves gracefully when something goes wrong.
15. State Management
    - For hooks like useState, useReducer, or useContext, test how state changes based on interactions and whether the correct actions are dispatched.
    - Mock or spy on context values and action dispatches to ensure the state is updated correctly after user interactions.
16. Cleaning Up After Tests
    - Use afterEach or beforeEach hooks to reset the test environment between tests (e.g., clearing localStorage, resetting mocks) to avoid test interference and ensure tests are isolated.   
17. Performance and Coverage
    - Make sure the tests cover various paths through your components (e.g., different props, states, and user interactions).
    - Keep performance in mind, and make sure tests run quickly by not over-complicating mock setups or rendering too many components unnecessarily.  
18. Detailed Test Implementation Guidelines. Note that examples here are just for understanding do follow based on the source code provided:
    - Ensure that all asynchronous operations, such as API calls, are properly mocked and resolved using jest.fn() or axios.mockResolvedValueOnce() for success and axios.mockRejectedValueOnce() for failure scenarios.
    - Use act() to wrap asynchronous updates in order to ensure that state changes are processed before making assertions.
    - Leverage waitFor() to properly handle and wait for asynchronous side effects (e.g., state updates, dispatches) before checking expectations in your tests.
    - Mock and implement context methods (like register, login, logout, etc.) correctly by dispatching the expected actions based on the outcome of asynchronous calls (success or error).
19. Existing Test Review Instructions: Applicable only when test code already exists.
   - Maintain the same test objective and assertions
   - Focus only on fixing the implementation issues
   - Preserve the test method signatures
   - Keep all working parts of the test unchanged
   - Apply minimal necessary changes to make the test pass
20. QA Developer Role:
   - Your primary responsibility is to write the unit test for the provided source code.
   - Focus solely on creating comprehensive test cases to ensure code coverage and functionality.
   - Do not attempt to improve or modify the source code itself.
   - Do not show any suggestion related to settings, summary text or comments with the test code.
By following these guidelines, create a comprehensive set of unit tests that thoroughly validate the functionality of the provided source code.`;

    try {
        const response = await claude.invoke([
            {
                role: "user",
                content: prompt,
            },
        ]);

        // Log the response
        console.log("Claude's response:");
        console.log(response);
    } catch (error) {
        console.error("Error communicating with Claude:", error);
    }
}

// Execute the function
sendPromptToClaude();
