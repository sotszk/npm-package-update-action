
<p align="center">
  <a href="https://github.com/SotaSuzuki/npm-package-update-action/action"><img alt="javscript-action status" src="https://github.com/SotaSuzuki/npm-package-update-action/workflows/package-update/badge.svg"></a>
</p>

# npm package update action

This action is to know whether new version available on your project's package dependencies.

## Inputs

### `execute_directories` (**optional**)

- directories where the action is executed
- multiple directories available

Example:
```yml
- uses: SotaSuzuki/npm-package-update-action@v1
  id: package-update
  with:
    execute_directories: |
      dir1
      dir2
```

## Outputs

### `has_npm_update`

- whether new version available or not
- the result must be `yes` or `no`

### `has_major_npm_update`

- whether new major version available or not
- the result must be `yes` or `no`

## `npm_update_json`

- new version information as json

## `npm_update_formatted`

- new version information as formatted with plain text

## `npm_update_formatted_major_update`

- new version information as formatted with plain text
- only packages that have major update available

## `npm_update_formatted_columns`

- new version information as formatted with column style for markdown table

## `npm_update_formatted_columns_without_major_update`

- new version information as formatted with column style for markdown table
- ignore major update
