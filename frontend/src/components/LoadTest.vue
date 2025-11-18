<script setup>
import { ref } from 'vue'

const requestsCount = ref(10)
const delayMs = ref(100)
const sent = ref(0)
const successful = ref(0)
const errors = ref(0)
const startTime = ref(null)
const elapsedTime = ref(0)
const isRunning = ref(false)

let intervalId = null

const startTest = async () => {
  if (isRunning.value) return
  isRunning.value = true
  sent.value = 0
  successful.value = 0
  errors.value = 0
  startTime.value = Date.now()
  intervalId = setInterval(updateElapsed, 1000)

  for (let i = 0; i < requestsCount.value; i++) {
    sent.value++
    fetch('http://localhost:3000/items?limit=10', { mode: 'cors' })
      .then(res => {
        if (res.ok) successful.value++
        else errors.value++
      })
      .catch(() => errors.value++)
    if (delayMs.value > 0) await new Promise(resolve => setTimeout(resolve, delayMs.value))
  }

  isRunning.value = false
  clearInterval(intervalId)
}

const updateElapsed = () => {
  if (startTime.value) elapsedTime.value = Math.floor((Date.now() - startTime.value) / 1000)
}
</script>

<template>
  <div>
    <h1>Load Test</h1>
    <label>Requests Count: <input v-model="requestsCount" type="number" /></label><br />
    <label>Delay (ms): <input v-model="delayMs" type="number" /></label><br />
    <button @click="startTest" :disabled="isRunning">Start</button>
    <div v-if="isRunning || sent > 0">
      <p>Sent: {{ sent }}</p>
      <p>Successful: {{ successful }}</p>
      <p>Errors: {{ errors }}</p>
      <p>Elapsed Time: {{ elapsedTime }} seconds</p>
    </div>
  </div>
</template>