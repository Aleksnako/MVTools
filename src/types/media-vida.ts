export interface PostElements {
  id: string
  author: string
  comment: string
  postContainer: HTMLElement
  commentContainer: HTMLElement
  postAvatarContainer: HTMLElement
  postBodyContainer: HTMLElement
  postButtonsContainer: HTMLElement
}

export interface PostReplyElements {
  id: string
  author: string
  replyContainer: HTMLElement
  replyAvatarContainer: HTMLElement
  replyMetaContainer: HTMLElement
  replyBodyContainer: HTMLElement
  replyPostControlsContainer: HTMLElement | null
}

export interface PrivateMessagesElements {
  userMessagesElements: Array<{
    author: string
    userContainer: HTMLElement
    userContent: HTMLElement
  }>
  author: string
  title: HTMLElement
  contentContainer: HTMLElement
}

export interface ReportElements {
  reportElements: Array<{
    buttonContainer: HTMLElement
    commentContainer: HTMLElement
    comment: string
    id: number
  }>
  title: HTMLElement
}

export interface PinnedThreadTableRow {
  id: string
  row: HTMLTableRowElement
}

export interface PinnedThreadElements {
  token: string
  buttonsContainer: HTMLElement
  tableHeaderRow: HTMLTableRowElement
  tableFooterRowCell: HTMLTableColElement
  tableRows: PinnedThreadTableRow[]
}

export interface MarkerPost {
  thread: {
    id: string
    title: string
  }
  post: {
    id: string
    content: string
    url: string
    markedDate: string
    author: {
      name: string
      url: string
    }
  }
}

export interface MarkerBottomPanel {
  hasPanel: boolean
  prevButtonHref?: string
  nextButtonHref?: string
  betweenButtons: Array<{
    href?: string
    text: string
    isCurrent: boolean
  }>
}

export interface MarkersElements {
  navButtonsContainer: HTMLElement | null
  postsContainer: HTMLElement | null
  token: string
  posts: MarkerPost[]
  bottomPanel?: MarkerBottomPanel
}

export const FROM_SECTIONS = {
  FAVORITES: 'foro/favoritos',
  IGNORED: 'foro/ignorados'
} as const

export type FromSection = (typeof FROM_SECTIONS)[keyof typeof FROM_SECTIONS]

export interface SectionActionsParams {
  threadId: string
  token: string
  toggle: boolean
  fromSection: FromSection
}

export const THREAD_LIST_TYPES = {
  FAVORITES: 'favoritos',
  IGNORED: 'ignorados'
} as const

export type ThreadListType = (typeof THREAD_LIST_TYPES)[keyof typeof THREAD_LIST_TYPES]

export const CSS_CLASS_NAMES = {
  MV_PREMIUM: 'mvpremium',
  MV_PREMIUM_WITHOUT_BG: 'MvPremiumCSSWithoutBG',
  MV_ULTRA_WIDE: 'mvultrawide'
} as const

export type CssClassName = (typeof CSS_CLASS_NAMES)[keyof typeof CSS_CLASS_NAMES]
