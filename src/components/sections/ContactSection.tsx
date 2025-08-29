const ContactSection = () => {
    return (
        <section className="w-full flex flex-col items-center justify-center py-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h2>
            <p className="text-lg text-gray-700 mb-4">We'd love to hear from you!</p>
            <form className="container flex flex-col items-center">
                <div className="w-auto md:w-2xl mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div className="w-auto md:w-2xl mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div className="w-auto md:w-2xl mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea id="message" rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
                </div>
                <button type="submit" className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-amber-400 text-white font-bold rounded-full shadow-lg hover:scale-105 hover:from-pink-500 hover:to-blue-400 transition-all duration-300">Send Message</button>
            </form>
        </section>
    );
};

export default ContactSection;
