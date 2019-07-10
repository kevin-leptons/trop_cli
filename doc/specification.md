# Command Line Specifications

This specifications does not guarantees all commands work in real life. Some
are existed commands, some are existed but not arguments or options,
some is assume.

## ABNF Specification

```text
; general structure
command = name *1(sps path) *(sps argument) *(sps option)

; command's name
name = 1*lowercase *(hyphen 1*(lowercase / digit))

; command's path
path = 1*lowercase *(dot 1*(lowercase / digit))

; command's argument
argument = number / string

; command's option
option = boolean-option / number-option / string-option / array-option
boolean-option = option-name
number-option = option-name sps number
string-option = option-name sps string
array-option = option-name sps (array-nubmer / array-string)
option-name = hyphen 1*lowercase

; data type - string
string = string-with-space / string-without-space
string-with-space = single-quote char-with-space* single-quote
string-without-space = char-without-space+

; data type - array
array = array-number / array-string
array-number = number *(sps number)
array-string = string *(sps string)

; data type - number
number = integer / real
integer = 1*digit
real = 1*digit *1(dot 1*digit)

; etc
sps = 1*space
lowercase = %x41-5A / %x61-7A
digit = %x30-39
dot = %x2E
single-quote = %x27
char-with-space = %x20-10FFFF
char-without-space = %x21-10FFFF
```

## Command Line

* Command line structure is concept which includes five sub-concepts to run a
computer program: `name`, `path`, `argument`, `option` and `structure`.
* Structure is `name path? argument* option*`, mean that `name` is required,
`path` appears zero or one time, `argument` appears zero or many times,
`options` appears zero or many times.

## Data Type

boolean, number, string, array

## Command Line's Name

* Name is an identity to invoke an executable unit from terminal. For example
`ls movie`, `cp` is name.
* Name MUST contains symbols: lowercase a-z, digits 0-9 and hyphen.
* Name MUST use hyphen to split meaning parts of name, not for making messy.
For example, `cloud-tool` is OK, `clou-dtool` is NOT OK.
* Name SHOULD NOT too long, it take time to write. And there is no
specifications for length of name.

## Command Line's Path

* Path is an sub-identity to point an sub-command from executable unit. For
example `systemctl start networking.service`, `start` is path.
* Path MUST contains symbols: lowercase a-z, digit 0-9 and dot.
* Path MUST use dot to split meaning parts of path, not for making messy. For
example, `cloud-tool user.create` is OK, `cloud-tool use.rcreate` is NOT OK.
* Path MUST contains at least and most a verb part at the end of path, other
parts MUST be nouns. For example `cloud-tool user.create` is OK, `cloud-tool
create.user` is NOT OK, `cloud-tool database.create.table` is NOT OK.

## Command Line's Argument

* Argument is position-dependent input for program or sub-command if path is
specified.
* Argument can contains any symbols. If argument contains space then it MUST
be wrapped by single quote. For example `ls 'action movies'`

## Command Line's Option

* Option is position-independent input for program or sub-command if path is
specified. There are two kind of option: boolean and key-pair.
* Boolean option has form `-name`, where hyphen points that is beginning of an
option, `name` is identity of option. If option is not specified then it's
value is `false`. If option is specified then it's value is `true`.
* Key-pair option has form `-name value`, where `-name` is similar like
boolean option, `value` is it's value, maybe a number, a string or an array.
* Value of key-pair option can contains any symbols. If it contains space then
it MUST be wrapped by single quote. For example `cloud-tool user.create
kevin -group 'mad guy'`.
* If value of key-pair is an array then it is follows by list of items which
is divide by space and terminate by end of command or start a new option.
* Option's name MUST contains symbols: lowercase a-z, digits 0-9 and
  hyphen.
* Option's name MUST uses hyphen to split parts of name, not for making messy.
  For example, `cloud-tool user.create kevin -home-dir /home/kevin` is OK,
  `cloud tool user.create kevin -hom-edir /home/kevin` is NOT OK.
* At most two option is map to an input. For example `ls -l` and `ls -list`
  map to input which display results as a list.
* Command line MUST NOT requires option to run. If an input is required then
  make it as argument. For example, `mv -source movie -dest film` MUST be
  change to `mv SOURCE DEST`.
* There is no rules to choose between argument and option, developer MUST
  decide it by efficiency for end-user. Recommend is design with all input is
  options then change input to argument for convenience. For example, `cp
  -source movie -dest film`, then `cp movie film`.
