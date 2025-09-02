export interface Board {
  id: string
  title: string
}

export interface Column {
  id: string
  boardId: string
  title: string
}

export interface Card {
  id: string
  columnId: string
  title: string
  description?: string
}

