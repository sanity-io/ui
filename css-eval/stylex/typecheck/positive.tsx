/** Valid usage that must compile. */
import * as stylex from '@stylexjs/stylex'
import {Button, darkTheme, tones, type ButtonTone} from 'stylex-button-v1'
import {tokens} from 'stylex-button-v1/tokens.stylex'

export const brand = stylex.createTheme(tokens, {primaryFill: '#ff3399'})

const styles = stylex.create({
  box: {padding: tokens.space3, borderRadius: tokens.radius2},
  width: (width: number) => ({width}),
})

export function Page(props: {tone: ButtonTone}) {
  return (
    <div {...stylex.props(darkTheme, brand, styles.box, styles.width(320))}>
      <Button tone={props.tone} mode="ghost" padding={2} radius={3} width="fill" text="ok" />
      <Button tone="primary" width={120} selected />
      <span className={tones.primary[Object.keys(tones.primary)[0] as never]} />
    </div>
  )
}
