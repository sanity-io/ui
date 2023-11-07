export interface PointCmd {
  type: 'point'
  x: number
  y: number
  radius?: number
}

export interface CurveCmd {
  type: 'curve'
  startControl: Point
  endControl: Point
  curveEnd: Point
}

export type Cmd = PointCmd | CurveCmd

export interface Point {
  x: number
  y: number
  radius?: number
}

function moveTowardsLength(movingPoint: Point, targetPoint: Point, amount: number) {
  const width = targetPoint.x - movingPoint.x
  const height = targetPoint.y - movingPoint.y

  const distance = Math.sqrt(width * width + height * height)

  return moveTowardsFractional(movingPoint, targetPoint, Math.min(1, amount / distance))
}

function moveTowardsFractional(movingPoint: Point, targetPoint: Point, fraction: number): Point {
  return {
    x: movingPoint.x + (targetPoint.x - movingPoint.x) * fraction,
    y: movingPoint.y + (targetPoint.y - movingPoint.y) * fraction,
  }
}

export function getRoundedCommands(points: Point[]): Cmd[] {
  const len = points.length

  const cmds: Cmd[] = []

  for (let i = 0; i < len; i += 1) {
    const point = points[i]
    const prevPoint = points[i - 1]
    const nextPoint = points[i + 1]

    if (prevPoint && point.radius) {
      const curveStart = moveTowardsLength(point, prevPoint, point.radius)
      const curveEnd = moveTowardsLength(point, nextPoint, point.radius)
      const startControl = moveTowardsFractional(curveStart, point, 0.5)
      const endControl = moveTowardsFractional(point, curveEnd, 0.5)

      cmds.push({
        type: 'point',
        ...curveStart,
      })

      cmds.push({
        type: 'curve',
        curveEnd,
        startControl,
        endControl,
      })
    } else {
      cmds.push({
        type: 'point',
        ...point,
      })
    }
  }

  return cmds
}

export function compileCommands(cmds: Cmd[]): string {
  return cmds
    .map((n, idx) => {
      if (n.type === 'point') {
        return `${idx === 0 ? 'M' : 'L'} ${n.x} ${n.y}`
      }

      if (n.type === 'curve') {
        return `C ${n.startControl.x} ${n.startControl.y} ${n.endControl.x} ${n.endControl.y} ${n.curveEnd.x} ${n.curveEnd.y}`
      }

      return ``
    })
    .join(' ')
}
