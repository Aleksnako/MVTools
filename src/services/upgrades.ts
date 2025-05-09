import semver from 'semver'
import { z } from 'zod'

import { getStoredProperty, setStoredProperty } from '@/services/storage'
import { BROWSER_STORAGE_KEYS } from '@/types/storage'

import pkg from '../../package.json'

export const UPGRADE_TASKS = {
  MIGRATED_FROM_LOCAL_STORAGE: 'migrateFromLocalStorage'
} as const

export const upgradeTasksSchema = z.object({
  migrateFromLocalStorage: z.boolean()
})

type UpgradeTasks = z.infer<typeof upgradeTasksSchema>

type UpgradeTaskKey = keyof UpgradeTasks

export const getPerformedUpgradeTasks = async () => {
  const fromVersion = await getMigratedFromVersion()
  return await getStoredProperty<UpgradeTasks>(BROWSER_STORAGE_KEYS.PERFORMED_UPGRADE_TASKS, {
    migrateFromLocalStorage: semver.gte(fromVersion, '3.0.0')
  })
}
export const setPerformedUpgradeTask = async (upgradeTask: UpgradeTaskKey, finished: boolean) => {
  const tasks = await getPerformedUpgradeTasks()
  tasks[upgradeTask] = finished
  await setStoredProperty(BROWSER_STORAGE_KEYS.PERFORMED_UPGRADE_TASKS, tasks)
}

const getMigratedFromVersion = () => getStoredProperty(BROWSER_STORAGE_KEYS.EXTENSION_MIGRATED_FROM_VERSION, pkg.version)
export const setMigratedFromVersion = async (version: string) => {
  await setStoredProperty(BROWSER_STORAGE_KEYS.EXTENSION_MIGRATED_FROM_VERSION, version)
}
