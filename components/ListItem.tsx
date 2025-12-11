import clsx from 'clsx'

interface Props {
  as?: React.ElementType
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLElement>
  className?: string
}

export function ListItem({
  as: Component = 'li',
  children,
  onClick,
  className,
  ...rest
}: Props) {
  
  const baseClass = clsx('rounded-lg border p-4 shadow-sm transition hover:shadow-md', className); 

  return (
    <Component className={baseClass} onClick={onClick} {...rest}>
      {children}
    </Component>
  )
}
