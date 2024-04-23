import { cn } from './cn'
import { ReactHTML } from 'react'

export function breakWord(word: string, Tag: keyof ReactHTML = 'span', className = 'word') {
  return word.split('').map((w, i) => <Tag key={i} className={cn(className)}>{w}</Tag>)
}
