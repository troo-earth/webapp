
const AuthFooter = () => {
  return (
    <footer className="w-full py-8 z-50 flex justify-center shrink-0 transition-opacity duration-1000">
        <div className="w-full max-w-350 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold tracking-widest uppercase">
            <div className="flex items-center gap-2 mb-2 md:mb-0">
                <span>Made in Singapore</span>
            </div>
            <div className="flex items-center gap-6">
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a>
            </div>
        </div>
      </footer>
  )
}

export default AuthFooter