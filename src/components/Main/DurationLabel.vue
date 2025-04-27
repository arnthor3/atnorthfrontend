<script setup lang="ts">
type DurationLabelProps = {
  duration: {
    weeks: number
    days: number
    hours: number
    minutes: number
  }
}
defineProps<DurationLabelProps>()
const renderDurationLabel = ({ duration }: DurationLabelProps) => {
  if (duration?.weeks) {
    return `~${duration.weeks} week`
  }
  if (duration.days) {
    return `${duration.days} days`
  }
  if (duration.hours) {
    return `${duration.hours} hours`
  }
  return `${duration.minutes} minutes`
}
const isHighestOrder = (
  duration: DurationLabelProps['duration'],
  period: keyof DurationLabelProps['duration']
) => {
  if (period === 'weeks') {
    return duration.weeks > 0
  }
  if (period === 'days') {
    return duration.days > 0 && duration.weeks === 0
  }
  if (period === 'hours') {
    return duration.hours > 0 && duration.days === 0 && duration.weeks === 0
  }
}
</script>
<template>
  <div
    class="inline-flex h-6 min-w-20 items-center justify-center rounded px-2 text-xs font-semibold text-white"
    :class="[
      isHighestOrder(duration, 'weeks') && 'bg-red-600',
      isHighestOrder(duration, 'days') && 'bg-yellow-600',
      isHighestOrder(duration, 'hours') && 'bg-green-600',
      isHighestOrder(duration, 'minutes') && 'bg-blue-600'
    ]"
  >
    {{ renderDurationLabel({ duration }) }}
  </div>
</template>
