# CLI App

A simple command-line application for inspecting basic system and environment information.

## Features

- Show the application version
- Display operating system information
- Display system memory details
- Show the current working directory
- List environment variables
- Use `--json` to output results in machine-readable JSON format

## Usage

```bash
cli-app [argument] [--json]
```

## Arguments

| Argument  | Description                        |
| --------- | ---------------------------------- |
| `version` | Show the application version       |
| `os`      | Show operating system information  |
| `memory`  | Show system memory details         |
| `cwd`     | Show the current working directory |
| `env`     | Show environment variables         |

## JSON Output

Use the `--json` flag to get the result in machine-readable JSON format.

```bash
cli-app os --json
```

Example:

```json
{
  "os": "linux",
  "architecture": "x64",
  "version": "6.8.0"
}
```
