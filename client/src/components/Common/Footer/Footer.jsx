
const Footer = () => {

    return (
    <footer className="bg-[#f9f9fb] border-t py-4 px-4 text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center gap-2 mb-4 md:mb-0">
        <span className="text-indigo-600 font-bold">AI Resume Builder</span>
      </div>
      <div className="flex gap-6">
        <p>© 2025 AI Resume Builder</p>
        <a href="#" className="hover:text-gray-700 transition">Privacy Policy</a>
        <a href="#" className="hover:text-gray-700 transition">Terms of Service</a>
      </div>
    </footer>
    )
}

export default Footer