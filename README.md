# Install
To add makro to your project, use the command `npm i -S makro`.
You can also use the more familiar but longer command, `npm install makro --save`.

To include makro into your JavaScript, `require` it.
`var makro = require('makro');`

Or if you are using ES6:
`import makro from 'makro';`

# Usage
To define a constant, call the `makro` object with the first argument as the name you wish to give it, and the second argument will be the value of the macro. The meaning of the value depends on whether it is a `String` or not.

Having the second argument as a `String` will assume it is code in text. Using `{` and `}` within the string will change the string to be a function based macro. Any identifier names within the curly braces will be replaced with function arguments.
* defining `makro('sin', 'console.log(Math.sin(5.5))');` will cause `-0.7055403255703919` to be printed out on the statement: `makro.sin;`
    
* defining `makro('sin', 'console.log(Math.sin({a}))');` will require you to call it as a function, like so: `makro.sin(5.5);`.

Any other object - `Function`s, `Number`s, `null`, etc... Will be a literal constant definition as expected.
* defining `makro('x', 5);` will cause `5` to be printed on the statement: `console.log(makro.x);`.
    