# The official Security Plugin for Solium

[![Build Status](https://travis-ci.org/duaraghav8/solium-plugin-security.svg?branch=master)](https://travis-ci.org/duaraghav8/solium-plugin-security)

This Plugin provides security-focused lint rules for [Solium](https://github.com/duaraghav8/Solium).

The rules have been taken from Consensys' [Recommended Smart Contract Practices](https://consensys.github.io/smart-contract-best-practices/recommendations/) and Solium's [Rule Wishlist](https://github.com/duaraghav8/Solium/issues/44).

## Installation
**NOTE: If you're using Solium `v1.0.1` or above, this plugin comes pre-installed as a local dependency and you can skip this section.**

`npm install -g solium-plugin-security`

## Usage
**NOTE: If you've installed Solium `v1.0.1` or above and created `soliumrc.json` using `solium --init`, you can skip this step since solium automatically applies the security plugin for you.**

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

## Developer Setup
- `git clone <URL-of-this-repo>`
- `cd solium-plugin-security`
- `npm install --dev`
- `npm test`

## List of rules
Below are the rules supplied by this plugin and the information on passing options to them and their auto-fixing capabilities.

| Name                           | Description                                                                                      | Options                           | Defaults                             | Fixes |
|--------------------------------|--------------------------------------------------------------------------------------------------|-----------------------------------|--------------------------------------|-------|
| else-after-elseif              | Encourage user to use else statement after else-if statement                                     |                                   |                                      |       |
| enforce-explicit-visibility    | Encourage user to explicitly specify visibility of function                                      |                                   |                                      | YES   |
| enforce-loop-bounds            | Encourage use of loops with fixed bounds                                                         |                                   |                                      |       |
| enforce-placeholder-last       | Enforce that the function placeholder is the last statement in the modifier                      |                                   |                                      |       |
| return-at-end                  | Discourage use of early returns in functions                                                     |                                   |                                      |       |
| one-break-per-loop             | Discourage use of multiple breaks in while/for/do loops                                          |                                   |                                      |       |
| max-statements-in-func         | Enforce upper limit on number of statements inside a function                                    | Maximum number of statements      | 25                                   |       |
| no-abstract-func               | Discourage use of abstract functions                                                             |                                   |                                      |       |
| no-bit-operations              | Disallow bitwise operations                                                                      |                                   |                                      |       |
| no-block-members               | Discourage use of members 'blockhash' & 'timestamp' (and alias 'now') of 'block' global variable | List of members to warn against   | ["blockhash", "timestamp"]           |       |
| no-call-value                  | Discourage use of .call.value()()                                                                |                                   |                                      |       |
| no-continue                    | Discourage use of 'continue' statement                                                           |                                   |                                      |       |
| no-assign-params               | Disallow assigning to function parameters                                                        |                                   |                                      |       |
| no-fixed                       | Disallow fixed point types                                                                       |                                   |                                      |       |
| no-inheritance                 | Discourage use of inheritance                                                                    | Disallow interface inheritance    | { "no-interface": false }            |       |
| no-inline-assembly             | Discourage use of inline assembly                                                                |                                   |                                      |       |
| no-low-level-calls             | Discourage the use of low-level functions - call(), callcode() & delegatecall()                  | List of functions to warn against | ["call", "callcode", "delegatecall"] |       |
| no-modify-for-iter-var         | Discourage user to modify a for loop iteration counting variable in the loop body                |                                   |                                      |       |
| no-multiple-inheritance        | Discourage use of multiple inheritance                                                           | Disallow interface inheritance    | { "no-interface": false }            |       |
| no-named-params                | Disallow named function parameters                                                               |                                   |                                      |       |
| no-named-returns               | Discourage use of named returns in functions                                                     |                                   |                                      |       |
| 256-bit-ints-only              | Disallow non-256 bit integers                                                                    |                                   |                                      |       |
| no-send                        | Discourage the use of unsafe method 'send'                                                       |                                   |                                      |       |
| no-sha3                        | Encourage use of 'keccak256()' over 'sha3()' function                                            |                                   |                                      | YES   |
| no-suicide-or-selfdestruct     | Disallow suicide and selfdestruct                                                                |                                   |                                      |       |
| no-throw                       | Discourage use of 'throw' statement for error flagging                                           |                                   |                                      | YES   |
| no-tx-origin                   | Discourage use of 'tx.origin' global variable                                                    |                                   |                                      |       |
| no-var                         | Disallow type deduction via `var`                                                                |                                   |                                      |       |
| no-unreachable-code            | Disallow unreachable code                                                                        |                                   |                                      |       |
| no-user-defined-modifiers      | Disallow user-defined modifiers                                                                  |                                   |                                      |       |
| no-void-returns                | Discourage use of void returns in functions prototypes                                           |                                   |                                      |       |
| no-func-overriding             | Discourage function overriding                                                                   |                                   |                                      |       |

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

## Roadmap
- [ ] Add automated tests
- [ ] Refine rule `enforce-explicit-visibility`
- [ ] Add more security rules

## Security rules to be implemented
- [ ] `no-multiple-send-calls`
- [ ] `check-send-result`

...And many more from the sources listed above
