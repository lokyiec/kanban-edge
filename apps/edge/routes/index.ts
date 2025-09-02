import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  return {
    status: 'ok',
    message: 'Hello from Kanban Edge',
  }
})

