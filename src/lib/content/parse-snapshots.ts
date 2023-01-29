const SNAP_HEADING = 'reTypewriter Snapshots v1\n'
const SNAP_SEPERATOR_PRE = '-'.repeat(2)
const SNAP_CAPTURE_NUMBER = '(\\d{2})'
const SNAP_SEPERATOR_POST = '-'.repeat(10)
const SNAP_SEPERATOR_MATCHER = new RegExp(`\\n?${SNAP_SEPERATOR_PRE}${SNAP_CAPTURE_NUMBER}${SNAP_SEPERATOR_POST}\\n`, 'g')
const SNAP_END = '-'.repeat(14)

export function parseSnapshots(raw: string): Record<string, string> {
  if (!raw.startsWith(SNAP_HEADING))
    throw new SyntaxError('Invalid snapshot file')
  const rawWithoutEnd = raw.replace(SNAP_END, '')
  const snapshots: Record<string, string> = {};

  const snapshotSeparators = Array.from(rawWithoutEnd.matchAll(SNAP_SEPERATOR_MATCHER))
  snapshotSeparators.forEach((match, idx) => {
    const nextMatch = snapshotSeparators[idx + 1]
    const startOfMatch = match.index as number;
    const beginningOfNextMatch = nextMatch?.index ?? raw.length
    const separatorLength = match[0].length
    const bodyStart = startOfMatch + separatorLength
    const body = rawWithoutEnd.slice(bodyStart, beginningOfNextMatch).trim()
    snapshots[match[1]] = body
  })

  return snapshots
}
