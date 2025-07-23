# Packages Directory

This directory is part of the Yarn workspaces configuration for the pay-extend project. It's intended to hold additional packages that will be part of the monorepo structure.

## Adding a New Package

To add a new package:

1. Create a new directory inside this `packages` directory
2. Initialize a new package with `yarn init` or create a package.json manually
3. Make sure to set a unique name for your package
4. Reference the package in the root project using its name

## Working with Packages

You can run commands on specific packages using:

```bash
yarn workspace <package-name> <command>
```

Or run commands across all packages using:

```bash
yarn workspaces run <command>
```

See the root package.json for pre-configured workspace scripts.