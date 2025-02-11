import * as core from '@actions/core'
import semver from 'semver'

type Operator = '>' | '<' | '=' | '>=' | '<=' | '!='

function compareVersions(v1: string, v2: string, operator: Operator): boolean {
  const clean1 = semver.clean(v1)
  const clean2 = semver.clean(v2)

  if (!clean1 || !clean2) {
    throw new Error(`Invalid version: ${!clean1 ? v1 : v2}`)
  }

  switch (operator) {
    case '>':
      return semver.gt(clean1, clean2)
    case '<':
      return semver.lt(clean1, clean2)
    case '=':
      return semver.eq(clean1, clean2)
    case '>=':
      return semver.gte(clean1, clean2)
    case '<=':
      return semver.lte(clean1, clean2)
    case '!=':
      return !semver.eq(clean1, clean2)
    default:
      throw new Error(`Invalid operator: ${operator}`)
  }
}

export async function run() {
  try {
    const v1 = core.getInput('v1', { required: true })
    const v2 = core.getInput('v2', { required: true })
    const operator = core.getInput('operator', { required: true }) as Operator
    const notThrow = core.getInput('not_throw', { required: false })?.toLowerCase() === 'true'

    try {
      const result = compareVersions(v1, v2, operator)
      core.setOutput('result', result)
    } catch (error) {
      if (notThrow) {
        core.setOutput('result', false)
      } else {
        throw error
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    } else {
      core.setFailed('An unexpected error occurred')
    }
  }
}