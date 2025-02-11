import * as core from '@actions/core'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { run } from '../src/main'

const getInputMock = vi.spyOn(core, 'getInput')
const setOutputMock = vi.spyOn(core, 'setOutput')
const setFailedMock = vi.spyOn(core, 'setFailed')

describe('semver-compare action', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // all operators tests: <, <=, =, >=, > and !=
  it('should compare versions correctly with operator <', async () => {
    getInputMock.mockImplementation((name: string) => {
      switch (name) {
        case 'v1':
          return '1.2.3'
        case 'v2':
          return '1.2.4'
        case 'operator':
          return '<'
        case 'not_throw':
          return 'true'
        default:
          return ''
      }
    })

    await run()

    expect(setOutputMock).toHaveBeenCalledWith('result', true)
  })

  it('should compare versions correctly with operator <=', async () => {
    getInputMock.mockImplementation((name: string) => {
      switch (name) {
        case 'v1':
          return '1.2.3'
        case 'v2':
          return '1.2.4'
        case 'operator':
          return '<='
        case 'not_throw':
          return 'true'
        default:
          return ''
      }
    })

    await run()

    expect(setOutputMock).toHaveBeenCalledWith('result', true)
  })

  it('should compare versions correctly with operator =', async () => {
    getInputMock.mockImplementation((name: string) => {
      switch (name) {
        case 'v1':
          return '1.2.3'
        case 'v2':
          return '1.2.4'
        case 'operator':
          return '='
        case 'not_throw':
          return 'true'
        default:
          return ''
      }
    })

    await run()

    expect(setOutputMock).toHaveBeenCalledWith('result', false)
  })

  it('should compare versions correctly with operator >=', async () => {
    getInputMock.mockImplementation((name: string) => {
      switch (name) {
        case 'v1':
          return '1.2.3'
        case 'v2':
          return '1.2.4'
        case 'operator':
          return '>='
        case 'not_throw':
          return 'true'
        default:
          return ''
      }
    })

    await run()

    expect(setOutputMock).toHaveBeenCalledWith('result', false)
  })

  it('should compare versions correctly with operator >', async () => {
    getInputMock.mockImplementation((name: string) => {
      switch (name) {
        case 'v1':
          return '1.2.3'
        case 'v2':
          return '1.2.4'
        case 'operator':
          return '>'
        case 'not_throw':
          return 'true'
        default:
          return ''
      }
    })

    await run()

    expect(setOutputMock).toHaveBeenCalledWith('result', false)
  })

  // Pre-release versions comparison
  it('should compare pre-release versions correctly', async () => {
    getInputMock.mockImplementation((name: string) => {
      switch (name) {
        case 'v1':
          return '0.0.2-beta'
        case 'v2':
          return '0.0.2-beta'
        case 'operator':
          return '>'
        case 'not_throw':
          return 'true'
        default:
          return ''
      }
    })

    await run()

    expect(setOutputMock).toHaveBeenCalledWith('result', false)
  })

  // Invalid version tests
  it('should throw an error when v1 is invalid', async () => {
    getInputMock.mockImplementation((name: string) => {
      switch (name) {
        case 'v1':
          return 'invalid'
        case 'v2':
          return '1.2.3'
        case 'operator':
          return '>'
        case 'not_throw':
          return 'false'
        default:
          return ''
      }
    })

    await run()

    expect(setFailedMock).toHaveBeenCalledWith('Invalid version: invalid')
  })
})
