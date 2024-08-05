

const Footer = () => {
  return (
    <footer className='py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800'>
        <div className='flex items-center justify-center h-24'>
            <p className='text-balance text-center text-sm leading-loose text-muted-foreground'>
                &copy; {new Date().getFullYear()} Balance. All rights reserved.
            </p>
        </div>
    </footer>

  )
}

export default Footer
