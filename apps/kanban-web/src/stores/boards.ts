import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Board as TBoard, Column as TColumn, Card as TCard } from '@kanban-edge/types'

export type Board = TBoard & { slug: string; columns: Column[] }
export type Column = TColumn & { cards: TCard[] }

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
            { id: 't1', columnId: 'c1', title: 'Build UI for onboarding flow' },
            { id: 't2', columnId: 'c1', title: 'Build UI for search' },
            { id: 't3', columnId: 'c1', title: 'Build settings UI' },
            { id: 't4', columnId: 'c1', title: 'QA and test major journeys' },
          ],
        },
        {
          id: 'c2',
          boardId: 'b1',
          title: 'Doing',
          cards: [
            { id: 't5', columnId: 'c2', title: 'Design settings pages' },
            { id: 't6', columnId: 'c2', title: 'Add account endpoints' },
            { id: 't7', columnId: 'c2', title: 'Design onboarding flow' },
            { id: 't8', columnId: 'c2', title: 'Add search endpoints' },
            { id: 't9', columnId: 'c2', title: 'Add authentication endpoints' },
            { id: 't10', columnId: 'c2', title: 'Research pricing points' },
          ],
        },
        {
          id: 'c3',
          boardId: 'b1',
          title: 'Done',
          cards: [
            { id: 't11', columnId: 'c3', title: 'Conduct wireframe tests' },
            { id: 't12', columnId: 'c3', title: 'Create wireframe prototype' },
            { id: 't13', columnId: 'c3', title: 'Review usability results' },
            { id: 't14', columnId: 'c3', title: 'Create paper prototypes' },
            { id: 't15', columnId: 'c3', title: 'Market discovery' },
            { id: 't16', columnId: 'c3', title: 'Competitor analysis' },
            { id: 't17', columnId: 'c3', title: 'Research the market' },
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
            { id: 't19', columnId: 'c4', title: 'Craft value proposition & messaging' },
            { id: 't21', columnId: 'c4', title: 'SEO audit & “quick wins” backlog' },
            { id: 't22', columnId: 'c4', title: 'Lead magnet ideas (eBook/checklist/benchmark)' },
            { id: 't24', columnId: 'c4', title: 'Paid channels test plan (Meta/Google/LinkedIn)' },
          ],
        },
        {
          id: 'c5',
          boardId: 'b2',
          title: 'Doing',
          cards: [
            { id: 't26', columnId: 'c5', title: 'Landing page copy v1 (hero, features, CTA)' },
            { id: 't28', columnId: 'c5', title: 'Case study template + customer outreach' },
            { id: 't29', columnId: 'c5', title: 'Webinar concept & speakers shortlist' },
          ],
        },
        {
          id: 'c6',
          boardId: 'b2',
          title: 'Done',
          cards: [
            { id: 't34', columnId: 'c6', title: 'Social handle audit & reservations' },
            { id: 't36', columnId: 'c6', title: 'Newsletter base template in ESP' },
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

  const firstBoardSlug = computed(() => boards.value[0]?.slug);

  function getBySlug(slug: string) {
    return boards.value.find(b => b.slug === slug) || null
  }

  function getById(id: string) {
    return boards.value.find(b => b.id === id) || null
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

  function createUniqueSlug(title: string) {
    const base = slugify(title)
    if (!base) {
      let slug = generateId('board-')
      while (boards.value.some(b => b.slug === slug)) slug = generateId('board-')
      return slug
    }

    let slug = base
    let counter = 1
    while (boards.value.some(b => b.slug === slug)) {
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

  return { boards, firstBoardSlug, getBySlug, getById, addColumn, addBoard }
})
