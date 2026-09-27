/**
 * react / react-dom must be the exact same version. A mismatch still compiles
 * (`expo export` exits 0) but React throws error #527 at startup and the web
 * build renders a blank page. Expo SDK pins both — keep them pinned, not ranged,
 * so a fresh install can't resolve react-dom ahead of react.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const pkg = require('../package.json');

describe('react / react-dom versions', () => {
  it('are pinned to the same exact version in package.json', () => {
    const react = pkg.dependencies.react;
    const reactDom = pkg.dependencies['react-dom'];
    assert.match(react, /^\d+\.\d+\.\d+$/, `react should be an exact version, got "${react}"`);
    assert.match(reactDom, /^\d+\.\d+\.\d+$/, `react-dom should be an exact version, got "${reactDom}"`);
    assert.equal(reactDom, react, 'react-dom must match react exactly');
  });

  it('resolve to the same installed version', () => {
    const react = require('react/package.json').version;
    const reactDom = require('react-dom/package.json').version;
    assert.equal(reactDom, react, `installed react-dom ${reactDom} != react ${react}`);
  });
});
