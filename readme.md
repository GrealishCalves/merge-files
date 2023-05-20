# merge-ts

`merge-ts` is a Node.js package that allows you to merge multiple TypeScript files into a single file. It recursively searches a specified directory for TypeScript files and combines them into one output file, stripping out import statements and adding comments to indicate the file structure.

## Installation

You can install `merge-ts` globally using npm:

```shell
npm install -g merge-ts
```

Or you can install it as a development dependency in your project:

```shell
npm install --save-dev merge-ts
```

## Usage

Once installed, you can use the `merge-ts` command-line tool to merge TypeScript files. Here's the basic usage:

```shell
merge-ts <inputDir> <outputFilePath>
```

- `inputDir`: The directory containing the TypeScript files you want to merge.
- `outputFilePath`: The path to the output file where the merged content will be written.

For example, if you have a directory called `src` with several TypeScript files and you want to merge them into a file called `bundle.ts`, you can run:

```shell
merge-ts src bundle.ts
```

## Examples

To merge all TypeScript files in the current directory into a file named `output.ts`, run:

```shell
merge-ts ./ output.ts
```

To merge TypeScript files in a specific directory, such as `src/app`, and save the merged output to `dist/bundle.ts`, run:

```shell
merge-ts src/app dist/bundle.ts
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue on the [GitHub repository](https://github.com/your-username/merge-ts).

## License

This package is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.
