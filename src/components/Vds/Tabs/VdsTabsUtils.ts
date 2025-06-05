import type { VdsTabConfig } from './VdsTabs'

// Gets the first element configured as selected
export const getSelectedElement = (config: VdsTabConfig[] = []): VdsTabConfig | undefined => {
  if (config.length === 0) return
  const filtered = config.filter(x => x.selected === true)[0]
  const selected: VdsTabConfig = filtered || config[0]

  return selected
}
