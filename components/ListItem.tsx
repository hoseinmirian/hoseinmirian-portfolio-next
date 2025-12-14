import clsx from 'clsx'

interface Props {
  as?: React.ElementType
  children?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLElement>
  className?: string
}

function ListItem({
  as: Component = 'li',
  children,
  onClick,
  className,
  ...rest
}: Props) {
  
  const baseClass = clsx(
    'rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-lg',
    className
  ) 

  return (
    <Component className={baseClass} onClick={onClick} {...rest}>
      {children}
    </Component>
  )
}

export { ListItem }
