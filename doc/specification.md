# Command Line Specifications

## Introduction

There are four sections:

* Concepts: introduce concepts
* Syntax specification: Describe structure of command line via a grammar which
  called ABNF.
* Logic specification: Describe structure of command which can't be describe
  by grammar but it is able to check by computer.
* Semantic specification: Describe structure of command which can't be
  describe by logic specification but it is able to check by human.

## Concepts

* Command line is a way to perform a computer program in a terminal device.
* Command line structure includes five sub concepts which describe command:
  `id`, `path`, `argument`, `option` and `structure`.
* ID is an identity to invoke an executable unit from terminal. For example
  `ls movie`, `cp` is name.
* Path is an sub identity to point an sub command from executable unit. For
  example `systemctl start networking.service`, `start` is path.
* Argument is position-dependent input for program or sub-command if path is
  specified.
* Option is position-independent input for program or sub-command if path is
  specified. There are two kind of option: boolean and key-pair.
* There are two kind of command: `simple-command` and `complex-command`.
* `simple-command` is uses for single function command.
* `complex-command` is uses for multi functions command.

For example, `compress` and `decompress` is single commands; `archive` is a
complex command, `compress` and `decompress` is sub commands of `archive`.

```bash
# compress file1, file2 and file3 to compressed_file
compress file1 file2 fil3 compressed_file

# extract compressed file to directory data
decompress compressed_file -to data

# compress file1, file2 and file3 to compressed_file
archive compress file1 file2 file3 compressed_file

# extract compressed file to directory data
archive decompress compressed_file -to data
```

## Syntax Specification

It is not efficiency to describe command as string because command parsing is
not unified on various platform. It is better for description which start with
process arguments. For example, two commands give the same process arguments
`['ls', 'first directory', 'second directory']`, even it uses different quote
or runs on different platforms:

* `ls 'first directory' 'second directory'`
* `ls "first directory" "second directory"`

The problem with above approach is it requires an abstract concept: separator
as rule `sep`. Separator is divider between items of process arguments, so an
process argument can be represent by: `arg1 sep arg2 sep arg3 ...`

Since separator is an abstract concepts, it does not represents for any
terminals. So it is not an ABNF rule and it is uses in limited rules which
describes command structure such as `command`, `simple-command`,
`complex-command`, `option` and `array`.

ABNF specification:

```text
; general structure
command = simple-command / complex-command
simple-command = id *(sep argument) *(sep option)
complex-command = id path *(sep argument) *(sep option)

; command's identity
id = 1*lowercase *(hyphen 1*(lowercase / digit))

; command's argument
argument = string

; command's path
path = 1*lowercase *(dot 1*(lowercase / digit))

; command's option
option = boolean-option / string-option / array-option
boolean-option = option-id
string-option = option-id sep string
array-option = option-id sep array
option-id = hyphen 1*lowercase
array = string *(sep string)

; etc
any = %x00-10FFFF
lowercase = %x41-5A / %x61-7A
digit = %x30-39
dot = "."
hyphen = "-"
string = 1*any
```

## Logic Specification

* option-id is unique in a command. That mean an option ID is represents at
  most a time in a command.

## Semantic Specification

* Path MUST contains a verb at the end of path, other parts MUST be nouns. For
  example `cloud-tool asia.user.create` is OK, `cloud-tool asia.create.user`
  is NOT OK, `archive compress` is OK, `archive compressing` is NOT OK.
* A command line MUST NOT requires option to run. If an input is required then
  make it as argument. For example, `mv -source movie -dest film` MUST be
  change to `mv source dest` where `source` and `dest` is argument.
* `id`, `path` and `option-id` SHOULD NOT too long. It takes time to
  write/read.
* Separator in `id`, `path` and `option-id` MUST be meaning. That mean it is
  uses to separates meaning parts, do not use to make messy.
* There is no rules to choose between argument and option, developer MUST
  decide it by efficiency for end-user. Recommend is design with all input is
  options then change input to argument for convenience. For example, `cp
  -source movie -dest film`, then `cp movie film`.
