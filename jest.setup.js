/* global jest */
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-worklets', () => ({
  WorkletsModule: {},
  createSerializable: value => value,
  createShareable: value => value,
  createSynchronizable: value => value,
  createWorkletRuntime: jest.fn(),
  executeOnUIRuntimeSync: jest.fn(worklet => worklet),
  isShareable: jest.fn(() => false),
  isSynchronizable: jest.fn(() => false),
  isWorkletFunction: jest.fn(() => false),
  makeShareable: value => value,
  makeShareableCloneRecursive: value => value,
  runOnJS: jest.fn(worklet => worklet),
  runOnRuntime: jest.fn(worklet => worklet),
  runOnUI: jest.fn(worklet => worklet),
  scheduleOnRN: jest.fn(worklet => worklet),
  scheduleOnUI: jest.fn(worklet => worklet),
  serializableMappingCache: new Map(),
  shareableMappingCache: new Map(),
}));

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);
