# The official Security Plugin for Ethlint (formerly Solium)

[![Build Status](https://travis-ci.org/duaraghav8/solium-plugin-security.svg?branch=master)](https://travis-ci.org/duaraghav8/solium-plugin-security)

This Plugin provides security-focused lint rules for [Ethlint](https://github.com/duaraghav8/Ethlint) (formerly Solium).

The rules have been taken from Consensys' [Recommended Smart Contract Practices](https://consensys.github.io/smart-contract-best-practices/recommendations/) and Solium's [Rule Wishlist](https://github.com/duaraghav8/Solium/issues/44).

## Installation
**NOTE:** If you're using Solium `v1.0.1` or above, this plugin comes pre-installed as a local dependency and you can skip this section.

`npm install -g solium-plugin-security`

## Usage
**NOTE:** If you've installed Solium `v1.0.1` or above and created `soliumrc.json` using `solium --init`, you can skip this step since solium automatically applies the security plugin for you.

Add `security` to your `soliumrc.json`'s `plugins` array. Your configuration file should look like:

```json
{
    "extends": "solium:all",
    "plugins": ["security"],
    "rules": {
        ...
    }
}
```

## List of rules
Below are the rules supplied by this plugin and the information on passing options to them and their auto-fixing capabilities.

Some of them aren't always desirable and are therefore disabled by default (marked below as `OFF`). You should explicitly enable them in your `.soliumrc.json`.

| Name                                 | Description                                                                                      | Options                           | Defaults                             | Fixes | Default Setting |
|--------------------------------------|--------------------------------------------------------------------------------------------------|-----------------------------------|--------------------------------------|-------|-----------------|
| no-throw                             | Discourage use of `throw` statement for error flagging                                           |                                   |                                      | YES   | `ENABLED`       |
| no-tx-origin                         | Discourage use of `tx.origin` global variable                                                    |                                   |                                      |       | `ENABLED`       |
| enforce-explicit-visibility          | Encourage user to explicitly specify visibility of function                                      |                                   |                                      | YES   | `ENABLED`       |
| no-block-members                     | Discourage use of members `blockhash` & `timestamp` (and alias `now`) of `block` global variable | List of members to warn against   | ["blockhash", "timestamp"]           |       | `ENABLED`       |
| no-call-value                        | Discourage use of `.call.value()()`                                                              |                                   |                                      |       | `ENABLED`       |
| no-assign-params                     | Disallow assigning to function parameters                                                        |                                   |                                      |       | `ENABLED`       |
| no-fixed                             | Disallow fixed point types                                                                       |                                   |                                      |       | `ENABLED`       |
| no-inline-assembly                   | Discourage use of inline assembly                                                                |                                   |                                      |       | `ENABLED`       |
| no-low-level-calls                   | Discourage the use of low-level functions - call(), callcode() & delegatecall()                  | List of functions to warn against | ["call", "callcode", "delegatecall"] |       | `ENABLED`       |
| no-modify-for-iter-var               | Discourage user to modify a for loop iteration counting variable in the loop body                |                                   |                                      |       | `ENABLED`       |
| no-send                              | Discourage the use of unsafe method `send()`                                                     |                                   |                                      |       | `ENABLED`       |
| no-sha3                              | Encourage use of `keccak256()` over `sha3()` function                                            |                                   |                                      | YES   | `ENABLED`       |
| no-unreachable-code                  | Disallow unreachable code                                                                        |                                   |                                      |       | `ENABLED`       |
| check-send-result                    | Enforce checking the result of `send()` call                                                     |                                   |                                      |       | `ENABLED`       |
| else-after-elseif                    | Encourage user to use else statement after else-if statement                                     |                                   |                                      |       | `DISABLED`      |
| enforce-loop-bounds                  | Encourage use of loops with fixed bounds                                                         |                                   |                                      |       | `DISABLED`      |
| enforce-placeholder-last             | Enforce that the function placeholder is the last statement in the modifier                      |                                   |                                      |       | `DISABLED`      |
| return-at-end                        | Discourage use of early returns in functions                                                     |                                   |                                      |       | `DISABLED`      |
| one-break-per-loop                   | Discourage use of multiple breaks in while/for/do loops                                          |                                   |                                      |       | `DISABLED`      |
| max-statements-in-func               | Enforce upper limit on number of statements inside a function                                    | Maximum number of statements      | 25                                   |       | `DISABLED`      |
| no-abstract-func                     | Discourage use of abstract functions                                                             |                                   |                                      |       | `DISABLED`      |
| no-bit-operations                    | Disallow bitwise operations                                                                      |                                   |                                      |       | `DISABLED`      |
| no-continue                          | Discourage use of `continue` statement                                                           |                                   |                                      |       | `DISABLED`      |
| no-inheritance                       | Discourage use of inheritance                                                                    | Disallow interface inheritance    | { "no-interface": false }            |       | `DISABLED`      |
| no-multiple-inheritance              | Discourage use of multiple inheritance                                                           | Disallow interface inheritance    | { "no-interface": false }            |       | `DISABLED`      |
| no-named-params                      | Disallow named function parameters                                                               |                                   |                                      |       | `DISABLED`      |
| no-named-returns                     | Discourage use of named returns in functions                                                     |                                   |                                      |       | `DISABLED`      |
| 256-bit-ints-only                    | Disallow non-256 bit integers                                                                    |                                   |                                      |       | `DISABLED`      |
| no-suicide-or-selfdestruct           | Disallow suicide and selfdestruct                                                                |                                   |                                      |       | `DISABLED`      |
| no-var                               | Disallow type deduction via `var`                                                                |                                   |                                      |       | `DISABLED`      |
| no-user-defined-modifiers            | Disallow user-defined modifiers                                                                  |                                   |                                      |       | `DISABLED`      |
| no-void-returns                      | Discourage use of void returns in functions prototypes                                           |                                   |                                      |       | `DISABLED`      |
| no-func-overriding                   | Discourage function overriding                                                                   |                                   |                                      |       | `DISABLED`      |

An example `soliumrc.json` configuring and applying this plugin is:

```json
{
    "plugins": ["security"],
    "rules": {
        "some-other-solium-rule": 1,
        "security/no-low-level-calls": ["error", ["call", "delegatecall"]],
        "security/no-block-members": [1, ["timestamp"]],
        "security/no-throw": "off"
    }
}
```
This tells solium to apply the 3 `security/` rules with special configuration provided and apply the remaining rules of the plugin with their default configurations. If you want to disable a plugin rule, you have to explicitly disable it inside `rules`.

Lint normally using `solium -d contracts/` or `solium -d contracts/ --fix` to apply fixes as well.

## Developer Setup
- `git clone <URL-of-this-repo>`
- `cd solium-plugin-security`
- `npm install --dev`
- `npm link`
- `npm link solium-plugin-security`
- `npm test`

If you'd also like to use your develop build of this plugin with dev build of Solium, go to Solium's directory and run `npm link solium-plugin-security`. This will let Solium access your modified plugin instead of its pre-installed security module.

See [developing a plugin](https://ethlint.readthedocs.io/en/latest/developer-guide.html#developing-a-plugin).

## Known Issues
1. When installing the Linter from the `ethlint` NPM package, you might see the following warning:
```
npm WARN solium-plugin-security@0.1.1 requires a peer of solium@^1.0.0 but none is installed. You must install peer dependencies yourself.
```

You can safely ignore this warning.

Solium was recently [renamed](https://medium.com/solium/renaming-solium-to-ethlint-18b3cf043d15) to Ethlint and the linter is available for download from both `solium` and `ethlint` NPM packages. Ethlint comes shipped with this Security plugin. This plugin checks to ensure whether `solium` NPM package is installed or not.

There is currently no way in NPM to *allow any one of the specified packages to satisfy as peer dependency*, so we can't specify `solium OR ethlint`. We also cannot change `solium` to `ethlint` in `peerDependencies` because its a potential breaking change. See the [original issue](https://github.com/duaraghav8/solium-plugin-security/issues/33).
