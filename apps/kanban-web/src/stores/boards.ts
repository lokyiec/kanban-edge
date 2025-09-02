import { defineStore } from 'pinia'
import type { Board as TBoard, Column as TColumn, Card as TCard } from '@kanban-edge/types'

export type Board = TBoard & { slug: string; columns: Column[] }
export type Column = TColumn & { cards: TCard[] }

export const useBoardsStore = defineStore('boards', {
  state: () => ({
    boards: [
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
          { id: 'c4', boardId: 'b2', title: 'Todo', cards: [] },
          { id: 'c5', boardId: 'b2', title: 'Doing', cards: [] },
          { id: 'c6', boardId: 'b2', title: 'Done', cards: [] },
        ],
      },
      {
        id: 'b3',
        slug: 'roadmap',
        title: 'Roadmap',
        columns: [], // empty state demo
      },
    ] as Board[],
  }),
  getters: {
    firstBoardSlug: (state) => state.boards[0]?.slug,
    getBySlug: (state) => (slug: string) => state.boards.find(b => b.slug === slug),
  },
})
