import type { VdsTabConfig } from './VdsTabs'

// Gets the first element configured as selected
export const getSelectedElement = (config: VdsTabConfig[] = []) => {
  if (config.length === 0) return

  const filtered = config.find(x => x.selected === true)
  const selected = filtered || config[0]

  return selected
}
