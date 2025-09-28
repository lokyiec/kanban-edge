import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Board as TBoard, Column as TColumn, Card as TCard } from '@kanban-edge/types'

export type Subtask = { id: string; title: string; done: boolean }
export type Card = TCard & { description?: string; subtasks: Subtask[] }
export type Board = TBoard & { slug: string; columns: Column[] }
export type Column = TColumn & { cards: Card[] }
export type StatusOption = Pick<TColumn, 'id' | 'title'>

export const useBoardsStore = defineStore('boards', () => {
  const boards = ref<Board[]>([
    {
      id: 'b1',
      slug: 'platform-launch',
      title: 'Platform Launch',
      columns: [
        {
          id: 'c1',
          boardId: 'b1',
          title: 'Todo',
          cards: [
            {
              id: 't1',
              columnId: 'c1',
              title: 'Build UI for onboarding flow',
              description: 'Design and implement onboarding screens with responsive states.',
              subtasks: [
                { id: 's1', title: 'Sign up page', done: true },
                { id: 's2', title: 'Sign in page', done: false },
                { id: 's3', title: 'Welcome page', done: false },
              ],
            },
            {
              id: 't2',
              columnId: 'c1',
              title: 'Build UI for search',
              description: 'Create search UI with filters and saved searches.',
              subtasks: [
                { id: 's4', title: 'Search results layout', done: false },
                { id: 's5', title: 'Filter sidebar', done: false },
              ],
            },
            {
              id: 't3',
              columnId: 'c1',
              title: 'Build settings UI',
              description: 'Account preferences and profile editing flows.',
              subtasks: [
                { id: 's6', title: 'Notification settings', done: false },
                { id: 's7', title: 'Profile form', done: false },
                { id: 's8', title: 'Security section', done: false },
              ],
            },
            {
              id: 't4',
              columnId: 'c1',
              title: 'QA and test major journeys',
              description: 'High-level QA checklist before launch.',
              subtasks: [
                { id: 's9', title: 'Happy path tests', done: false },
                { id: 's10', title: 'Error state review', done: false },
              ],
            },
          ],
        },
        {
          id: 'c2',
          boardId: 'b1',
          title: 'Doing',
          cards: [
            {
              id: 't5',
              columnId: 'c2',
              title: 'Design settings pages',
              description: 'Sync with design for settings area.',
              subtasks: [
                { id: 's11', title: 'Desktop layout', done: false },
                { id: 's12', title: 'Mobile breakpoints', done: false },
              ],
            },
            {
              id: 't6',
              columnId: 'c2',
              title: 'Add account endpoints',
              description: 'Implement REST endpoints for account CRUD.',
              subtasks: [
                { id: 's13', title: 'Create account endpoint', done: true },
                { id: 's14', title: 'Update account endpoint', done: false },
                { id: 's15', title: 'Delete account endpoint', done: false },
              ],
            },
            {
              id: 't7',
              columnId: 'c2',
              title: 'Design onboarding flow',
              description: 'Collaborate with UX on onboarding walkthrough.',
              subtasks: [
                { id: 's16', title: 'Wireframes', done: true },
                { id: 's17', title: 'Prototype', done: false },
              ],
            },
            {
              id: 't8',
              columnId: 'c2',
              title: 'Add search endpoints',
              description: 'Backend search support with caching.',
              subtasks: [
                { id: 's18', title: 'Search endpoint', done: false },
                { id: 's19', title: 'Cache layer', done: false },
              ],
            },
            {
              id: 't9',
              columnId: 'c2',
              title: 'Add authentication endpoints',
              description: 'Auth microservice integration.',
              subtasks: [
                { id: 's20', title: 'Login endpoint', done: true },
                { id: 's21', title: 'Refresh token', done: false },
              ],
            },
            {
              id: 't10',
              columnId: 'c2',
              title: 'Research pricing points',
              description: 'Pricing research and competitor analysis.',
              subtasks: [
                { id: 's22', title: 'Survey current users', done: false },
                { id: 's23', title: 'Competitive matrix', done: false },
              ],
            },
          ],
        },
        {
          id: 'c3',
          boardId: 'b1',
          title: 'Done',
          cards: [
            {
              id: 't11',
              columnId: 'c3',
              title: 'Conduct wireframe tests',
              description: 'Usability testing sessions completed.',
              subtasks: [
                { id: 's24', title: 'Recruit testers', done: true },
                { id: 's25', title: 'Synthesize feedback', done: true },
              ],
            },
            {
              id: 't12',
              columnId: 'c3',
              title: 'Create wireframe prototype',
              subtasks: [
                { id: 's26', title: 'Final prototype', done: true },
              ],
            },
            {
              id: 't13',
              columnId: 'c3',
              title: 'Review usability results',
              subtasks: [
                { id: 's27', title: 'Compile learnings', done: true },
                { id: 's28', title: 'Share memo', done: true },
              ],
            },
            {
              id: 't14',
              columnId: 'c3',
              title: 'Create paper prototypes',
              subtasks: [
                { id: 's29', title: 'Sketch scenarios', done: true },
                { id: 's30', title: 'Review with team', done: true },
              ],
            },
            {
              id: 't15',
              columnId: 'c3',
              title: 'Market discovery',
              subtasks: [
                { id: 's31', title: 'Initial report', done: true },
              ],
            },
            {
              id: 't16',
              columnId: 'c3',
              title: 'Competitor analysis',
              subtasks: [
                { id: 's32', title: 'Competitive deck', done: true },
              ],
            },
            {
              id: 't17',
              columnId: 'c3',
              title: 'Research the market',
              subtasks: [
                { id: 's33', title: 'Market size model', done: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'b2',
      slug: 'marketing-plan',
      title: 'Marketing Plan',
      columns: [
        {
          id: 'c4',
          boardId: 'b2',
          title: 'Todo',
          cards: [
            {
              id: 't19',
              columnId: 'c4',
              title: 'Craft value proposition & messaging',
              subtasks: [
                { id: 's34', title: 'Messaging workshop', done: false },
                { id: 's35', title: 'Copywriting', done: false },
              ],
            },
            {
              id: 't21',
              columnId: 'c4',
              title: 'SEO audit & “quick wins” backlog',
              subtasks: [
                { id: 's36', title: 'Technical audit', done: false },
                { id: 's37', title: 'Content audit', done: false },
              ],
            },
            {
              id: 't22',
              columnId: 'c4',
              title: 'Lead magnet ideas (eBook/checklist/benchmark)',
              subtasks: [
                { id: 's38', title: 'Brainstorm session', done: false },
              ],
            },
            {
              id: 't24',
              columnId: 'c4',
              title: 'Paid channels test plan (Meta/Google/LinkedIn)',
              subtasks: [
                { id: 's39', title: 'Select creatives', done: false },
                { id: 's40', title: 'Define KPIs', done: false },
              ],
            },
          ],
        },
        {
          id: 'c5',
          boardId: 'b2',
          title: 'Doing',
          cards: [
            {
              id: 't26',
              columnId: 'c5',
              title: 'Landing page copy v1 (hero, features, CTA)',
              subtasks: [
                { id: 's41', title: 'Hero copy', done: false },
                { id: 's42', title: 'Features list', done: false },
              ],
            },
            {
              id: 't28',
              columnId: 'c5',
              title: 'Case study template + customer outreach',
              subtasks: [
                { id: 's43', title: 'Template draft', done: false },
                { id: 's44', title: 'Select customers', done: false },
              ],
            },
            {
              id: 't29',
              columnId: 'c5',
              title: 'Webinar concept & speakers shortlist',
              subtasks: [
                { id: 's45', title: 'Concept doc', done: false },
                { id: 's46', title: 'Speaker outreach', done: false },
              ],
            },
          ],
        },
        {
          id: 'c6',
          boardId: 'b2',
          title: 'Done',
          cards: [
            {
              id: 't34',
              columnId: 'c6',
              title: 'Social handle audit & reservations',
              subtasks: [
                { id: 's47', title: 'Audit report', done: true },
              ],
            },
            {
              id: 't36',
              columnId: 'c6',
              title: 'Newsletter base template in ESP',
              subtasks: [
                { id: 's48', title: 'Template built', done: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'b3',
      slug: 'roadmap',
      title: 'Roadmap',
      columns: [], // empty state demo
    },
  ])

  const firstBoardSlug = computed(() => boards.value[0]?.slug)

  const statusOptionsByBoard = computed<Record<string, StatusOption[]>>(() =>
    boards.value.reduce((accumulator, board) => {
      accumulator[board.id] = board.columns.map(column => ({ id: column.id, title: column.title }))
      return accumulator
    }, {} as Record<string, StatusOption[]>),
  )

  function getBySlug(slug: string) {
    return boards.value.find(b => b.slug === slug) || null
  }

  function getById(id: string) {
    return boards.value.find(b => b.id === id) || null
  }

  function getStatusOptions(boardId: string | null | undefined) {
    if (!boardId) return []
    return statusOptionsByBoard.value[boardId] ?? []
  }

  function getStatusOptionsBySlug(slug: string | null | undefined) {
    if (!slug) return []
    const board = getBySlug(slug)
    return board ? getStatusOptions(board.id) : []
  }

  function generateId(prefix: string) {
    return `${prefix}${Math.random().toString(36).slice(2, 9)}`
  }

  function slugify(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  function createUniqueSlug(title: string, excludeBoardId?: string) {
    const base = slugify(title)
    if (!base) {
      let slug = generateId('board-')
      while (boards.value.some(b => b.slug === slug && b.id !== excludeBoardId)) slug = generateId('board-')
      return slug
    }

    let slug = base
    let counter = 1
    while (boards.value.some(b => b.slug === slug && b.id !== excludeBoardId)) {
      slug = `${base}-${counter}`
      counter += 1
    }
    return slug
  }

  function addColumn(boardId: string, title = 'New Column') {
    const b = getById(boardId)
    if (!b) return null
    const column: Column = { id: generateId('c'), boardId: b.id, title, cards: [] }
    b.columns.push(column)
    return column
  }

  function addBoard(title: string, columnTitles: string[] = []) {
    const boardTitle = title.trim()
    if (!boardTitle) return null

    const id = generateId('b')
    const slug = createUniqueSlug(boardTitle)
    const columns: Column[] = columnTitles.map(colTitle => {
      const trimmed = colTitle.trim()
      return {
        id: generateId('c'),
        boardId: id,
        title: trimmed,
        cards: [],
      }
    }).filter(col => col.title.length > 0)

    const board: Board = { id, slug, title: boardTitle, columns }
    boards.value.push(board)
    return board
  }

  function updateBoard(boardId: string, payload: { title: string; columns: { id?: string; title: string }[] }) {
    const board = getById(boardId)
    if (!board) return null

    const boardTitle = payload.title.trim()
    if (!boardTitle) return null

    board.title = boardTitle
    board.slug = createUniqueSlug(boardTitle, board.id)

    const trimmed = payload.columns
      .map(col => ({ id: col.id, title: col.title.trim() }))
      .filter(col => col.title.length > 0)

    const existingMap = new Map(board.columns.map(col => [col.id, col]))
    const nextColumns: Column[] = []

    trimmed.forEach(col => {
      if (col.id && existingMap.has(col.id)) {
        const existing = existingMap.get(col.id)!
        existing.title = col.title
        existingMap.delete(col.id)
        nextColumns.push(existing)
      } else {
        nextColumns.push({ id: generateId('c'), boardId: board.id, title: col.title, cards: [] })
      }
    })

    board.columns = nextColumns
    return board
  }

  function deleteBoard(boardId: string) {
    const index = boards.value.findIndex(board => board.id === boardId)
    if (index === -1) return null
    const [removed] = boards.value.splice(index, 1)
    return removed ?? null
  }

  function getCardById(cardId: string) {
    for (const board of boards.value) {
      for (const column of board.columns) {
        const card = column.cards.find(c => c.id === cardId)
        if (card) return card
      }
    }
    return null
  }

  function getCardDetails(cardId: string) {
    for (const board of boards.value) {
      for (const column of board.columns) {
        const index = column.cards.findIndex(c => c.id === cardId)
        if (index !== -1) {
          return { board, column, card: column.cards[index], cardIndex: index }
        }
      }
    }
    return null
  }

  function ensureCardDetails(cardId: string) {
    const details = getCardDetails(cardId)
    if (!details) throw new Error(`Card ${cardId} not found`)
    return details
  }

  function moveCard(cardId: string, targetColumnId: string) {
    const details = getCardDetails(cardId)
    if (!details) return null
    if (details.card.columnId === targetColumnId) return details.card

    const targetBoard = boards.value.find(b => b.columns.some(col => col.id === targetColumnId))
    if (!targetBoard) return null
    const targetColumn = targetBoard.columns.find(col => col.id === targetColumnId)
    if (!targetColumn) return null

    // remove from current column
    details.column.cards.splice(details.cardIndex, 1)
    details.card.columnId = targetColumn.id
    targetColumn.cards.push(details.card)
    return details.card
  }

  function toggleSubtask(cardId: string, subtaskId: string, value?: boolean) {
    const card = getCardById(cardId)
    if (!card) return null
    const subtask = card.subtasks.find(s => s.id === subtaskId)
    if (!subtask) return null
    subtask.done = typeof value === 'boolean' ? value : !subtask.done
    return subtask
  }

  function updateCard(
    cardId: string,
    payload: {
      title: string
      description?: string
      columnId: string
      subtasks: { id?: string; title: string }[]
    },
  ) {
    const details = getCardDetails(cardId)
    if (!details) return null
    const { card, column } = details

    const title = payload.title.trim()
    if (!title) return null

    card.title = title
    card.description = payload.description?.trim() ?? ''

    const existingMap = new Map(card.subtasks.map(subtask => [subtask.id, subtask]))
    const nextSubtasks: Subtask[] = []
    payload.subtasks.forEach(subtaskPayload => {
      const trimmed = subtaskPayload.title.trim()
      if (!trimmed) return
      if (subtaskPayload.id && existingMap.has(subtaskPayload.id)) {
        const existing = existingMap.get(subtaskPayload.id)!
        existing.title = trimmed
        nextSubtasks.push(existing)
        existingMap.delete(subtaskPayload.id)
      } else {
        nextSubtasks.push({ id: generateId('s'), title: trimmed, done: false })
      }
    })
    card.subtasks = nextSubtasks

    if (column.id !== payload.columnId) moveCard(cardId, payload.columnId)

    return card
  }

  function deleteCard(cardId: string) {
    for (const board of boards.value) {
      for (const column of board.columns) {
        const index = column.cards.findIndex(c => c.id === cardId)
        if (index !== -1) {
          const [removed] = column.cards.splice(index, 1)
          return removed ?? null
        }
      }
    }
    return null
  }

  function addCard(
    boardId: string,
    payload: {
      title: string
      description?: string
      columnId: string
      subtasks: { title: string }[]
    },
  ) {
    const board = getById(boardId)
    if (!board) return null

    const title = payload.title.trim()
    if (!title) return null

    const column = board.columns.find(col => col.id === payload.columnId)
    if (!column) return null

    const card: Card = {
      id: generateId('t'),
      columnId: column.id,
      title,
      description: payload.description?.trim() ?? '',
      subtasks: payload.subtasks
        .map(subtask => subtask.title.trim())
        .filter(Boolean)
        .map(subtaskTitle => ({ id: generateId('s'), title: subtaskTitle, done: false })),
    }

    column.cards.push(card)
    return card
  }

  return {
    boards,
    firstBoardSlug,
    statusOptionsByBoard,
    getBySlug,
    getById,
    getStatusOptions,
    getStatusOptionsBySlug,
    addCard,
    addColumn,
    addBoard,
    updateBoard,
    deleteBoard,
    getCardById,
    getCardDetails,
    moveCard,
    toggleSubtask,
    updateCard,
    deleteCard,
  }
})
