# class SimpleCommand

```js
const {SimpleCommand} = require('@trop/cli')

```
## Members

### constructor(spec, executor)

* Input
    * `spec` / `Object` - Definition of command.
    * `spec.arguments` / `Array<Object>` - List of argument specifications.
      The order of arguments is similar between definition and execution.
    * `spec.arguments[].name` / `String` - Name of argument. It can contains
      symbols: lowercase a-z, digits 0-9 and hyphen.
    * `spec.argument[].type` / `String` - Type of argument's data, one of
      `number` and `string`.
    * `spec.argument[].default` / `String | Number` - Default value for input.
      It must be the same type which is specified by `spec.argument[].type`.
      If it does not specific then it's value is `undefined`, mean that
      argument must be specific on execution.
    * `spec.options` / `Array<Object>` - List of option specifications.
      Because both argument and option is input, it's name can not be
      duplicated.
    * `spec.options[].name` / `String` - Name of option. It can contains
      symbols: lowercase a-z, digit 0-9 and hyphen. If the name is defined
      `source` in specification then it must be write as `-source` on
      execution.
    * `spec.options[].alias` / `String` - Shortcut for option, must be exactly
      a symbols.
    * `spec.options[].type` / `String` - Type of option's data, one of
      `boolean`, `number` and `string`. The default value corresponding are
      `false`, `0` and `empty string`.
    * `spec.options[].default` / `Boolean | Number | String` - Default value
      for option in case it does not specific. It's type must be the same with
      `spec.option[].type`.
    * `executor` / `Function(input)` - A sync/async function will be call on
      command is invoked.
    * `executor().input` / `Object` - Contains command's inputs, mean that
      both arguments and options. An input can be access by `input[name]`,
      where `name` is name of argument or option.
* Process - Define a command structure.

### async run()

* Input - none
* Process - Get a command as list of string token from `process.argv`, parse
  and invoke `executor`.
* Output - `Promise<undefined>`

## Example

```js
// create a command which copy file from source to destination

const {SimpleCommand} = require('@trop/cli')

let cmd = new SimpleCommand({
    arguments: [
        {
            name: 'source',
            type: 'string'
        },
        {
            name: 'dest',
            type: 'string'
        }
    ],
    options: [
        {
            name: 'list',
            alias: 'l',
            type: 'boolean',
            default: false
        }
    ]
}, (input) => {
    // execute command here
})

cmd.run().catch(e => console.error(e))
```
