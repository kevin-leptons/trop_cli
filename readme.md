# @trop/cli

**Note**: In building of specification and APIs, does not ready to use.

A standard and tool to build command programs. Without a standard, command
line structure can be different between groups, organizations, then chaos
happens, end-users get confused. Without command line build tool, building is
harder, developers takes time on command line instead of logic of programs,
developers get mad. That why this project build specifications for command
line programs and also provide a tool to build it on Javascript. However, it
is free to use specifications to make builders on other programming languages.

If you are UNIX-like users, you know that there are rules for command line
structure. However, it seems not efficient because they put options before
arguments while arguments is more important than options. Don't and won't
talk about command line on Windows because there are not command-line land,
even they try to reach that, simple because there are not freedom land.

There are many rules for command line structure out there. Don't expect this
rules become an official standard such as RFC or ISO because it requires too
much resources, special time. Just hope that developers sees these rules is
efficient and uses it for new programs.

## Usage

**Install**

```bash
npm install @trop/cli
```

**Command Line without Sub Commands**

```js
// create a command which copy file from source to destination

const {SimpleCommand} = require('@trop/cli')

let cmd = new SimpleCommand()

cmd.command({
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

**Command Line with Sub Command**

```js
// create a command which start/stop a service

const {ComplexCommand} = require('@trop/cli')

let cmd = new ComplexCommand()

cmd.command({
    path: 'start',
    arguments: [
        {
            name: 'service',
            type: 'string'
        }
    ]
}, async (input) => {
    // do start a service here
})

cmd.command({
    path: 'stop',
    arguments: [
        {
            name: 'service',
            type: 'string'
        }
    ]
}, async (input) => {
    // do stop a service here
})

cmd.run().catch(e => console.error(e))
```

## References

* [Document - Detail specifications and APIs](doc/index.md)
* [Changelog](changelog.md)
* [Contribution](contribution.md)
* [Command Line Interface](https://en.wikipedia.org/wiki/Command-line_interface)
* [Unix-like system](https://en.wikipedia.org/wiki/Unix-like)
* [getopt(3) - Command line parser on UNIX-like system](http://man7.org/linux/man-pages/man3/getopt.3.html)
