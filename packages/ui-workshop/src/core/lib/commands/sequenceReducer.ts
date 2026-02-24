import type {Candidate, SequenceAction, SequenceBinding, SequenceState} from './types'

/**
 * Check if a buffer is a complete match for a sequence binding
 */
export function isComplete(buffer: string[], binding: SequenceBinding): boolean {
  if (buffer.length !== binding.keys.length) return false
  for (let i = 0; i < binding.keys.length; i++) {
    if (buffer[i] !== binding.keys[i]) return false
  }
  return true
}

/**
 * Check if a buffer is a valid prefix of a sequence binding
 */
export function isPrefix(buffer: string[], binding: SequenceBinding): boolean {
  if (buffer.length > binding.keys.length) return false
  for (let i = 0; i < buffer.length; i++) {
    if (buffer[i] !== binding.keys[i]) return false
  }
  return true
}

/**
 * Find the highest priority complete candidate
 */
export function findBestCandidate(buffer: string[], candidates: Candidate[]): Candidate | null {
  let best: Candidate | null = null
  for (const candidate of candidates) {
    if (isComplete(buffer, candidate.binding)) {
      if (!best || candidate.priority > best.priority) {
        best = candidate
      }
    }
  }
  return best
}

/**
 * Pure reducer for sequence state machine
 */
export function sequenceReducer(state: SequenceState, action: SequenceAction): SequenceState {
  switch (action.type) {
    case 'sequence/reset': {
      return {kind: 'idle'}
    }

    case 'sequence/key': {
      const {key, now, candidates} = action

      // If we're active, check if we've exceeded the deadline
      if (state.kind === 'active' && now > state.deadline) {
        state = {kind: 'idle'}
      }

      if (state.kind === 'idle') {
        // Starting a new sequence - find candidates that match first key
        const matching = candidates.filter((c) => c.binding.keys[0] === key)
        if (matching.length === 0) {
          return {kind: 'idle'}
        }

        // Determine timeout for this sequence
        const timeout = matching[0].binding.timeoutMs ?? 800 // Use first candidate's timeout or default
        const deadline = now + timeout

        return {
          kind: 'active',
          buffer: [key],
          deadline,
          candidates: matching,
        }
      }

      // Active sequence - append key and filter candidates
      const newBuffer = [...state.buffer, key]
      const matching = state.candidates.filter((c) => isPrefix(newBuffer, c.binding))

      if (matching.length === 0) {
        // No more matches - reset
        return {kind: 'idle'}
      }

      return {
        kind: 'active',
        buffer: newBuffer,
        deadline: state.deadline,
        candidates: matching,
      }
    }

    default:
      return state
  }
}
