# Semver Compare

A GitHub Action to compare semantic versions using operators. Built on top of [semver](https://www.npmjs.com/package/semver) package.

## Inputs

| Name | Description | Required | Default |
|------|-------------|----------|---------|
| `v1` | First version to compare | Yes | - |
| `v2` | Second version to compare | Yes | - |
| `operator` | Comparison operator (`>`, `<`, `=`, `>=`, `<=`, `!=`) | Yes | - |
| `not_throw` | If true, return false instead of throwing error when versions are invalid | No | false |

## Outputs

| Name | Description |
|------|-------------|
| `result` | Result of the comparison (true/false) |

## Example Usage

```yaml
name: Compare Versions
on: [push]

jobs:
  compare:
    runs-on: ubuntu-latest
    steps:
      - name: Compare versions
        uses: ArcherGu/semver-compare@v1
        id: compare
        with:
          v1: '2.0.0'
          v2: '1.0.0'
          operator: '>' # means v1 > v2
          not_throw: 'false'

      - name: Check result
        run: |
          if [[ ${{ steps.compare.outputs.result }} == 'true' ]]; then
            echo "Version comparison succeeded"
          else
            echo "Version comparison failed"
          fi
```

## Error Handling

By default, the action will throw an error if:
- Either version is invalid according to semver rules
- The operator is invalid

If you set `not_throw: true`, the action will return `false` instead of throwing an error in these cases.

## License

MIT